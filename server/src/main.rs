mod routes;

use axum::{
    routing::{get, post},
    *, http::{Method, header::{CONTENT_TYPE, USER_AGENT}},
};

use clap::Parser;
use mongodb::Client;
use std::net::SocketAddr;
use tower_http::cors::{CorsLayer, Any};

mod db;

static CONFIG: once_cell::sync::OnceCell<Config> = once_cell::sync::OnceCell::new();
static DB_CLIENT: once_cell::sync::OnceCell<Client> = once_cell::sync::OnceCell::new();

/// Food Portal CLI -- Boots up Food Portal server.
#[derive(clap::Parser, Clone, Debug)]
struct Config {
    /// Socket address to listen on
    #[clap(
        short,
        long,
        env = "Food_Portal_ADDR",
        default_value = "127.0.0.1:3000"
    )]
    addr: SocketAddr,
    /// MongoDB uri
    #[clap(
        short,
        long,
        env = "Food_Portal_DB_URI",
        default_value = "mongodb://localhost:27017"
    )]
    db_uri: String,

    #[clap(long, env = "Food_Portal_DB_NAME", default_value = "food_portal")]
    db_name: String,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let filter =
        std::env::var("RUST_LOG").unwrap_or_else(|_| "info,polarsync_core=debug".to_owned());
    tracing_subscriber::fmt::fmt()
        .with_env_filter(filter)
        .with_file(false)
        .with_line_number(true)
        .with_target(true)
        .with_ansi(true)
        .init();

    let config = Config::parse();

    use mongodb::{options::ClientOptions, Client};

    // Parse a connection string into an options struct.
    let mut client_options = ClientOptions::parse(&config.db_uri).await?;

    // Manually set an option.
    client_options.app_name = Some("Food Portal".to_string());

    // Get a handle to the deployment.
    let client = Client::with_options(client_options)?;

    DB_CLIENT.set(client).unwrap();
    CONFIG.set(config.clone()).unwrap();

    let app = Router::new()
        .route("/", get(routes::fetch_all))
        .route("/store", post(routes::store))
        .route("/user", post(routes::fetch_data_by_user))
        .route("/user/task", post(routes::fetch_data_by_user_and_task))
        .route("/task", post(routes::fetch_data_by_task))
        .layer(
            CorsLayer::new()
                .allow_origin(Any)
                .allow_headers([CONTENT_TYPE, USER_AGENT])
                .allow_methods([Method::GET, Method::POST]),
        );

    tracing::info!("Starting server on {}...", config.addr);
    Server::bind(&config.addr)
        .serve(app.into_make_service())
        .await?;
    Ok(())
}

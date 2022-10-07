use crate::db::schema::Data;
use crate::{CONFIG, DB_CLIENT};
use axum::{http::StatusCode, response::IntoResponse, Json};
use futures::stream::StreamExt;
use mongodb::bson::doc;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct FetchDataByUserRequest {
    username: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FetchDataByUserAndTaskRequest {
    username: String,
    task_id: usize,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FetchDataByTaskRequest {
    task_id: usize,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct Response<T> {
    err: Option<String>,
    data: Option<T>,
}

impl<T> Default for Response<T> {
    fn default() -> Self {
        Self {
            err: None,
            data: None,
        }
    }
}

impl<T> Response<T> {
    fn with_err(err: String) -> Self {
        Self {
            err: Some(err),
            data: None,
        }
    }

    fn with_data(data: T) -> Self {
        Self {
            err: None,
            data: Some(data),
        }
    }
}

pub(super) async fn store(Json(req): Json<Data>) -> impl IntoResponse {
    let client = DB_CLIENT.get().unwrap();
    let cfg = CONFIG.get().unwrap();
    let data = client.database(&cfg.db_name).collection::<Data>("data");
    match data.insert_one(req, None).await {
        Ok(_) => (StatusCode::CREATED, Json(Response::default())),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(Response::<()>::with_err(e.to_string())),
        ),
    }
}

pub(super) async fn fetch_all() -> impl IntoResponse {
    let client = DB_CLIENT.get().unwrap();
    let cfg = CONFIG.get().unwrap();
    let data = client.database(&cfg.db_name).collection::<Data>("data");
    match data.find(doc! {}, None).await {
        Ok(mut cursor) => {
            let mut data = Vec::new();
            while let Some(result) = cursor.next().await {
                match result {
                    Ok(doc) => data.push(doc),
                    Err(e) => {
                        return (
                            StatusCode::INTERNAL_SERVER_ERROR,
                            Json(Response::with_err(e.to_string())),
                        )
                    }
                }
            }
            (StatusCode::OK, Json(Response::with_data(data)))
        }
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(Response::with_err(e.to_string())),
        ),
    }
}

pub(super) async fn fetch_data_by_user(
    Json(req): Json<FetchDataByUserRequest>,
) -> impl IntoResponse {
    let client = DB_CLIENT.get().unwrap();
    let cfg = CONFIG.get().unwrap();
    let filter = doc! {
        "username": req.username,
    };
    let data = client.database(&cfg.db_name).collection::<Data>("data");
    match data.find(filter, None).await {
        Ok(mut cur) => {
            let mut res = Vec::new();
            while let Some(data) = cur.next().await {
                match data {
                    Ok(data) => res.push(data),
                    Err(e) => {
                        return (
                            StatusCode::INTERNAL_SERVER_ERROR,
                            Json(Response::with_err(e.to_string())),
                        )
                    }
                }
            }
            (StatusCode::OK, Json(Response::with_data(res)))
        }
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(Response::with_err(e.to_string())),
        ),
    }
}

pub(super) async fn fetch_data_by_user_and_task(
    Json(req): Json<FetchDataByUserAndTaskRequest>,
) -> impl IntoResponse {
    let client = DB_CLIENT.get().unwrap();
    let cfg = CONFIG.get().unwrap();
    let filter = doc! {
        "username": req.username,
        "task_id": req.task_id as i64,
    };

    let data = client.database(&cfg.db_name).collection::<Data>("data");
    match data.find(filter, None).await {
        Ok(mut cur) => {
            let mut res = Vec::new();
            while let Some(data) = cur.next().await {
                match data {
                    Ok(data) => res.push(data),
                    Err(e) => {
                        return (
                            StatusCode::INTERNAL_SERVER_ERROR,
                            Json(Response::with_err(e.to_string())),
                        )
                    }
                }
            }
            (StatusCode::OK, Json(Response::with_data(res)))
        }
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(Response::with_err(e.to_string())),
        ),
    }
}

pub(super) async fn fetch_data_by_task(
    Json(req): Json<FetchDataByTaskRequest>,
) -> impl IntoResponse {
    let client = DB_CLIENT.get().unwrap();
    let cfg = CONFIG.get().unwrap();
    let filter = doc! {
        "task_id": req.task_id as i64,
    };

    let data = client.database(&cfg.db_name).collection::<Data>("data");
    match data.find(filter, None).await {
        Ok(mut cur) => {
            let mut res = Vec::new();
            while let Some(data) = cur.next().await {
                match data {
                    Ok(data) => res.push(data),
                    Err(e) => {
                        return (
                            StatusCode::INTERNAL_SERVER_ERROR,
                            Json(Response::with_err(e.to_string())),
                        )
                    }
                }
            }
            (StatusCode::OK, Json(Response::with_data(res)))
        }
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(Response::with_err(e.to_string())),
        ),
    }
}

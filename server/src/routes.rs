use axum::{Json, response::IntoResponse};
use crate::{DB_CLIENT, CONFIG};
use crate::db::schema::Data;
use futures::stream::StreamExt;
use mongodb::bson::doc;


struct FetchDataByUserRequest {
    username: String,
}

struct FetchDataByUserAndTaskRequest {
    username: String,
    task_id: usize,
}

struct FetchDataByTaskRequest {
    task_id: usize,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
struct Response<T> {
    err: Option<String>,
    data: Option<T>,
}

impl Default for Response<T> {
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
    todo!()
}

pub(super) async fn fetch_data_by_user(Json(req): Json<FetchDataByUserRequest>) -> impl IntoResponse {
    todo!()    
}

pub(super) async fn fetch_data_by_user_and_task(Json(req): Json<FetchDataByUserAndTaskRequest>) -> impl IntoResponse {
    todo!()
}

pub(super) async fn fetch_data_by_task(Json(req): Json<FetchDataByTaskRequest>) -> impl IntoResponse {
    todo!()
}
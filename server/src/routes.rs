use super::db::schema::{User, Click};
use async_graphql::SimpleObject;
use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, SimpleObject)]
pub(crate) struct LoginRequest {
    email: String,
    password: String,
}
#[derive(Debug, Clone, Serialize, Deserialize, SimpleObject)]
pub(crate) struct RegisterRequest {
    username: String,
    email: String,
    password: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, SimpleObject)]
pub(crate) struct UserResponse {
    pub(crate) user: User,
    pub(crate) token: String,
}

pub(crate) trait Data:
    Clone
    + core::fmt::Debug
    + Serialize
    + serde::de::DeserializeOwned
    + Send
    + Sync
    + 'static
    + async_graphql::OutputType
{
}

impl<T> Data for T where
    T: Send
        + Sync
        + Clone
        + core::fmt::Debug
        + Serialize
        + serde::de::DeserializeOwned
        + 'static
        + async_graphql::OutputType
{
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub(crate) struct Response<D: Data> {
    #[serde(skip_serializing_if = "Option::is_none")]
    err: Option<String>,
    #[serde(bound = "D: Data", skip_serializing_if = "Option::is_none")]
    data: Option<D>,
}

impl<D: Data> Response<D> {
    pub fn new(data: D) -> Self {
        Response {
            err: None,
            data: Some(data),
        }
    }
}

#[async_graphql::Object]
impl<D: Data> Response<D> {
    async fn err(&self) -> Option<&str> {
        self.err.as_deref()
    }

    async fn data(&self) -> Option<&D> {
        self.data.as_ref()
    }
}

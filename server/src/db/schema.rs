use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Data {
    username: String,
    task_id: usize,
    time_taken: u64,
    num_of_misclicks: usize,
}

impl From<Data> for mongodb::bson::Bson {
    fn from(data: Data) -> Self {
        mongodb::bson::Bson::Document(mongodb::bson::doc! {
            "username": data.username,
            "task_id": data.task_id as i64,
            "time_taken": data.time_taken as i64,
            "num_of_misclicks": data.num_of_misclicks as i64,
        })
    }
}

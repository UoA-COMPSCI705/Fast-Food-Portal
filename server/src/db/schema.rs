use serde::{Serialize, Deserialize};


#[derive(Debug, Copy, Clone, Serialize, Deserialize)]
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
            "task_id": data.task_id,
            "time_taken": data.time_taken,
            "num_of_misclicks": data.num_of_misclicks,
        })
    }
}
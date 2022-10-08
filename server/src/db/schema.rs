use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Data {
    pub(crate) username: String,
    pub(crate) task_id: usize,
    time_taken: u64,
    num_of_misclicks: usize,
}

impl From<Data> for mongodb::bson::Bson {
    fn from(data: Data) -> Self {
        mongodb::bson::Bson::Document(mongodb::bson::doc! {
            "username": data.username,
            "taskIid": data.task_id as i64,
            "timeTaken": data.time_taken as i64,
            "numOfMisclicks": data.num_of_misclicks as i64,
        })
    }
}

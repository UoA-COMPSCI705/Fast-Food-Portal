use mongodb::bson::{oid::ObjectId, Bson, Document};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub(crate) enum ButtonSize {
    Small,
    Medium,
    Large,
    XLarge,
    XXLarge,
}

impl ButtonSize {
    pub const fn as_str(&self) -> &'static str {
        match self {
            ButtonSize::Small => "small",
            ButtonSize::Medium => "medium",
            ButtonSize::Large => "large",
            ButtonSize::XLarge => "xlarge",
            ButtonSize::XXLarge => "xxlarge", 
        }
    }
}

impl async_graphql::InputType for ButtonSize {
    type RawValueType = Self;

    fn type_name() -> std::borrow::Cow<'static, str> {
        std::borrow::Cow::Borrowed("ButtonSize")
    }

    fn create_type_info(registry: &mut async_graphql::registry::Registry) -> String {
        registry.create_input_type::<Self, _>(async_graphql::registry::MetaTypeId::Scalar, |_| {
            async_graphql::registry::MetaType::Scalar {
              name: Self::type_name().to_string(),
              description: None,
              visible: ::std::option::Option::None,
              is_valid: |_| true,
              specified_by_url: ::std::option::Option::None,
              inaccessible: false,
            }
        }) 
    }

    fn parse(value: Option<async_graphql::Value>) -> async_graphql::InputValueResult<Self> {
        match value {
            Some(val) => match val {
                async_graphql::Value::String(val) => match val.as_str() {
                    "small" => Ok(ButtonSize::Small),
                    "medium" => Ok(ButtonSize::Medium),
                    "large" => Ok(ButtonSize::Large), 
                    "xlarge" => Ok(ButtonSize::XLarge),
                    "xxlarge" => Ok(ButtonSize::XXLarge), 
                    _ => async_graphql::InputValueResult::Err(async_graphql::InputValueError::custom(
                        "unknown button size",
                    )), 
                },
                async_graphql::Value::Enum(val) => match val.to_lowercase().trim() {
                    "small" => Ok(ButtonSize::Small),
                    "medium" => Ok(ButtonSize::Medium),
                    "large" => Ok(ButtonSize::Large), 
                    "xlarge" => Ok(ButtonSize::XLarge),
                    "xxlarge" => Ok(ButtonSize::XXLarge),
                    _ => async_graphql::InputValueResult::Err(async_graphql::InputValueError::custom(
                      "unknown button size",
                    )),
                },
                val => async_graphql::Result::Err(async_graphql::InputValueError::expected_type(
                    val,
                )),
            },
            None => async_graphql::Result::Err(async_graphql::InputValueError::expected_type(
                value.unwrap_or_default(),
            )),
        }
    }

    fn to_value(&self) -> async_graphql::Value {
        match self {
            ButtonSize::Small => async_graphql::Value::String("small".to_string()),
            ButtonSize::Medium => async_graphql::Value::String("medium".to_string()),
            ButtonSize::Large => async_graphql::Value::String("large".to_string()),
            ButtonSize::XLarge => async_graphql::Value::String("xlarge".to_string()),
            ButtonSize::XXLarge => async_graphql::Value::String("xxlarge".to_string()),
        }
    }

    fn as_raw_value(&self) -> Option<&Self::RawValueType> {
        Some(self)
    }
}

#[derive(Debug, Copy, Clone, Serialize, Deserialize, Eq, PartialEq)]
#[serde(rename_all = "snake_case")]
pub(crate) enum ClickType {
    Ordering,
    Combo,
    Checkout,
}

impl ClickType {
    pub const fn as_str(&self) -> &'static str {
        match self {
            ClickType::Ordering => "ordering",
            ClickType::Combo => "combo",
            ClickType::Checkout => "checkout",
        }
    }
}

impl async_graphql::InputType for ClickType {
    type RawValueType = Self;

    fn type_name() -> std::borrow::Cow<'static, str> {
        std::borrow::Cow::Borrowed("ClickType")
    }

    fn create_type_info(registry: &mut async_graphql::registry::Registry) -> String {
        registry.create_input_type::<Self, _>(async_graphql::registry::MetaTypeId::Scalar, |_| {
            async_graphql::registry::MetaType::Scalar {
              name: Self::type_name().to_string(),
              description: None,
              visible: ::std::option::Option::None,
              is_valid: |_| true,
              specified_by_url: ::std::option::Option::None,
              inaccessible: false,
            }
        }) 
    }

    fn parse(value: Option<async_graphql::Value>) -> async_graphql::InputValueResult<Self> {
        match value {
            Some(val) => match val {
                async_graphql::Value::String(val) => match val.as_str() {
                    "ordering" => Ok(ClickType::Ordering),
                    "combo" => Ok(ClickType::Combo),
                    "checkout" => Ok(ClickType::Checkout),
                    _ => async_graphql::InputValueResult::Err(async_graphql::InputValueError::custom(
                        "unknown click type",
                    )), 
                },
                async_graphql::Value::Enum(val) => match val.to_lowercase().trim() {
                    "ordering" => Ok(ClickType::Ordering),
                    "combo" => Ok(ClickType::Combo),
                    "checkout" => Ok(ClickType::Checkout), 
                    _ => async_graphql::InputValueResult::Err(async_graphql::InputValueError::custom(
                      "unknown click type",
                    )),
                },
                val => async_graphql::Result::Err(async_graphql::InputValueError::expected_type(
                    val,
                )),
            },
            None => async_graphql::Result::Err(async_graphql::InputValueError::expected_type(
                value.unwrap_or_default(),
            )),
        }
    }

    fn to_value(&self) -> async_graphql::Value {
        match self {
            ClickType::Ordering => async_graphql::Value::String("ordering".to_string()),
            ClickType::Combo => async_graphql::Value::String("combo".to_string()),
            ClickType::Checkout => async_graphql::Value::String("checkout".to_string()),
        }
    }

    fn as_raw_value(&self) -> Option<&Self::RawValueType> {
        Some(self)
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, async_graphql::InputObject)]
#[serde(rename_all = "snake_case")]
pub(crate) struct Click {
    #[serde(rename = "type")]
    ty: ClickType,
    button_size: ButtonSize,
    duration: u64,
    error: bool,
}

impl From<Click> for Bson {
    fn from(click: Click) -> Self {
        let mut doc = Document::new();
        doc.insert("type", click.ty.as_str());
        doc.insert("button_size", click.button_size.as_str());
        doc.insert("duration", click.duration as i64);
        doc.insert("error", click.error);
        Bson::Document(doc)
    }
}

#[async_graphql::Object]
impl Click {
    async fn r#type(&self) -> &'static str {
        self.ty.as_str()
    }

    async fn duration(&self) -> String {
        format!("{}ms", self.duration)
    }

    async fn error(&self) -> bool {
        self.error
    }

    async fn button_size(&self) -> &'static str {
        self.button_size.as_str()
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub(crate) struct User {
    pub(crate) id: ObjectId,
    pub(crate) username: String,
    pub(crate) email: String,
    pub(crate) password: String,
    pub(crate) clicks: Vec<Click>,
}

impl User {
    pub fn new(username: String, email: String, password: String) -> User {
        Self {
            id: ObjectId::new(),
            username,
            email,
            password,
            clicks: Vec::new(),
        }
    }
}

#[async_graphql::Object]
impl User {
    async fn id(&self) -> String {
        self.id.to_string()
    }

    async fn username(&self) -> &str {
        &self.username
    }

    async fn email(&self) -> &str {
        &self.email
    }

    async fn clicks(&self) -> Vec<Click> {
        self.clicks.clone()
    }
    
    async fn ordering_clicks(&self) -> Vec<Click> {
        self.clicks.iter().filter(|click| click.ty == ClickType::Ordering).cloned().collect()
    }

    async fn combo_clicks(&self) -> Vec<Click> {
        self.clicks.iter().filter(|click| click.ty == ClickType::Combo).cloned().collect()
    } 

    async fn checkout_clicks(&self) -> Vec<Click> {
        self.clicks.iter().filter(|click| click.ty == ClickType::Checkout).cloned().collect()
    }
}

## DB設計

## usersテーブル

|Column|Type|Option|
|------|----|------|
|user_id|integer|null: false, primary_key: true|
|user_name|string|null: false|
|email|string|null: false, unique: true|

### Association
- has_many :groups, through: :groups_users
- has_many :groups_users


## groupsテーブル

|Column|Type|Option|
|------|----|------|
|group_id|integer|null: false, primary_key: true|
|group_name|string|null: false|

### Association
- has_many :users, through: :groups_users
- has_many :groups_users


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## Messageテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|null: true|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
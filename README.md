## DB設計

## usersテーブル

|Column|Type|Option|
|------|----|------|
|user_id|integer|null: false, primary_key: true|
|user_name|string|null: false|
|email|string|null: false, unique: true|

### Association
belongs_to :groups, through: :groups_usersテーブル

## groupsテーブル

|Column|Type|Option|
|------|----|------|
|group_id|integer|null: false, primary_key: true|
|group_name|string|null: false|
|body|text|null: false|
|image|string|null: true|

### Association
has_many :users, through: :groups_usersテーブル

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
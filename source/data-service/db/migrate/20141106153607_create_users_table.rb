class CreateUsersTable < ActiveRecord::Migration
  def change
    create_table :users do |table|
      table.string "username", :limit => 25, :null => false
      table.string "first_name", :limit => 25
      table.string "last_name", :limit => 50
      table.string "hashed_password", :limit => 65
      table.string "salt", :limit => 65
      table.string "email"
      table.datetime "birthday"
      table.string "plast_hovel"
      table.string "plast_region"
      table.string "plast_level"
      table.string "picture"
      table.integer "role_id"
      table.integer "status", :default => 1
      table.timestamps
    end 
  end
end
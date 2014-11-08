class CreateRoleTable < ActiveRecord::Migration
  def change
      create_table :roles do |table|
        table.string :name
        table.belongs_to :user
        table.timestamps
      end
    end
end

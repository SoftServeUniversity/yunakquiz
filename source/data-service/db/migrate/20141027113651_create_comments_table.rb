class CreateCommentsTable < ActiveRecord::Migration
  def change
    create_table :comments do |table|
      table.integer :quiz_id
      table.string :text
      table.belongs_to :quiz 
      table.timestamps
    end
  end
end

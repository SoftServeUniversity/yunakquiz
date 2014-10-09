class CreateQuestion < ActiveRecord::Migration
  def change
  	  create_table :questions do |table|
      table.integer :quiz_id,   null: false
      table.string :title, 			null: false
      table.string :description
      end
  end
end

class CreateCategory < ActiveRecord::Migration
  def change
  	  create_table :categories do |table|
      table.integer :parent_id,  null: false, default: 0
      table.string :title,		 null: false
  	  end
  end
end

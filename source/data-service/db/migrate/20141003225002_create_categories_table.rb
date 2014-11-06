class CreateCategoriesTable < ActiveRecord::Migration
	def change
  		create_table :categories do |table|
  			table.integer :category_id
  			table.string :title, :limit => 200
  			table.belongs_to :category 
  			table.timestamps
  		end
	end
end

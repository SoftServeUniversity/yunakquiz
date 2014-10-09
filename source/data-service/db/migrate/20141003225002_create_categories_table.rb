class CreateCategoriesTable < ActiveRecord::Migration
	def change
  		create_table :categories do |table|
  			table.integer :category_id
  			table.string :title
  			table.belongs_to :category 
  			table.timestamps
  		end

	end
end

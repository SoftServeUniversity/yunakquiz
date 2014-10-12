class CreateTagsTable < ActiveRecord::Migration
	def change
  		create_table :tags do |table|
  			table.integer :quiz_id
  			table.string :tag
  			table.belongs_to :quiz
  			table.timestamps
  		end
  	end
end

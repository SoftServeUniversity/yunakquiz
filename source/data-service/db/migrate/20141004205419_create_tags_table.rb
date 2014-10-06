class CreateTagsTable < ActiveRecord::Migration
	def change
  		create_table :tags do |table|
  			table.integer :assessment_id
  			table.string :tag
  			table.belongs_to :assessment
  			table.timestamps
  		end
  	end
end

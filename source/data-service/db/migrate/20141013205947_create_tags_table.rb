class CreateTagsTable < ActiveRecord::Migration
	def change
		create_table :tags do |table|
			table.string :tag, :limit => 50
			table.timestamps
  		end
	end
end

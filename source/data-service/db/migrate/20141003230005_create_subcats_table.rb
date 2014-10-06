class CreateSubcatsTable < ActiveRecord::Migration
	def change
		create_table :subcats do |table|
			table.integer :parcat_id
			table.belongs_to :parcat
			table.string :subCatName
			table.timestamps
		end
	end
end

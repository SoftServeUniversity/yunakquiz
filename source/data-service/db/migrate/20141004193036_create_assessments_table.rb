class CreateAssessmentsTable < ActiveRecord::Migration
	def change
		create_table :assessments do |table|
			table.integer :subcat_id
			table.string :title
			table.text :description
			table.belongs_to :subcat
			table.timestamps
		end
	end
end

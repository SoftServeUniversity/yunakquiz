class CreateQuestionsTable < ActiveRecord::Migration
	def change
		create_table :questions do |table|
			table.integer :assessment_id
			table.string :questtext
			table.belongs_to :assessment
			table.timestamps
		end
	end
end

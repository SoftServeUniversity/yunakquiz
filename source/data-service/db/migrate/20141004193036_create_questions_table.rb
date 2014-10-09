class CreateQuestionsTable < ActiveRecord::Migration
	def change
		create_table :questions do |table|
			table.integer :quiz_id
			table.string :title
			table.text :description
			table.belongs_to :quiz
			table.timestamps
		end
	end
end

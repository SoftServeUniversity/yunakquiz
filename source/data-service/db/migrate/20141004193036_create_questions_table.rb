class CreateQuestionsTable < ActiveRecord::Migration
	def change
		create_table :questions do |table|
			table.integer :quiz_id
			table.string :title, :limit => 200
			table.text :description, :limit => 200
			table.belongs_to :quiz
			table.timestamps
		end
	end
end

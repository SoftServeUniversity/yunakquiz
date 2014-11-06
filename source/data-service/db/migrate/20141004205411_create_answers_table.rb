class CreateAnswersTable < ActiveRecord::Migration
	def change
		create_table :answers do |table|
			table.integer :question_id
			table.string :title, :limit => 200
			table.boolean :correct 
			table.belongs_to :question
			table.timestamp
		end
	end
end

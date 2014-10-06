class CreateAnswersTable < ActiveRecord::Migration
	def change
		create_table :answers do |table|
			table.integer :question_id
			table.string :answertext
			table.belongs_to :question
			table.timestamp
		end
	end
end

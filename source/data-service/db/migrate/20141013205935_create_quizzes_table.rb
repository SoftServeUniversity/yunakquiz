class CreateQuizzesTable < ActiveRecord::Migration
	def change
		create_table :quizzes do |table|
			table.integer :category_id
			table.belongs_to :category
			table.string :title
			table.text :description
			table.timestamps
		end
	end
end

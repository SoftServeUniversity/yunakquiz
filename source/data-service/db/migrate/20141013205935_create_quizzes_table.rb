class CreateQuizzesTable < ActiveRecord::Migration
	def change
		create_table :quizzes do |table|
			table.integer :category_id
			table.belongs_to :category
			table.belongs_to :user
			table.string :title, :limit => 200
			table.text :description, :limit => 200
			table.integer :status, default: 0
			table.timestamps
		end
	end
end

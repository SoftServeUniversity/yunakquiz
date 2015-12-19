class CreateQuizzesAndTagsTable < ActiveRecord::Migration
	def change
		create_table :quizzes do |table|
			table.integer :category_id
			table.belongs_to :category
			table.string :title
			table.text :description
			table.timestamps
		end
  		create_table :tags do |table|
  			table.string :tag
  			table.timestamps
  		end
    	create_table :quizzes_tags, id: false do |table|
      		table.belongs_to :quiz
      		table.belongs_to :tag
	    end  		
	end
end

class CreateQuiz < ActiveRecord::Migration
  def change

  	  create_table :categories do |table|
      table.integer :parent_id,  null: false, default: 0
      table.string :title,		 null: false
  	  end

      create_table :quizzes do |table|
      table.integer :category_id,   null: false
      table.string :title, 			null: false
      table.string :description
      end
       
      create_table :questions do |table|
      table.integer :quiz_id, 	 null: false
      table.string :title, 		 null: false
      table.string :description
      end
       
      create_table :answers do |table|
      table.integer :question_id,  	 null: false
      table.string :title,			 null: false
      table.boolean :correct, 		 null: false
      end

  end
end

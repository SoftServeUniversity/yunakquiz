class CreateQuiz < ActiveRecord::Migration
  def change
      create_table :quizzes do |table|
      table.integer :category_id,   null: false
      table.string :title, 			null: false
      table.string :description
      end
  end
end

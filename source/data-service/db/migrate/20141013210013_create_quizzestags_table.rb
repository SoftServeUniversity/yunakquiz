class CreateQuizzestagsTable < ActiveRecord::Migration
  def change
    create_table :quizzes_tags, id: false do |table|
      table.belongs_to :quiz
      table.belongs_to :tag
    end 
  end
end

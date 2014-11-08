class CreateQuizzesTable < ActiveRecord::Migration
  def change
    create_table :quizzes do |table|
      table.belongs_to :category
      table.belongs_to :user
      table.string :title
      table.text :description
      table.integer :status, default: 0
      table.timestamps
    end
  end
end

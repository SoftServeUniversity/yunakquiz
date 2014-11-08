class CreateAnswersTable < ActiveRecord::Migration
  def change
    create_table :answers do |table|
      table.belongs_to :question
      table.string :title
      table.boolean :correct 
      table.timestamp
    end
  end
end

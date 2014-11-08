class CreateQuestionsTable < ActiveRecord::Migration
  def change
    create_table :questions do |table|
      table.belongs_to :quiz
      table.string :title
      table.text :description
      table.timestamps
    end
  end
end

class CreateQuizResultsTable < ActiveRecord::Migration
  def change
  	create_table :results, id: false do |table|
		table.belongs_to :quiz
		table.belongs_to :user
		table.float "grade"
		table.timestamps
	end 
  end
end

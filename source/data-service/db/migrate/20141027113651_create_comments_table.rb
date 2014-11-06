class CreateCommentsTable < ActiveRecord::Migration
  def change
  	create_table :comments do |table|
  		table.integer :quiz_id
  		table.string :text, :limit => 200
  		table.belongs_to :quiz 
  		table.timestamps
  	end
  end
end

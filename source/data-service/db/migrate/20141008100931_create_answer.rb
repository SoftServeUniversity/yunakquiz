class CreateAnswer < ActiveRecord::Migration
  def change
  	  create_table :answers do |table|
      table.integer :question_id,  	 null: false
      table.string :title,			 null: false
      table.boolean :correct, 		 null: false
      end
  end
end

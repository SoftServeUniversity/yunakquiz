class CreateAssessments < ActiveRecord::Migration
  def change
  	
   	  create_table :measures do |table|
      table.column :parent_id,  :integer
      table.column :title, :string
  	  end

      create_table :assessments do |table|
      table.column :measure_id,  :integer
      table.column :title, :string
      table.column :description, :string
      end
       
      create_table :questions do |table|
      table.column :assessment_id,  :integer
      table.column :title, :string
      table.column :description, :string
      end
       
      create_table :answers do |table|
      table.column :question_id,  :integer
      table.column :title, :string
      table.column :correct, :boolean
      end


  end
end

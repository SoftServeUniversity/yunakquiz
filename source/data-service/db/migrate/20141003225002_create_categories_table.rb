class CreateCategoriesTable < ActiveRecord::Migration
  def change
      create_table :categories do |table|
        table.belongs_to :category 
        table.string :title
        table.timestamps
      end
  end
end

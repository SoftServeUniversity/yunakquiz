class CreateTagsTable < ActiveRecord::Migration
  def change
    create_table :tags do |table|
      table.string :tag
      table.timestamps
      end
  end
end

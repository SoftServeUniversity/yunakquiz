class CreateStaticinfoTable < ActiveRecord::Migration
  def change
    create_table :staticinfos do |table|
      table.text :about_us
      table.timestamps
    end
  end
end

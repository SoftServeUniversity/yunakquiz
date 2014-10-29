class CreateContactsTable < ActiveRecord::Migration
  def change
    create_table :contacts do |table|
      table.string :role
      table.string :phone
      table.string :mail
      table.string :address
    end
  end
end

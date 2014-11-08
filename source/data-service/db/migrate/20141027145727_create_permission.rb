class CreatePermission < ActiveRecord::Migration
  def change
	create_table :permissions do |table|
		table.string :tabs
		table.integer :admin
		table.integer :moder
		table.integer :user
		table.integer :superadmin
		table.timestamp
  	end
  end
end

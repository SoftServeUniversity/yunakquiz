class CreatePermission < ActiveRecord::Migration
  def change
	create_table :permissions do |table|
		table.string :tabs
		table.boolean :admin
		table.boolean :moder
		table.boolean :user
		table.boolean :superadmin
		table.timestamp
  	end
  end
end

class UpdateRoles < ActiveRecord::Migration
  def change
	add_column :permissions, :superadmin, :integer
  end
end

class CreateNewRoles < ActiveRecord::Migration
  
  def self.down
    drop_table :admin_role
  	drop_table :moder_role
  	drop_table :user_role
  end

end
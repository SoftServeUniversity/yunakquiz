class CreateAdminRoleTable < ActiveRecord::Migration
  def create
  	  create_table :adminroletable do |t|
      t.string :tab
    end
  end
end

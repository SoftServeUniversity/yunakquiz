class CreateModerRoleTable < ActiveRecord::Migration
  def create
  	  create_table :moderroletable do |t|
      t.string :tab
    end
  end
end

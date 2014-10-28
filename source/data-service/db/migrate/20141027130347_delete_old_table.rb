class DeleteOldTable < ActiveRecord::Migration
	def self.down
    	drop_table :roles
  	end
end
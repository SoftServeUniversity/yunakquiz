class CreateParcatsTable < ActiveRecord::Migration
	def change
  		create_table :parcats do |table|
  			table.string :parCatName
  			table.timestamps
  		end
	end
end

class Staticinfo < ActiveRecord::Base
  def self.updateInfo(data)
    data.force_encoding "UTF-8"
    currentRow = Staticinfo.where('id=?',1)
    if currentRow.length < 1
       currentRow = Staticinfo.create(:id => 1, :about_us => data)
       return currentRow
    else
      currentRow[0].about_us = data
      currentRow[0].save();
      return currentRow[0]
    end
  end
end
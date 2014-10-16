class Answer < ActiveRecord::Base
  belongs_to :question

  def self.updateQ(data)
  		
	  	answer  = Answer.find_or_create_by(id: data['id'])
		answer.update(data)
		
  end
end
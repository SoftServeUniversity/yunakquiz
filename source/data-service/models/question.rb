class Question < ActiveRecord::Base
  belongs_to :quiz
  has_many :answers

  def self.updateQ(data)
  		  		
	  	question  = Question.find_or_create_by(id: data['id'])
		question.update(title: data['title'])
		
		data['answers'].each do |a|
  			Answer.updateQ(a)
  		end
		
		
  end
end
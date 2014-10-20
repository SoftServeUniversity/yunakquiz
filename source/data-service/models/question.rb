class Question < ActiveRecord::Base
  belongs_to :quiz
  has_many :answers, dependent: :destroy


 	def self.updateQ(questions, quiz)
  		questions.each do |q|
  			question = quiz.questions.find_or_create_by(id: q['id'])

		    if q['toDelete'] 
		        question.destroy()
		    else 
		        question.update(title: q['title'], description: q['description'])
		      Answer.updateQ(q['answers'], question)
		    end	

  		end

  	end
  	

  
end
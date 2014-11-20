class Result < ActiveRecord::Base
  belongs_to :quiz
  belongs_to :user

  def self.save(user, quiz_id, grade)
  	@quiz = Quiz.find_by(id: quiz_id)
  	user.results.create(quiz: @quiz, grade: grade)
  end	

end

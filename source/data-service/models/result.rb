class Result < ActiveRecord::Base
  belongs_to :quiz
  belongs_to :user

  def self.save(user, quiz_id, grade)
  	@quiz = Quiz.find_by(id: quiz_id)
  	user.results.create(quiz: @quiz, grade: grade)
  end

  def self.get_result(quizzes,total_items,id)
  	result = []
      quizzes.each do |quiz|
        stat_res ={}
        stat_res[:quiz_id] = quiz[:id]
        stat_res[:title] = quiz[:title]
        stat_res[:max] = quiz.results.where(:user_id=>id).maximum(:grade)
        stat_res[:tries] = quiz.results.where(:user_id=>id).count()
        stat_res[:time] = quiz.results.where(:user_id=>id).order('rowid').last['created_at']
        stat_res[:last] = quiz.results.where(:user_id=>id).order('rowid').last['grade']
        stat_res[:average] = quiz.results.where(:user_id=>id).average(:grade).round(2)
        result << stat_res
      end
      {result: result, totalItems: total_items}
   end	

end

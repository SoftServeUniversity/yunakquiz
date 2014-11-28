class Answer < ActiveRecord::Base
  belongs_to :question

  def self.updateQ (answers, question)
    answers.each do |a|
      answer = question.answers.find_or_create_by(id: a['id'])
      if a['toDelete']
        answer.destroy()
      else
        answer.update(title: a['title'], correct: a['correct'])
      end
    end
  end

  def self.createQ (answers, question)
    answers.each do |a|
      question.answers.create(title: a['title'], correct: a['correct'])
    end 
  end
end

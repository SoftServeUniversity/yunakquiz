class Answer < ActiveRecord::Base
  belongs_to :question
<<<<<<< HEAD
end
=======

  def self.updateQ (answers, question)
    answers.each do |a|
      answer = question.answers.find_or_create_by(id: a['id'])
      if a['toDelete']
        answer.destroy()
      else
        answer.update(a)
      end
    end
  end

  def self.createQ (answers, question)
    answers.each do |a|
      question.answers.create(a)
    end 
  end
end
>>>>>>> e5fc1713164625bf8b5ed28bbe0aae1503aacf7e

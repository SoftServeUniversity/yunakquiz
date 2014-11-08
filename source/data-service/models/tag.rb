class Tag < ActiveRecord::Base
  has_and_belongs_to_many :quizzes

  def self.insert tags, quiz
  	tags.each do |q|
  		if q['id']
			quiz.tags << Tag.find_by(id: q['id'])
      	else
      		quiz.tags.create(tag: q['tag'])
      	end
    end
  end

  def self.update tags, quiz
	tags.each do |q|
	  	if q['id']
	  			quiz.tags << Tag.find_by(id: q['id']) if (quiz.tags.find_by(id: q['id'])).nil?
	    else
	      		quiz.tags.create(tag: q['tag'])
	    end
	end
  end


end

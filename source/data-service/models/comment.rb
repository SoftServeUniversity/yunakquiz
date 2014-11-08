class Comment < ActiveRecord::Base
  belongs_to :quiz

  def self.get (quiz_id)
    if quiz_id 
    	Comment.where(quiz_id: quiz_id)	
    end
  end
end

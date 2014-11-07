class Comment < ActiveRecord::Base
  belongs_to :quiz

  def self.get_by_quiz(quiz_id)
    	Comment.where(:quiz_id => quiz_id)
  end

  def self.update_comments(data)
	  	data.each do |comment|
	  		if comment['id'] == nil
	  			Comment.create(:quiz_id => comment['quiz_id'], :text => comment['text'])
	  		end
	   	end
  end
  
  def self.delete_comments(id)
      Comment.destroy_all(:quiz_id => id);
  end

end

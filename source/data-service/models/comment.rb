class Comment < ActiveRecord::Base
  belongs_to :quiz

  def self.get (quiz_id)
    if quiz_id 
    	Comment.where(quiz_id: quiz_id)	
    end
  end

  def self.updateC (data)
	  	data.each do |comment|
	  		if comment['id'] == nil
	  			Comment.create(quiz_id: comment['quiz_id'], text: comment['text'])
	  		end
	   	end
  end
  
  def self.deleteC (id)
      Comment.destroy_all(:quiz_id => id);
  end

end

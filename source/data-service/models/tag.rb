class Tag < ActiveRecord::Base
  has_and_belongs_to_many :quizzes
  validates_uniqueness_of :tag

  def self.insert_tags tags, quiz
  	tags.each do |tag|
			quiz.tags << Tag.find_or_create_by(tag: tag['tag'])
    end
  end

  def self.update_tags tags, quiz
    delete_tags tags, quiz
    insert_tags tags, quiz 
  end

  def self.delete_tags tags, quiz
    tags_to_delete = quiz.tags.select(:id, :tag) - tags
    tags_to_delete.each do |tag|
      quiz.tags.delete(Tag.find_by(id: tag['id']))
    end  
  end  

end

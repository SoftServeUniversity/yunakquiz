class Category < ActiveRecord::Base
  has_many :quizzes
  has_many :categories 
  belongs_to :category

  def self.catList()
    Category.where(:category_id => 0).as_json(:include => {:categories => {:include => :categories}}) 
  end


end

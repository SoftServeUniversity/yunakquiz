class Category < ActiveRecord::Base
  has_many :quizzes, :dependent => :destroy
  has_many :categories 
  belongs_to :category

  def self.catList()
    Category.where(:category_id => 0).as_json(:include => {:categories => {:include => :categories}}) 
  end

  def self.get_breadcrumds(cat_id)
    Category.find_by(id: cat_id).as_json(:include => :category)
  end

end
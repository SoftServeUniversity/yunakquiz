class Category < ActiveRecord::Base
  has_many :quizzes, :dependent => :destroy
  has_many :categories 
  belongs_to :category

  def self.getParentCategories()
    return Category.where("category_id = ?", '0').select(['id','category_id','title']).to_json
  end

  def self.getAllSubCategories()
    return Category.where('category_id!=?','0').select(['id','category_id','title']).to_json
  end

  def self.getAllCategories()
    return Category.select(['id','category_id','title']).to_json  
  end

  def self.getCategoryById(id)  
    return Category.where("id=?", id).to_json
  end

  def self.getSubCatByParCatId(id)
    return Category.where("category_id=?", id).select(['id','category_id','title']).to_json
  end
end

class Category < ActiveRecord::Base
  has_many :quizzes
  has_many :categories 
  belongs_to :category

  def self.createCat(data)
    newCategory = Category.where("title=?", data['title'])
    if newCategory.length > 0
      return nil
    end
    if data['id'] == 0 
      newCategory = Category.create(title: data['title'] ,category_id: 0)
    else
      newCategory = Category.find(data['id']).categories.create(title: data['title']) 
      return newCategory
    end
    return newCategory 
  end

  def self.updateCat(data)
    curCat = Category.find(data['id'])
    if curCat.category_id == '0'
      subCats = Category.where('category_id=?',curCat.id)
      if subCats.length > 0
      	curCat.title = data['title']
        curCat.save()
        return curCat
      end
    end
    curCat.update_columns(category_id: data['category_id'],title: data['title'])
    curCat.save()
    return curCat
  end

  def self.delCat(id)
    curCat = Category.find(id)
    if curCat.destroy();
      return {'success' =>'Category deleted'}
    else
      return nill
    end
  end  

  def self.query(data, action)
    if action == 'create'
  	  newCategory = Category.createCat(data)
  	  return newCategory
  	else
      if action == 'update'
        newCategory = Category.updateCat(data)
  	    return newCategory
      end
    end
  end

  def self.catList()
    Category.where(:category_id => 0).as_json(:include => {:categories => {:include => :categories}}) 
  end

end

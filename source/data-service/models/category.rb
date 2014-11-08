class Category < ActiveRecord::Base
  has_many :quizzes, :dependent => :destroy
  has_many :categories
  belongs_to :category

  def self.createCat(data)
  	newCat = Category.where("title=?", data['title'])
    if newCat.length > 0
      return nil
    end
    if data['id'] == 0 
      newCat = Category.create(title: data['title'] ,category_id: 0)
    else
      newCat = Category.find(data['id']).categories.create(title: data['title']) 
      return newCat
    end
    return newCat 
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
    if curCat.category_id == 0
      subCats = Category.where('category_id=?', curCat.id)
      if subCats.length > 0
        if subCats.delete_all && curCat.destroy()
          return {'success' =>'Category deleted'}
        else
          return nil
        end
      end
    end
    if curCat.destroy();
      return {'success' =>'Category deleted'}
    else
      return nil
    end
  end  

  # def self.query(data, action)
  # 	if action == 'create'
  # 	  newCat = Category.createCat(data)
  # 	  return newCat
  # 	else
  #     if action == 'update'
  #       newCat = Category.updateCat(data)
  # 	    return newCat
  #     end
  #   end
  # end
end

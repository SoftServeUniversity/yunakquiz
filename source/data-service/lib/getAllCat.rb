module PlastApp
  module GetAllCat
    def GetAllCat.getCategories(id)
      if id === 'parcat' #if id =parcat then return all parent categories
        Category.where("category_id = ?", '0').select(['id','category_id','title']).to_json
      elsif id === 'subcat'#if id = 'subcat' then return all sub categories
        return Category.where('category_id!=?','0').select(['id','category_id','title']).to_json    
      elsif id === 'all' #if id = 'all' then return all categories
        return Category.select(['id','category_id','title']).to_json  
      else 
        return Category.where("id=?", id).to_json
      end
    end
  end
end

module PlastApp 
  module SearchQuizzes
    def SearchQuizzes.withCatId(categories_id)
      if categories_id == '0' 
        return Quiz.select(['id', 'category_id', 'title', 'description', 'updated_at'])
      else
        return Quiz.where(category_id: categories_id).select(['id', 'category_id', 'title', 'description', 'updated_at'])
      end
    end
  end
end
module SearchQuizzes
	
  def SearchQuizzes.withCatId(categories_id)
    if categories_id == '0' 

      return Quiz.select(['id', 'category_id', 'title', 'description', \
      'updated_at'])

    else

      return Quiz.where(category_id: categories_id).select(['id', 'category_id'\
      , 'title', 'description', 'updated_at'])

    end
  end
  
  def SearchQuizzes.withTags(search_request)

    search_request['tags'].map! {|tag| tag = "%#{tag}%"}
    
    result =[]
    
    result = Quiz.find_by_sql ["SELECT quizzes.* FROM quizzes     \
      INNER JOIN tags ON quizzes.id = tags.quiz_id WHERE \
      category_id IN (?) AND tag LIKE ?", search_request['categories_id'], \
      search_request['tags']]
    
    return result.to_json
  end

  def addingLikeToArray(search_request)

    # Function that will be adding like to array acording to quntity of tags
    # in array

  end
end
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
  
  # Main search function
  # It's take object that contain two 
  # keys: category_id(Array)
  #       tags (Array)
  def SearchQuizzes.withTags(search_request)

    # Initialize SQlite string for search
    search_string = "SELECT quizzes.*, tag FROM quizzes    \
      INNER JOIN tags ON quizzes.id = tags.quiz_id WHERE   \
      category_id IN (?)"

    # Check if it all ok
    if search_request['tags'].length > 0 
      search_request['tags'].map! {|tag| search_string     \
        << " AND tag LIKE '%#{tag}%'"}
    else
    end
     
    # Request to db     
    result = Quiz.find_by_sql [search_string, search_request['categories_id']]
    
    return result.to_json
  end

end
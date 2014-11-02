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
  #       tags (Array) and returns result in json
  def SearchQuizzes.withTags(search_request)

    # Initialize SQlite string for search
    search_string = "SELECT GROUP_CONCAT(tag, \' \') as tagString, quizzes.* \
    FROM quizzes INNER JOIN tags ON quizzes.id = tags.quiz_id \
    WHERE category_id IN (?) GROUP BY quizzes.title HAVING tagString LIKE \'%"\
     << search_request['tags'][0] << "%\'"

    # Adding % to tegs for db request
    search_request['tags'].map! {|tag| search_string \
    << " AND tagString LIKE \'%#{tag}%\'"}

    # Adding end of db request string
    search_string = search_string \
    << "ORDER BY title;"

    # Main Request to db 
    # Using string that was generated
    search_result = Quiz.find_by_sql [search_string, \
    search_request['categories_id']]

    return search_result.to_json

  end

end

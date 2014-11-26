module SearchQuizzes 

  # Simple function that receiving
  # query from app.rb 
  # and it call main_search and 
  # puts data_check results as an argument 
  def search_and_check(query)

    return main_search(data_check(query))
        
  end  

  # Main search function
  # It's take's hash that contain three 
  # keys: category_id(Array),
  #       tags (Array),
  #       currentPage (fixnum);
  # And it returns result in json
  def main_search(search_request)

    @QUIZ_PER_PAGE = 10

    # To lower case 
    search_request[:tags][0] = search_request[:tags][0].mb_chars.downcase

    # Initialize SQlite string for search
    search_string = "SELECT GROUP_CONCAT(tag, \' \') as allTags, quizzes.*\
    FROM quizzes JOIN quizzes_tags ON quizzes_tags.quiz_id = quizzes.id\
    JOIN tags ON quizzes_tags.tag_id = tags.id WHERE category_id IN (?)\
    AND status=3 GROUP BY quizzes.title HAVING \
    allTags LIKE \"%#{search_request[:tags][0]}%\""

    # Removing first element from array
    search_request[:tags].shift 

    # Adding % to tegs for db request
    # and to lower case
    search_request[:tags].map! {|tag| 
      tag = tag.mb_chars.downcase
      search_string << " AND allTags LIKE \"%#{tag}%\""
    }

    # Count length of search result for paginating
    length = Quiz.find_by_sql ["SELECT COUNT(*) FROM (#{search_string})", \
    search_request[:categories_id]].as_json

    # Adding end of db request string
    # and limiting the query
    search_string = search_string \
    << " ORDER BY title LIMIT #{@QUIZ_PER_PAGE} OFFSET \
    #{search_request[:currentPage]*@QUIZ_PER_PAGE}"

    # Main Request to db 
    # Using string that was generated
    search_result = Quiz.find_by_sql [search_string, \
    search_request[:categories_id]]

    # If there no search results 
    # Just return empty array
    return {result: search_result, length: 0}.to_json if \
    length[0]["COUNT(*)"] == 0

    # Main response 
    return {result: search_result, length: length[0]["COUNT(*)"]}.to_json

  end

  # Function that generate 
  # hash from checked data
  def data_check(query)

    checked_data = {}

    checked_data[:tags] = tags_check(query['tags'])  
    checked_data[:categories_id] = \
    category_id_check(query['categories_id'])  
    checked_data[:currentPage] = current_page_check(query['currentPage'])  

    return checked_data

  end 

  # Function that receiving data 
  # and checks if it array and
  # has strings inside 
  def tags_check(tags)

    halt 400, "Tags must be array" if !tags.is_a?(Array) 
    
    halt 400, "No tags in array" if tags.empty? 

    tags.each { |tag| 
      halt 400,  "Tags must be in string" if !tag.is_a?(String)
    }

    return tags

  end 

  # Function that receiving data
  # and checks if it array and 
  # has integers inside
  def category_id_check(categories_id)

    halt 400, "Categories must be array" if !categories_id.is_a?(Array)

    halt 400, "No categories in array" if categories_id.empty?
    
    categories_id.each { |category| 
      halt 400, "Categories must be integer" if !category.is_a?(Fixnum)
    }

    return categories_id

  end
  
  # Checks if data is integer
  def current_page_check(current_page)

    halt 400, "Current page must be integer" if !current_page.is_a?(Fixnum)

    return current_page

  end 

end 

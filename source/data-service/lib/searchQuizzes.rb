module PlastApp
  
  module SearchQuizzes
  	
    # Simple function that recives 
    # request and call SearchQuizzes.dataCheck
    # and if it all ok calls SearchQuizzes.mainSearch
    def SearchQuizzes.withTags(search_request)

      checked_data = SearchQuizzes.dataCheck(search_request)

      if checked_data.is_a?(Hash)
        SearchQuizzes.mainSearch(checked_data)
      elsif checked_data.is_a?(Array)
        return checked_data
      else 
        return [500, "Internal Server Error"]
      end
        
    end  

    # Main search function
    # It's take object that contain two 
    # keys: category_id(Array)
    #       tags (Array) and returns result in json
    #       currentPage (fixnum)
    def SearchQuizzes.mainSearch(search_request)

      # To lower case 
      search_request[:tags][0] = search_request[:tags][0].mb_chars.downcase

      # Initialize SQlite string for search
      search_string = "SELECT GROUP_CONCAT(tag, \' \') as allTags, quizzes.*\
      FROM quizzes JOIN quizzes_tags ON quizzes_tags.quiz_id = quizzes.id \
      JOIN tags ON quizzes_tags.tag_id = tags.id WHERE category_id IN (?) \
      GROUP BY quizzes.title HAVING allTags LIKE \"%"\
       << search_request[:tags][0] << "%\""

      # Removing first element from array
      search_request[:tags].shift 

      # Adding % to tegs for db request
      # and to lower case
      search_request[:tags].map! {|tag| 
        tag = tag.mb_chars.downcase
        search_string << " AND allTags LIKE \"%#{tag}%\""
      }

      # Adding end of db request string
      search_string = search_string \
      << " ORDER BY title;"

      # Main Request to db 
      # Using string that was generated
      search_result = Quiz.find_by_sql [search_string, \
      search_request[:categories_id]]

      # If there no search results 
      # Just return empty array
      if search_result.length == 0
        return {result: search_result, length: 0}.to_json
      else
      end

      # Count for paginating
      length = search_result.length

      # Delete all unneeded results
      search_result = search_result.slice! (search_request[:currentPage]*10), 10

      return {result: search_result, length: length}.to_json

    end


    # Function that takes four or three keys 
    # and check if they are good for SearchQuizzes.mainSearch 
    # function, if they are not good return an error
    # and if all ok it returns hash 
    def SearchQuizzes.dataCheck(search_request)

      # Checks all keys for right data in them 
      if search_request['categories_id'].is_a?(Array) && \
        search_request['tags'].is_a?(Array) && \
        search_request['currentPage'].is_a?(Fixnum)
        
        # Check if categories_id are fixnum
        # ,and if there something in it
        if search_request['categories_id'].length > 0 
          search_request['categories_id'].each { |cat_id| 
            if !cat_id.is_a?(Fixnum)
              return [400, "Bad Request"]
            else
            end
          }
        else
          return [400, "Bad Request"] 
        end 

        # Check if tags in array are string
        # ,and if there something in it
        if search_request['tags'].length > 0
          search_request['tags'].each { |tag| 
            if !tag.is_a?(String)
              return [400, "Bad Request"]
            else
            end
          }
        else
          return [400, "Bad Request"]
        end

      else
        return [400, "Bad Request"]
      end

      # Returns checked keys, if status are nilclass
      # don't return him, and if status are num 
      # then make an request
      if search_request['status'].is_a?(NilClass)

        return {tags: search_request['tags'], \
          currentPage: search_request['currentPage'], \
          categories_id: search_request['categories_id']}

      else

        # Check if search_request['status'] is 
        # a fixnum if not return error
        if search_request['status'].is_a?(Fixnum)

          return {tags: search_request['tags'], \
          currentPage: search_request['currentPage'], \
          categories_id: search_request['categories_id'], \
          status: search_request['status']}

        else
          return [400, "Bad Request"]
        end

      end


    end 

  end

end 

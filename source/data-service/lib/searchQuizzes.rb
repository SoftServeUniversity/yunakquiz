module PlastApp 
  module SearchQuizzes
    def SearchQuizzes.withCatId(categories_id)
      if categories_id == '0' 
        return Quiz.select(['id', 'category_id', 'title', 'description', 'updated_at'])
      else
        return Quiz.where(category_id: categories_id).select(['id', 'category_id', 'title', 'description', 'updated_at'])
      end
    end

    def SearchQuizzes.withTags(search_request)
      searchTags = search_request['tags']
      categories_id = search_request['categories_id']
      foundedTags ={}
      result =[]

      quizWithId = SearchQuizzes.withCatId(categories_id)

      quizWithId.each_with_index do |quiz, index|
        searchTags.each do |tag|
          if  quiz.tags.where("tag like ?", "%" + tag + "%").length > 0
            foundedTags =quiz.as_json
            foundedTags['tags'] = quiz.tags.select(['tag','id']).as_json
          else 
            foundedTags = 0
            break
          end
        end
        if foundedTags !=0
          result.push(foundedTags)
        end
      end
      return result.to_json
    end
  end
end
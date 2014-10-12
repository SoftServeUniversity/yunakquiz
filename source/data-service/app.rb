module PlastApp
  require 'sinatra'
  require 'json'
  require 'rest_client'
  require 'rubygems'
  require 'sinatra/activerecord'
  require 'json/ext' # required for .to_json
  require 'sinatra/cross_origin'

  require 'sinatra/asset_pipeline'

  class Categories < ActiveRecord::Base
  end

  class Tags < ActiveRecord::Base
  end

  class Quizzes < ActiveRecord::Base
  end

  class YunakQuiz < Sinatra::Base
    register Sinatra::AssetPipeline

    register Sinatra::ActiveRecordExtension
    register Sinatra::CrossOrigin
    Dir.glob('./config/*.rb').each {|file| require file}
    Dir.glob('./models/*.rb').each {|file| require file}

    get '/' do
        erb :index
    end

    get '/assessments' do
      content_type :json
      [{id: 1, name: 'assessment 1'}, {id: 2, name: 'assessment 2'}].to_json
    end

    put '/assessments' do
      content_type :json
      {response: 'Added an assessment'}.to_json
    end

    post '/assessments/:id' do
      cross_origin
      content_type :json
      {response: "Updated to #{params['id']} assessment"}.to_json
    end

    delete '/assessments/:id' do
      content_type :json
      {response: "Assessment #{params['id']} has been deleted"}.to_json
    end

    get '/guest-search' do
      content_type :json
      Categories.select('id, category_id, title').to_json
    end 
     
    options '/*' do 
      '*'           
    end

    post '/search' do
      cross_origin
      content_type :json

      data = JSON.parse(request.body.read)
      search = [] # init new array for search

      #-------------------checking of input data------------------

      if data.has_key?('keyWord')
        search.push(data['keyWord']) 
      else
        halt 500, "error message" #need to look for right error number http
      end

      data['allCats'].each { |x| 
        if x.has_key?('search') && x['search'] == true
            search.push(x)
        end
      }

      if search.length <= 1 #check if there were something 
        halt 500, "error message" #need to look for right error number http
      end

      
      #--------------------search in db part----------------------
      
      def subcat_search (category_id, keyWord) #function that takes category id and keyword and return the quizze 
        
        tags = Tags.where(tag: keyWord).as_json # select all tags with keyword 
        
        quizze = []
        tags.each {|key| quizze.push(Quizzes.where(id: key['quiz_id']).as_json)} # select quizzes id with quiz_id in tag

        category = []
        quizze.each {|key, value| category.push(Categories.where(id: key['category_id']).as_json)} #select categories id with categoty_id in quizzes 

        search_result = []
        category.each {|key, value|
          if key['id'] == category_id
            search_result = Quizzes.where(category_id: key['id']).as_json 
          end          
        } 
        puts search_result
        return search_result
      end

      puts(subcat_search(1,'teg1'))

      {response: "sss"}.to_json
      
    end

  end

end
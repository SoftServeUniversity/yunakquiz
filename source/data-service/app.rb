module PlastApp
  require 'sinatra'
  require 'json'
  require 'rest_client'
  require 'rubygems'
  require 'sinatra/activerecord'
  require 'json/ext' # required for .to_json
  require 'sinatra/cross_origin'

  require 'sinatra/asset_pipeline'

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
      Category.select('id, category_id, title').to_json
    end 
     
    options '/*' do 
      '*'           
    end

    post '/search' do
      
      cross_origin
      content_type :json

      # Recive object from front end and put it in data
      
      search_request = JSON.parse(request.body.read)
      
      # This part of code must be in another file   

      #---------------Preparing object for search-----------------

      # This function takes hash with 2 arrays as an argument
      # and adding %*% to each teg
      # % is needed for future search!
      # and of course it returns result 
      def add_procents_to_tags (search_request) 

        search_request['tags'].map! {|tag| tag = "%#{tag}%"}
        return search_request

      end

      #--------------------Search in db part----------------------
      
      # This sh*t kills many of my neutrons ;-), so  
      # this function takes hash as argument
      # and return from db quizzes that we need, 
      # according to our request
      def subcat_search (search_request)  

        return Quiz.where({ category_id: search_request['categories']})\
        .joins(:tags).where("tags.tag LIKE (?) COLLATE utf8_general_ci", \
          search_request['tags']) 
           
      end

     #------------------------------------------------------------ 

    # This call subcat_search function that takes add_procents_to_tags 
    # as an arguments, and finnaly all this data return to front-end
    (subcat_search(add_procents_to_tags(search_request))).to_json
    
    end

  end

end
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
    Dir.glob('./lib/*.rb').each {|file| require file}

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

    # For all categories
    get '/guest-search' do
      content_type :json
      Category.select('id, category_id, title').to_json
    end 
     
    options '/*' do 
      '*'           
    end

    post '/search' do
      content_type :json
      search_request = JSON.parse(request.body.read) 

      # This function is part of module SerchQuizzes as parameter 
      # Gets object {category_id: ['1','2',..'n'] , tags:['teg1','teg2',..'n']}
      # If category_id is not passed then search in all subcategories
      SearchQuizzes.withTags(search_request) 

    end
  end

end
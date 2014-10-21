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

    get '/guest-search' do
      content_type :json
      Category.select('id, category_id, title').to_json
    end 
     
    options '/*' do 
      '*'           
    end

    get '/categories/:id' do
      content_type :json
      #if id = 'parcat' then return all par cat ,id ='subcat' then return all subcats,id='all' then return all categories
      GetAllCat.getCategories(params['id'])
    end
    get '/categories/parent/:id' do
      content_type :json
      Category.where("id=?", params['id']).to_json
    end

    get '/categories/subcat/:id' do
      content_type :json
      Category.where("category_id=?", params['id']).select(['id','category_id','title']).to_json
    end 

    get '/quizzes/:category_id' do
      content_type :json
      # this function is part of module SerchQuizzes ,returns quizzes with passed category_id or if 0 passed returns all quizzes
      SearchQuizzes.withCatId(params['category_id']).to_json 
    end  

    post '/search' do
      content_type :json
    search_request = JSON.parse(request.body.read) 
#this function is part of module SerchQuizzes as parameter gets object {category_id: ['1','2',..'n'] , tags:['teg1','teg2',..'n']}
#if category_id is not passed then search in all subcategories
    SearchQuizzes.withTags(search_request) 
    end
  end

end
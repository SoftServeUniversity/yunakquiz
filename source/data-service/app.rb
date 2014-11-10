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

    options '/*' do
    end

    get '/assessments' do
      content_type :json
      [{id: 1, name: 'assessment 1'}, {id: 2, name: 'assessment 2'}].to_json
    end
    
    get '/admin/assessments/:id/comments' do
      content_type :json
      Comment.get(params['id']).to_json
    end 

    put '/admin/assessments/:id' do
      content_type :json
      data = JSON.parse(request.body.read)
      quiz = Quiz.updateQ(data)
      if quiz
        return [200, quiz.id.to_json]
      else
        return [400, quiz.errors.messages.to_json]
      end    
    end

    post '/admin/assessments' do
      content_type :json
      data = JSON.parse(request.body.read)
      #check permisions here
      quiz = Quiz.createQ(data)
      if quiz
        return [200, quiz.id.to_json]
      else
        return [400, quiz.errors.messages.to_json]
      end
    end

    get '/assessments/:id' do
      content_type :json
      quiz = Quiz.queryQ(params['id'])
      if quiz['id']
        JSON.pretty_generate(quiz) 
      else
        return [400, quiz.to_json]
      end
    end

    delete '/admin/assessments/:id' do
      content_type :json
      Quiz.deleteQ(params['id'])
      {response: "Assessment #{params['id']} has been deleted"}.to_json
    end

    get '/admin/assessments/:status' do
      content_type :json
      quizzes = Quiz.queryList(params['status'])
      if quizzes
        JSON.pretty_generate(quizzes) 
      else
        return [400, "Not found "+params['status']]
      end
    end

    # For all categories
    get '/guest-search' do
      content_type :json
      Category.select('id, category_id, title').to_json
    end 

    get '/tags/:query' do
      content_type :json
      query = '%'+params['query'][0,20]+'%'
      Tag.select(:tag, :id).where("tag like ?", query).to_json
    end

    post '/search' do
      content_type :json
      data = JSON.parse(request.body.read)
      if data['tags'].length ===0
        quizzes = Quiz.joins(:category).where(:categories => { :id => data['categories_id'] })
        .group('quizzes.id').as_json(:include => :tags)
      else
        quizzes = Quiz.joins(:category, :tags).where("categories.id" => data['categories_id'])
        .group('quizzes.id').where("tags.tag in (?)", data['tags']).as_json(:include => :tags)
      end
      if quizzes
        return [200, quizzes.to_json]
      else
        return [400, "neOk"]
      end
    end

  end

end

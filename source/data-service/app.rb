module PlastApp
  require 'sinatra'
  require 'sinatra/activerecord'
  require 'json'
  require 'rest_client'
  require 'rubygems'
  require 'json/ext' # required for .to_json
  require 'sinatra/cross_origin'
  require 'sinatra/asset_pipeline'

  class YunakQuiz < Sinatra::Base
    register Sinatra::AssetPipeline
    register Sinatra::ActiveRecordExtension
    register Sinatra::CrossOrigin

    Dir.glob('./config/*.rb').each {|file| require file}
    Dir.glob('./models/*.rb').each {|file| require file}

    configure do
        enable :sessions
    end

    options '/*' do
    end
    
    get '/' do
        erb :index
    end
    
    get '/access' do
      	if session[:user_id]
        	user = User.find(session[:user_id])
        	return [200, user.username]
    	  end
      		return [401, "unauthorized"]
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

    post '/login' do
      data = JSON.parse request.body.read
      user = User.authenticate(data['username'], data['password'])
      if !user.nil?
        session[:user_id] = user.id
        return [200, user.username]
      end
        return [401, "unauthorized"]
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

    get '/logout' do
      session.clear
      return [200, "ok"]
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

  end
end  

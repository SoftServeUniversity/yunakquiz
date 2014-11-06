module PlastApp
  require 'sinatra'
  require 'sinatra/activerecord'
  require 'json'
  require 'rest_client'
  require 'rubygems'
  require 'json/ext'
  require 'sinatra/cross_origin'
  require 'sinatra/asset_pipeline'
<<<<<<< HEAD
  
=======

>>>>>>> e5fc1713164625bf8b5ed28bbe0aae1503aacf7e
  class YunakQuiz < Sinatra::Base
    register Sinatra::AssetPipeline
    register Sinatra::ActiveRecordExtension
    register Sinatra::CrossOrigin
<<<<<<< HEAD
    
    configure do
      enable :cross_origin
      enable :sessions
      set :session_secret, "My session secret"
    end  
   
    Dir.glob('./config/*.rb').each {|file| require file}
    Dir.glob('./models/*.rb').each {|file| require file}
    
    before do
      headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
      headers['Access-Control-Allow-Origin'] = 'http://localhost:8000'
      headers['Access-Control-Request-Method'] = '*'
      headers['Access-Control-Allow-Headers'] = 'accept, x-requested-with, content-type, authorization, origin'
      headers['Access-Control-Allow-Credentials'] = 'true'
    end

    options '/*' do
      '*'
    end
    
    get '/access' do
      puts "session_id is: #{session[:id]}"
      if session[:id]
        user = User.find(session[:id])
        return [200, user.username]
    	else
        return [401, "unauthorized"]
      end  
=======

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
>>>>>>> e5fc1713164625bf8b5ed28bbe0aae1503aacf7e
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

<<<<<<< HEAD
    get '/admin' do
      if session[:id]
        user = User.find(session[:id])
        role = Role.find(user.role_id)
        base = Permission.where("#{role.name} = #{role.id}").pluck("tabs").to_json
        return base
      end  
    end

    post '/login' do
      data = JSON.parse request.body.read
      user = User.authenticate(data['username'], data['password'])
      if !user.nil?
        session[:id] = user.id
        return [200, user.username]
      else
        return [401, "unauthorized"]
      end  
    end

    get '/' do
        erb :index
    end

    post '/register' do
      data = JSON.parse request.body.read
      user = User.new(data)
      # ardcode for roles. 1-admin, 2 - moder, 3 - user, 4 - superadmin (admin+moder) role
      user.role_id = 4
      if user.save
        return [200, "ok"]
      else
        return [400, user.errors.messages.to_json]
      end
    end
    
    post '/logout' do
      session.clear
      return [200, "ok"]
    end
  
  end
=======
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

  end

>>>>>>> e5fc1713164625bf8b5ed28bbe0aae1503aacf7e
end

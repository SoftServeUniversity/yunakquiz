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
    enable :session
    # set :sessions, true
    set :session_secret, "My session secret"

    Dir.glob('./config/*.rb').each {|file| require file}
    Dir.glob('./models/*.rb').each {|file| require file}
    
    options '/*' do
      '*'
    end
    
    get '/access' do
      puts session
      if session[:id]
        user = User.find(session[:id])
        return [200, user.username]
    	else
        return [401, "unauthorized"]
      end  
    end

    get '/admin' do
      # if session[:user_id]
        # user = User.find(session[:user_id])
        user = User.find(2)
        role = Role.find(user.role_id)
        base = Permission.where("#{role.name} = #{role.id}").select("tabs").to_json
        return base
      # end
      # return [401, "unauthorized"]
    end

    post '/login' do
      data = JSON.parse request.body.read
      user = User.authenticate(data['username'], data['password'])
      if !user.nil?
        session[:id] = user.id
        puts "Your ID is #{session[:id]}"
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
      # user.role_id = 1
      user.role_id = 2
      if user.save
        return [200, "ok"]
      else
        return [400, user.errors.messages.to_json]
      end
    end
    
    get '/logout' do
      session.clear
      return [200, "ok"]
    end
  
  end
end

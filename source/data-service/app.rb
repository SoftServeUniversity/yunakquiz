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
    	end
      return [401, "unauthorized"]
    end

    get '/admin' do
      
      # puts "session id is : #{asd}"
      # if session[:user_id]
        user = User.find(2)
        puts "user is: #{user.role_id}"
        # user = User.find(session[:user_id])
        role = Role.find(user.role_id)
        puts "role is: #{role.name}"
        base = Permission.where("#{role.name} = #{role.id}").select("tabs").to_json
        puts "base is: #{base}"
        return base
      # end
      # return [401, "unauthorized"]

      # base = [
        # 'admin1','admin2','comm1','comm2','admin3'
        # 'moder1','comm1','comm2','moder2'
      # ].to_json
      # return base
      # if session[:user_id]
      #   user = User.find(session[:user_id])
      #   role = Role.find(user.role_id)
      #   permission = role.name+RoleTable
      #   return [200, role.name]
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
      end
        puts "login failed"
        return [401, "unauthorized"]
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
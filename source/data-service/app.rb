module PlastApp
  require 'sinatra'
  require 'sinatra/activerecord'
  require 'json'
  require 'rest_client'
  require 'rubygems'
  require 'json/ext' # required for .to_json
  require 'sinatra/cross_origin'
  require 'sinatra/asset_pipeline'
  
  class User < ActiveRecord::Base
  end
  
  class YunakQuiz < Sinatra::Base
    register Sinatra::AssetPipeline
    register Sinatra::CrossOrigin

    configure do
      	enable :sessions
    end
    
    options '/*' do
      	'*'
    end
    
    get '/access' do
      	if session[:user_id]
        	user = User.find(session[:user_id])
        	return [200, user.username]
    	end
      		return [401, "unauthorized"]
    end

    post '/login' do
      	data = JSON.parse request.body.read
      	user = User.where(username: data['username'], hashed_password: data['password']).first 
      	if !user.nil?
        	if data['remember']
          		session[:user_id] = user.id
        	end
        		return [200, user.username]
      	end
      		return [401, "unauthorized"]
    end

    get '/logout' do
      	session.delete(:user_id)
      	return [200, "ok"]
    end
  
  	end
end

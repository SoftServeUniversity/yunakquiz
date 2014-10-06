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
        enable :cross_origin
        enable :sessions
        set :session_secret, 'cca369ff55af5ceefc50939498d93f5905272422baf5d86dd0c4271e2e68a9ba'
        set :allow_origin, :any
        set :allow_methods, [:head, :get, :post, :options, :delete, :put]
        set :allow_credentials, true
        set :max_age, "86400"
        set :allow_headers, ['*', 'Content-Type', 'Origin', 'Accept', 'X-Requested-With', 'x-xsrf-token', 'X-HTTP-Method-Override', 'Cache-Control']
        set :expose_headers, ['Content-Type']
    end
    
    set :database, 'sqlite3:./db/quiz.db'
    
    options '/*' do
        '*'
    end
    
    post '/register' do
        data = JSON.parse request.body.read
        user = User.new
        user.username = data['username'] 
        user.first_name = data['first_name']
        user.last_name = data['last_name']
        user.hashed_password = data['password']
        user.email = data['email']
        user.birthday = data['birthday']
        user.plast_hovel = data['plast_hovel']
        user.plast_region = data['plast_region']
        user.plast_level = data['plast_level']
        user.picture = data['picture']
      
      if !User.find_by username: user.username
        user.save
        return [200, "ok"]
      end
        puts "this user already exists!"
        return [409, "this user is already exists"]
    end
  
  end
end
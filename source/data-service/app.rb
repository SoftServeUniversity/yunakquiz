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
    
    configure do
        enable :sessions
    end
    
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
        return [409, "This username already exists"]
    end
  
  end
end

module PlastApp
  require 'sinatra'
  require 'sinatra/activerecord'
  require 'json'
  require 'rest_client'
  require 'rubygems'
  require 'json/ext'
  require 'sinatra/cross_origin'
  require 'sinatra/asset_pipeline'
  
  class YunakQuiz < Sinatra::Base
    register Sinatra::AssetPipeline
    register Sinatra::ActiveRecordExtension
    register Sinatra::CrossOrigin
    
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
    end


# @json = Array.new
# nearby_sales.each do |sale|
#   @json << sale.locations.to_gmaps4rails
# end
# @json.to_json

    get '/admin' do

      if session[:id]
        user = User.find(session[:id])
        list = Array.new 
        roles = user.role_id.to_s        
        roles.each_char { |value|
          role = Role.find(value)
          list.concat(Permission.where("#{role.name} = #{role.id}").pluck("tabs"))
        }
        list.uniq!
        rezz = list.to_json
        return rezz
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
      # hardcode for roles. 1-admin, 2 - moder, 3 - user
      user.role_id = 12
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
end

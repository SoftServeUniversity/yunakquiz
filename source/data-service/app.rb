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

    put '/user' do
      data = JSON.parse request.body.read
      filter = %w(first_name last_name email birthday plast_level plast_region plast_hovel picture)
      data.delete_if{|key, value| !filter.include? key}
      user = User.find(session[:user_id])
      data.each{|key, value| user.send("#{key}=", value)}
      if user.save
        return [200, 'ok']
      else
        return [400, 'bad request']
      end
    end

    post '/avatar' do
      if session[:user_id]
        user = User.find(session[:user_id])
        tempfile = params[:file][:tempfile]
        filename = params[:file][:filename]
        saved_name = "#{user.username}#{File.extname(filename)}"
        FileUtils.copy(tempfile.path, "public/img/ava/#{saved_name}")
        return [200, saved_name]
      end
      return [401, "unauthorized"]
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

  end

end
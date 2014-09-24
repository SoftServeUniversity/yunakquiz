module PlastApp
  require 'sinatra'
  require 'json'
  require 'rest_client'
  require 'rubygems'
  require 'mongo'
  require 'json/ext' # required for .to_json

  require 'sinatra/asset_pipeline'

  class YunakQuiz < Sinatra::Base
    register Sinatra::AssetPipeline

    get '/' do
      erb :index
    end

    get '/assessments' do
      content_type :json
      [{id: 1, name: 'assessments 1'}, {id: 2, name: 'assessments 2'}].to_json
    end

    put '/assessments' do
      content_type :json
      {response: 'Added an assessments'}.to_json
    end

    post '/assessments/:id' do
      content_type :json
      {response: "Updated to #{params['id']} assessments"}.to_json
    end

    delete '/assessments/:id' do
      content_type :json
      {response: "Assessment #{params['id']} has been deleted"}.to_json
    end

  end

end
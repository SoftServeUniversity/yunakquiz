module PlastApp
# encoding: UTF-8
  require 'sinatra'
  require 'sinatra/activerecord'
  require 'json'
  require 'rubygems'

  
  class YunakQuiz < Sinatra::Base

  before do
    
   headers'Access-Control-Allow-Origin' => '*', 
          'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST'] ,
          'Access-Control-Allow-Headers' => ['*', 'X-Requested-With', 'X-Prototype-Version', 'X-CSRF-Token', 'Content-Type', 'X-Custom-Header'],
          'Access-Control-Allow-Credentials' => 'false'          
  end
  
  Dir['./models/*.rb'].each {|file| require file} 

  
    get '/' do
      erb :index
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
      content_type :json
      {response: "Updated to #{params['id']} assessment"}.to_json
    end

    delete '/assessments/:id' do
      content_type :json
      {response: "Assessment #{params['id']} has been deleted"}.to_json
    end
   
    get '/parcat' do
      content_type :json
      Parcat.select(['id','parCatName','created_at']).to_json
    end

    get '/subcat' do
      content_type :json
      Subcat.select(['id','parcat_id','subCatName','created_at']).to_json
    end 

    get '/assessments/ids' do
      content_type :json
      Assessment.select(['id','subcat_id']).to_json
    end    
#      get '/subcat/:id' do
#      content_type :json
#    Subcat.where("parcat_id=?", params['id']).to_json
  end 
end   
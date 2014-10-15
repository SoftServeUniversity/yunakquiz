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

    options '/*' do
    end

    get '/assessments' do
      content_type :json
      [{id: 1, name: 'assessment 1'}, {id: 2, name: 'assessment 2'}].to_json
    end
       
    put '/admin/assessments/:id' do
      content_type :json
      push = JSON.parse(request.body.read)
      {response: 'Updated an assessment'}.to_json
    
    end

    post '/admin/assessments' do
      content_type :json
      push = JSON.parse(request.body.read)
      {response: "Created Quiz with ID: xxx"}.to_json
    end

     get '/assessments/:id' do
      content_type :json

      myObj = {
        'id' => params['id'],
        'title' => Quiz.find(params['id']).title,
        'questions' => Quiz.find(params['id']).questions.select("id, title").as_json,
         }

      myObj['questions'].each_with_index do |value, index|
             value['answers'] = Question.find(value['id']).answers.select("id, title,correct").as_json
          end
      
       JSON.pretty_generate(myObj) 
    end

    delete '/assessments/:id' do
      content_type :json
      {response: "Assessment #{params['id']} has been deleted"}.to_json
    end

  end

end
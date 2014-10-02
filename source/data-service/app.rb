module PlastApp
  require 'sinatra'
  require 'json'
  require 'rest_client'
  require 'rubygems'
  require 'mongo'
  require 'json/ext' # required for .to_json

  require 'sinatra/asset_pipeline'

  class Measure < ActiveRecord::Base
    has_many :assessments
  end
  
  class Assessment < ActiveRecord::Base
    has_many :questions
    belongs_to :measure
  end

  class Question < ActiveRecord::Base
    belongs_to :assessment
    has_many :answers
  end

  class Answer < ActiveRecord::Base
    belongs_to :question
  end

  class YunakQuiz < Sinatra::Base
    register Sinatra::AssetPipeline

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

     get '/assessments/:id' do
      content_type :json

      myObj = {
        'title' => Assessment.find(params['id']).title,
        'questions' => Assessment.find(params['id']).questions.select("id, title").as_json,
         }

      myObj['questions'].each_with_index do |value, index|
             value['answers'] = Question.find(value['id']).answers.select("id, title").as_json
          end
      
       JSON.pretty_generate(myObj) 
    end

    delete '/assessments/:id' do
      content_type :json
      {response: "Assessment #{params['id']} has been deleted"}.to_json
    end

  end

end
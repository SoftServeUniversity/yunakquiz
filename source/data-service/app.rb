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

    use Rack::Session::Cookie, 
      :secret => 'cca369ff55af5ceefc50939498d93f5905272422baf5d86dd0c4271e2e68a9ba'

    Dir.glob('./config/*.rb').each {|file| require file}
    Dir.glob('./models/*.rb').each {|file| require file}

    def response_helper data,msg
      if data
        return [200, data.to_json]
      else
        return [400, msg.to_json]
      end
    end 


    get '/' do
        erb :index
    end

    options '/*' do
    end

    get '/assessments' do
      content_type :json
      [{id: 1, name: 'assessment 1'}, {id: 2, name: 'assessment 2'}].to_json
    end
    
    get '/admin/assessments/:id/comments' do
      content_type :json
      Comment.get(params['id']).to_json
    end 

    put '/admin/assessments/:id' do
      content_type :json
      data = JSON.parse(request.body.read)
      quiz = Quiz.updateQ(data)
      if quiz
        return [200, quiz.id.to_json]
      else
        return [400, quiz.errors.messages.to_json]
      end    
    end

    post '/admin/assessments' do
      content_type :json
      data = JSON.parse(request.body.read)
      #check permisions here
      quiz = Quiz.createQ(data)
      if quiz
        return [200, quiz.id.to_json]
      else
        return [400, quiz.errors.messages.to_json]
      end
    end

    get '/assessments/:id' do
      content_type :json
      quiz = Quiz.queryQ(params['id'])
      if quiz['id']
        JSON.pretty_generate(quiz) 
      else
        return [400, quiz.to_json]
      end
    end

    delete '/admin/assessments/:id' do
      content_type :json
      Quiz.deleteQ(params['id'])
      {response: "Assessment #{params['id']} has been deleted"}.to_json
    end

    get '/admin/assessments/:status' do
      content_type :json
      quizzes = Quiz.queryList(params['status'])
      if quizzes
        JSON.pretty_generate(quizzes) 
      else
        return [400, "Not found "+params['status']]
      end
    end

    post '/admin/users' do
      data = JSON.parse(request.body.read)
      @users = User.quiz_query(data['status'], data['searchData'],data['currentPage'],data['itemsPerPage'], data['roles'])
     response_helper @users, "Users not found!"
    end

    delete '/admin/users:id' do
      user = User.find(params['id'])
      if !user.nil?
        user.destroy
        return [200, 'ok']
      end
      return [400, 'bad request']
    end

    end
end

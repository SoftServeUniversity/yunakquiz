module PlastApp
  require 'sinatra'
  require 'sinatra/activerecord'
  require 'json'
  require 'rest_client'
  require 'rubygems'
  require 'json/ext' # required for .to_json
  require 'sinatra/cross_origin'
  require 'sinatra/asset_pipeline'

  class YunakQuiz < Sinatra::Base
    register Sinatra::AssetPipeline
    register Sinatra::ActiveRecordExtension
    register Sinatra::CrossOrigin

    Dir.glob('./config/*.rb').each {|file| require file}
    Dir.glob('./models/*.rb').each {|file| require file}
    
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

     get '/assessments/:id' do
      content_type :json

      myObj = {
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
      Quiz.deleteQ(params['id'])
      {response: "Assessment #{params['id']} has been deleted"}.to_json
    end
    
    get '/categories/parent' do
      content_type :json
      Category.where("category_id = '0'").select(['id','category_id','title']).to_json
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

    get '/categories/subcat' do
      content_type :json
      Category.where('category_id!=?','0').select(['id','category_id','title']).to_json
    end 

    get '/quizzes/ids' do
      content_type :json
      Quiz.select(['id','category_id','title']).to_json
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
      
      return [400, user.errors.messages.to_json]
    end
  
  end
end

module PlastApp
  require 'sinatra'
  require 'json'
  require 'rest_client'
  require 'rubygems'
  require 'sinatra/activerecord'
  require 'json/ext' # required for .to_json
  require 'sinatra/cross_origin'
  require 'securerandom'

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
      tempfile = params[:file][:tempfile]
      filename = params[:file][:filename]
      saved_name = "#{SecureRandom.hex(5)}#{File.extname(filename)}"
      FileUtils.copy(tempfile.path, "public/avatar/#{saved_name}")
      return [200, saved_name]
    end  
    
    delete '/user' do
      data = params
      user = User.authenticate(data['username'], data['password'])
      if user
        user.destroy
        return [200, 'ok']
      end
      return [400, 'bad request']
    end

    get '/assessments' do
      content_type :json
      [{id: 1, name: 'assessment 1'}, {id: 2, name: 'assessment 2'}].to_json
    end
    
    get '/admin/assessments/comments/:id' do
      content_type :json
      Comment.get(params['id']).to_json
    end 

    put '/admin/assessments/comments' do
      content_type :json
      data = JSON.parse(request.body.read)
      comments = Comment.updateC(data)
      if comments
        return [200, {status: 'ok'}.to_json]
      else
        return [400, 'neOk']
      end
    end 

    delete '/admin/assessments/comments/:id' do
      content_type :json
      comments = Comment.deleteC(params['id'])
      if comments
        return [200, {status: 'ok'}.to_json]
      else
        return [400, 'neOk']
      end
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
        quiz
        # JSON.pretty_generate(quiz) 
      else
        return [400, quiz.to_json]
      end
    end

    delete '/admin/assessments/:id' do
      content_type :json
      Quiz.deleteQ(params['id'])
      {response: "Assessment #{params['id']} has been deleted"}.to_json
    end

    #Guest Search query
     get '/guest-search' do
      content_type :json
      Category.select('id, category_id, title').to_json
    end 
    #End of Guest Search
    
    get '/categories' do
      content_type :json
      JSON.pretty_generate(Category.catList)
    end  

    get '/admin/assessments/:status' do
      content_type :json
      quizzes = Quiz.quizQuery(params['status'])
      if quizzes
        JSON.pretty_generate(quizzes)

      else
        return [400, "Not found "+params['status']]
      end
    end

    post '/admin/assessments/:status' do
      content_type :json
      data = JSON.parse(request.body.read)
      #check permisions here
      quizzes = Quiz.quizQuery(params['status'],data['searchData'],data['currentPage'],data['itemsPerPage'])
      if quizzes
        JSON.pretty_generate(quizzes)
      else
        return [400, 'Error']
      end
    end

  end
end

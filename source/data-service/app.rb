# encoding: UTF-8
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
    
    def logged_user 
     if session[:user_id]
      return User.find(session[:user_id])
     end
     nil
    end

    options '/*' do
    end
    
    get '/' do
        erb :index
    end
    
    get '/categories' do
      content_type :json
      JSON.pretty_generate(Category.catList)
    end  


  ## Assessments block starts here!

    def response_helper data,msg
      content_type :json
      if data
        return [200, data.to_json]
      else
        return [400, msg.to_json]
      end
    end 


    ## Quiz resource start
    get '/admin/assessments/:id' do
      if logged_user
        @quiz = Quiz.get_for_edit(params['id'], logged_user)
        response_helper @quiz, ["Quiz #{params['id']} not found!"]
      end
      response_helper @quiz, ["Forbidden!!!"]
    end

    post '/admin/assessments' do
      if logged_user
        data = JSON.parse(request.body.read)
        @quiz = Quiz.create_quiz(data, logged_user)
      end  
      response_helper @quiz, "Quiz not created!"
    end

    put '/admin/assessments/:id' do
      if logged_user
        data = JSON.parse(request.body.read)
        @quiz = Quiz.update_quiz(data, logged_user) unless data['id'].nil?
      end
      response_helper @quiz, "Quiz not found!"
    end    

    delete '/admin/assessments/:id' do
      if logged_user
        @quiz = Quiz.delete_quiz(params['id'], logged_user)
      end
      response_helper @quiz, "Quiz not deleted!"
    end

    ## Validate if quiz title exists
    post '/admin/assessments/title' do
      data = JSON.parse(request.body.read)
      query = Quiz.where(title: data['query']).exists?
      @result = {present: query}
      response_helper @result, "Error"
    end

    post '/admin/assessments/:id/title' do
      data = JSON.parse(request.body.read)
      query = Quiz.where(title: data['query']).where.not(id: params['id']).exists? 
      @result = {present: query}
      response_helper @result, "Error"
    end
    ## Quiz resource end

    get '/assessments/:id' do
      @quiz = Quiz.get_by_id(params['id'])

      response_helper @quiz, ["Published Quiz #{params['id']} not found!"]
    end

    post '/assessments/result' do
      data = JSON.parse(request.body.read)
      if logged_user
        Result.save(logged_user, data['quiz_id'], data['grade'])
      end  
      @quiz={}
      response_helper @quiz, "Quiz not created!"
    end    

    ## end of Assessment resource.

    get '/breadcrumbs/:cat_id' do
      @breadcrumbs = Category.get_breadcrumds(params['cat_id'])

      response_helper @breadcrumbs, ["Quiz #{params['id']} not found!"]
    end

    ## Quizzes list for user
    post '/assessments/:status' do
      if logged_user
        data = JSON.parse(request.body.read)
        categories = nil
        @quizzes = Quiz.quiz_query(params['status'], data['searchData'],
        data['currentPage'], data['itemsPerPage'], categories, logged_user)
      end
      response_helper @quizzes, "Потрібно залогуватись"
    end

    ## Quizzes list for moderators
    post '/assessments/moderator/:status' do
      if logged_user && logged_user.role.name === "moder"
        data = JSON.parse(request.body.read)
        categories = data['categoryFilter'] 
        categories = Category.all.pluck("id") if categories.empty? 
        @quizzes = Quiz.quiz_query(params['status'], data['searchData'],
         data['currentPage'], data['itemsPerPage'],categories)
        response_helper @quizzes, "Quizzes not found"
      end
      response_helper @quizzes, "Forbidden!"
    end
    
    ##Quiz comments section start
    get '/assessments/:id/comments' do
      @comment = {quiz_id:params['id'].to_i, arr: Comment.get_by_quiz(params['id'])}

      response_helper @comment, ["Comments #{params['id']} not found!"]
    end 

    post '/assessments/:id/comments' do
      data = JSON.parse(request.body.read)
      @comments = {updated: Comment.update_comments(data['arr'],params['id'])}

      response_helper @comments, ["comments not updated"]
    end 

    delete '/assessments/:id/comments' do
      content_type :json
      @comments = {deleted: Comment.delete_comments(params['id'])}

      response_helper @comments, ["Comments not deleted!"]
    end
    ##Quiz comments section end

    ##User_statistic block
    get '/statistic' do
      user = User.find(session[:user_id])
      created = user.quizzes.count()
      passed = user.results.count()
      average = user.results.average(:grade).round(2)
      statistic = {user_id:session[:user_id], created:created, passed:passed, average:average}

      response_helper statistic, ["not found!"]
    end

    get '/statistic/:page/:per_page' do
      query = Quiz.joins(:results).where(:results => {:user_id =>session[:user_id]})
      .select("id,title").group('id')
      total_items = query.as_json.count()
      quizzes = query.offset((params['page'].to_i-1)*params['per_page'].to_i).limit(params['per_page'])
      result = Result.get_result(quizzes,total_items)

      response_helper result, ["not found!"]
    end 
    ##User_statistic block's end

    get '/tags/:query' do
      content_type :json
      query = '%'+params['query'][0,20]+'%'
      Tag.select(:tag, :id).where("tag like ?", query).to_json
    end

  ## Assessments block ends here!

  end
end
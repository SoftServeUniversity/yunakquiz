# encoding: UTF-8
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
    Dir.glob('./lib/*.rb').each {|file| require file}    


    get '/' do
        erb :index
    end

    options '/*' do
    end

    get '/categories' do
      content_type :json
      JSON.pretty_generate(Category.catList)
    end  


  ## Assessments block starts here!

    def response_helper data,msg
      if data
        return [200, data.to_json]
      else
        return [400, msg.to_json]
      end
    end 

    ## Assessment resource!!
    get '/assessments/:id' do
      content_type :json
      @quiz = Quiz.get_by_id(params['id'])

      response_helper @quiz, ["Quiz #{params['id']} not found!"]
    end

    post '/assessments' do
      content_type :json
      data = JSON.parse(request.body.read)
      @quiz = Quiz.create_quiz(data)

      response_helper @quiz, "Quiz not created!"
    end


    put '/assessments' do
      content_type :json
      data = JSON.parse(request.body.read)
      @quiz = Quiz.update_quiz(data) unless data['id'].nil?
      
      response_helper @quiz, "Quiz not found!"
    end    

    delete '/assessments/:id' do
      content_type :json
      @quiz = Quiz.delete_quiz(params['id'])
      
      response_helper @quiz, "Quiz not deleted!"
    end
    ## end of Assessment resource.

    get '/breadcrumbs/:cat_id' do
      content_type :json
      @breadcrumbs = Category.get_breadcrumds(params['cat_id'])

      response_helper @breadcrumbs, ["Quiz #{params['id']} not found!"]
    end

    post '/assessments/:status' do
      content_type :json
      data = JSON.parse(request.body.read)
      #check permisions here
      @quizzes = Quiz.quiz_query(params['status'],data['searchData'],data['currentPage'],data['itemsPerPage'])
      
      response_helper @quizzes, "Quiz not deleted!"
    end
    
    ##Assessment comments section
    get '/assessments/:id/comments' do
      content_type :json
      @comment = Comment.get_by_quiz(params['id'])

      response_helper @comment, ["Comments #{params['id']} not found!"]
    end 

    put '/assessments/comments' do
      content_type :json
      data = JSON.parse(request.body.read)
      @comments = Comment.update_comments(data)

      response_helper @comments, ["comments not updated"]
    end 

    delete '/assessments/:id/comments' do
      content_type :json
      @comments = Comment.delete_comments(params['id'])

      response_helper @comments, ["Comments not deleted!"]
    end
    ## end of Assessment comments section

  ## Assessments block ends here!

    get '/about_us' do
      content_type :json
      Staticinfo.select(['id','about_us','updated_at']).to_json
    end  

    get '/categories/parent' do
      Category.getParentCategories()
    end

    get '/categories/subcats' do
      Category.getAllSubCategories()
    end

    get '/categories/all' do
      Category.getAllCategories()
    end

    get '/categories/category/:id' do
      Category.getCategoryById(params['id'])  
    end

    get '/categories/subcat/:id' do
      Category.getSubCatByParCatId(params['id'])
    end
    
    put '/about_us' do
       data = request.body.read
       status = Staticinfo.updateInfo(data)
       if status
        return [200, {'Success' => "operation success"}.to_json]
       else
         return [400, {'error' => "operation failed"}.to_json]
       end    
    end

    get '/admin/assessments/all/:status' do
      content_type :json
      quizzes = Quiz.queryListAll(params['status'])
      if quizzes
        JSON.pretty_generate(quizzes) 
      else
        return [400, "Not found "+params['status']]
      end
    end   
  end
end

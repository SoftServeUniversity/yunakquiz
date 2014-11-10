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
  require 'securerandom'

  class YunakQuiz < Sinatra::Base
    register Sinatra::AssetPipeline
    register Sinatra::ActiveRecordExtension
    register Sinatra::CrossOrigin
    
    use Rack::Session::Cookie, 
      :secret => 'cca369ff55af5ceefc50939498d93f5905272422baf5d86dd0c4271e2e68a9ba'

    Dir.glob('./config/*.rb').each {|file| require file}
    Dir.glob('./models/*.rb').each {|file| require file}
    Dir.glob('./lib/*.rb').each {|file| require file}    
    
    helpers do
      def filtered_user(user)
        filter = %w(id username first_name last_name email birthday plast_level plast_region plast_hovel picture)
        if user.methods.include?(:attributes)
          return user.attributes.delete_if{|key, value| !filter.include? key.to_s} 
        else
          return user.delete_if{|key, value| !filter.include? key.to_s}
        end  
      end
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

    get '/tags/:query' do
      content_type :json
      query = '%'+params['query'][0,20]+'%'
      Tag.select(:tag, :id).where("tag like ?", query).to_json
    end

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

    get '/admin' do
      if session[:user_id]
        user = User.find(session[:user_id])
        role = Role.find(user.role_id)
        base = Permission.where("#{role.name} = #{role.id}").pluck("tabs").to_json
        base = Permission.where("#{role.name} = #{role.id}").pluck("tabs").to_json
        return base
      end
      else
        return [401, "unauthorized"]
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

    get '/contacts' do
      content_type :json
      Contact.select(['id','role','phone','address','mail']).to_json
    end

    put '/admin/category/create' do
      content_type :json
      data = JSON.parse(request.body.read)
      newCat = Category.createCat(data)
      if newCat
        return [200, newCat.to_json]
      else
        return [400, {'error' => "operation failed"}.to_json]
      end    
    end

    put '/admin/category/update' do
      content_type :json
      data = JSON.parse(request.body.read)
      newCat = Category.updateCat(data)
      if newCat
        return [200, newCat.to_json]
      else
        return [400, {'error' => "operation failed"}.to_json]
      end    
    end

    delete '/admin/category/delete/:id' do
      content_type :json
      catToDel = Category.delCat(params['id'])
      if catToDel
        return [200, catToDel.to_json]
      else
        return [400, {'error' => "operation failed"}.to_json]
      end    
    end
    
    get '/faq' do
      content_type :json
      Faq.select(['id', 'faq_question', 'faq_answer']).to_json
    end
    
    get '/access' do
      if session[:user_id]
        user = User.find(session[:user_id])
        return [200, filtered_user(user).to_json]
      end
      return [401, "unauthorized"]
    end 
    
    post '/access' do
      data = JSON.parse request.body.read
      user = User.authenticate(data['username'], data['password'])
      if !user.nil?
        session[:user_id] = user.id
        return [200, filtered_user(user).to_json]
      end
        return [401, "unauthorized"]
    end
    
    delete '/access' do
      session.clear
      return [200, "ok"]
    end
    
    post '/user' do
      data = JSON.parse request.body.read
      user = User.new(data)
      if user.save
        return [200, "ok"]
      else
        return [400, user.errors.messages.to_json]
      end
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
      if !user.nil?
        user.destroy
        return [200, 'ok']
      end
      return [400, 'bad request']
    end
    
    post '/saveQuestion' do
      content_type :json
      save_Question = JSON.parse(request.body.read)

      if(Faq.where('id=?', save_Question['id']).length == 0)
        Faq.create(id:save_Question['id'], faq_question:save_Question['Question'], faq_answer:save_Question['Answer'])
      end
      
      curfaq = Faq.where('id=?', save_Question['id'])
      curfaq[0].faq_answer = save_Question['Answer']
      curfaq[0].faq_question = save_Question['Question']
      curfaq[0].save()
    end

    delete '/deleteQuestion/:id' do
      content_type :json
      # getQuestion = JSON.parse(request.body.read)
      Faq.find(params['id']).delete()
      [200, {'success' => "success"}.to_json]

      Faq.select(['id', 'faq_question', 'faq_answer']).to_json
    end

    # For all categories
    get '/guest-search' do
      content_type :json
      Category.select('id, category_id, title').to_json
    end 

    post '/search' do
      content_type :json
      search_request = JSON.parse(request.body.read) 

      # This function is part of module SerchQuizzes
      # checkout /models/searchQuizzes.rb for details
      SearchQuizzes.withTags(search_request) 

    end

    get '/last_quizzes/:id' do
      Quiz.lastQuizzes(params['id'])
    end

  end
end

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
  require './models/search_quizzes.rb'

  class YunakQuiz < Sinatra::Base
    helpers SearchQuizzes
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
      average = user.results.average(:grade)||0
      statistic = {user_id:session[:user_id], created:created, passed:passed, average:average.round(2)}

      response_helper statistic, ["not found!"]
    end

    get '/statistic/:page/:per_page' do
      query = Quiz.joins(:results).where(:results => {:user_id =>session[:user_id]})
      .select("id,title").group('id')
      total_items = query.as_json.count()
      quizzes = query.offset((params['page'].to_i-1)*params['per_page'].to_i).limit(params['per_page'])
      result = Result.get_result(quizzes,total_items,session[:user_id])

      response_helper result, ["not found!"]
    end 
    ##User_statistic block's end

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

    get '/permission' do
      if logged_user
        role = Role.find(logged_user.role_id)
        base = Permission.where("#{role.name} = ?", true).pluck("tabs").to_json
        return base
      else
        return [401, "unauthorized"]
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
        return [400, {'error' => "категорія вже існує"}.to_json]
      end    
    end

    put '/admin/category/update' do
      content_type :json
      data = JSON.parse(request.body.read)
      newCat = Category.updateCat(data)
      if newCat
        return [200, newCat.to_json]
      else
        return [400, {'error' => " оновлення категорії невдале"}.to_json]
      end    
    end

    delete '/admin/category/delete/:id' do
      content_type :json
      catToDel = Category.delCat(params['id'])
      if catToDel
        return [200, catToDel.to_json]
      else
        return [400, {'error' => " видалення категорії невдале"}.to_json]
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
      if user
         if user.blocked?
            return [403, "User is blocked!"]
         else
            session[:user_id] = user.id
            return [200, filtered_user(user).to_json]
         end
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
      user.role_id = 3  #hardcode of user role
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
      if user
        user.destroy
        return [200, 'ok']
      end
      return [400, 'bad request']
    end
    
    put '/saveQuestion' do
      content_type :json
      save_Question = JSON.parse(request.body.read)

      if(Faq.where('id=?', save_Question['id']).length == 0)
        curFaq = Faq.create(faq_question:save_Question['Question'], faq_answer:save_Question['Answer'])
    
        if curFaq
          return [200, "Creation Success"]
        else
          return [400, "Creation Error"]
        end
      else
        curfaq = Faq.where('id=?', save_Question['id'])
        curfaq[0].faq_answer = save_Question['Answer']
        curfaq[0].faq_question = save_Question['Question']
        curfaq[0].save()
      end

    end

    delete '/deleteQuestion/:id' do
      content_type :json
      
      Faq.find(params['id']).destroy()
      [200, {'success' => "success"}.to_json]
    end

    post '/search' do
      content_type :json
      query = JSON.parse(request.body.read) 
      # This function is part of SerchQuizzes class
      # checkout /models/searchQuizzes.rb for details
      search_and_check(query) 
    end

    get '/last_quizzes/:id' do
      Quiz.lastQuizzes(params['id'])
    end
    
    post '/checkpassword/' do
      # content_type :json
      data = JSON.parse(request.body.read)
      if session[:user_id]
        userToCheck = User.find(session[:user_id])
        user = User.authenticate(userToCheck['username'], data['password'])
      end
      if user
        return [200, 'Password Matched']
      end
      return [400, 'Невірний пароль']
    end

    post '/admin/users' do
      data = JSON.parse(request.body.read)
      @users = User.user_query(data['status'], data['searchData'],data['currentPage'],data['itemsPerPage'], data['roles'])
     response_helper @users, "Users not found!"
    end

    delete '/admin/users/:id' do
      user = User.find(params['id'])
      if user
        quizes = Quiz.where(user_id: params['id'])
        quizes.update_all(user_id: 4)
        user.destroy
        return [200, 'ok']
      end
      return [400, 'User not found']
    end

    put '/admin/users/:id/status' do
      data = JSON.parse(request.body.read)
      user = User.find(params['id'])
      if user
        if data['status'] == "blocked"
          user.blocked!
          user.save
        elsif data['status'] == "enabled"
          user.enabled!
          user.save
        end
        return [200, 'ok']
      end
      return [400, 'user not found']
    end

    put '/admin/users/:id/role' do
      data = JSON.parse(request.body.read)
      user = User.find(params['id'])
      if user
          user.role_id = data['role'].to_i
          user.save
          return [200, 'ok']
      end
      return [400, 'user not found']
    end

  end
end

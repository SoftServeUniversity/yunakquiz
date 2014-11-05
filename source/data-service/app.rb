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
    
    use Rack::Session::Cookie
   
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
    
    get '/session' do
      session.inspect
    end
    
    get '/access' do
      if session[:user_id]
        user = User.find(session[:user_id])
        return [200, filtered_user(user).to_json]
      end
      return [401, "unauthorized"]
    end	

    put '/user' do
      data = JSON.parse request.body.read
      data = filtered_user(data)
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
      FileUtils.copy(tempfile.path, "public/img/#{saved_name}")
      return [200, saved_name]
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

    post '/access' do
      data = JSON.parse request.body.read
      user = User.authenticate(data['username'], data['password'])
      if !user.nil?
        session[:user_id] = user.id
        return [200, filtered_user(user).to_json]
      end
        return [401, "unauthorized"]
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

    delete '/assessments/:id' do
      content_type :json
      {response: "Assesment #{params['id']} has been deleted"}.to_json
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

    delete '/access' do
      session.clear
      return [200, "ok"]
    end  

    delete '/admin/assessments/:id' do
      content_type :json
      Quiz.deleteQ(params['id'])
      {response: "Assessment #{params['id']} has been deleted"}.to_json
    end

    get '/categories/:id' do
      content_type :json
      #if id = 'parcat' then return all par cat ,id ='subcat' then return all subcats,id='all' then return all categories
      PlastApp::GetAllCat.getCategories(params['id'])
    end

    get '/categories/subcat/:id' do
      content_type :json
      Category.where("category_id=?", params['id']).select(['id','category_id','title']).to_json
    end 

    get '/quizzes/:category_id' do
      content_type :json
      # this function is part of module SerchQuizzes ,returns quizzes with passed category_id or if 0 passed returns all quizzes
      PlastApp::SearchQuizzes.withCatId(params['category_id']).to_json 
    end  

    get '/subcat_quiz/:id' do
      content_type :json
      match_quizzes=Quiz.where("category_id=?",params[:id]).order('updated_at').reverse_order.limit(3).select(['id','category_id','title','description','updated_at']).as_json
      match_quizzes.each_with_index do |value, index|
        value['tags'] = Quiz.find(value['id']).tags.select("id, tag").as_json #finding tags of each quiz
      end
        match_quizzes.to_json
    end

    get '/contacts' do
      content_type :json
      Contact.select(['id','role','phone','address','mail']).to_json
    end

    get '/about_us' do
      content_type :json
      Staticinfo.select(['id','about_us','updated_at']).to_json
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

    # For all categories
    get '/guest-search' do
      content_type :json
      Category.select('id, category_id, title').to_json
    end 
     
    post '/search' do
      content_type :json
      search_request = JSON.parse(request.body.read) 
      # This function is part of module SerchQuizzes as parameter 
      # Gets object {category_id: ['1','2',..'n'] , tags:['teg1','teg2',..'n']}
      SearchQuizzes.withTags(search_request) 
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
    
    delete '/user' do
      data = params
      user = User.authenticate(data['username'], data['password'])
      if !user.nil?
        user.destroy
        return [200, 'ok']
      end
      return [400, 'bad request']
      end

  end
end  

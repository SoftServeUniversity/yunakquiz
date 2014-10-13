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

    get '/assessments' do
      content_type :json
      [{id: 1, name: 'assessment 1'}, {id: 2, name: 'assessment 2'}].to_json
    end

    put '/assessments' do
      content_type :json
      {response: 'Added an assessment'}.to_json
    end

    post '/assessments/:id' do
      cross_origin
      content_type :json
      {response: "Updated to #{params['id']} assessment"}.to_json
    end

    delete '/assessments/:id' do
      content_type :json
      {response: "Assessment #{params['id']} has been deleted"}.to_json
    end

    get '/guest-search' do
      content_type :json
      Category.select('id, category_id, title').to_json
    end 
     
    options '/*' do 
      '*'           
    end

    post '/search' do
      cross_origin
      content_type :json

      data = JSON.parse(request.body.read)
      
      #search = [] # init new array for search

      #-------------------checking of input data------------------
      #
      #if data.has_key?('keyWord')
      #  search.push(data['keyWord']) 
      #else
      #  halt 500, "error message" #need to look for right error number http
      #end

      #data['allCats'].each { |x| 
      #  if x.has_key?('search') && x['search'] == true
      #      search.push(x)
      #  end
      #}

      #if search.length <= 1 #check if there were something 
      #  halt 500, "error message" #need to look for right error number http
      #end
      #print ("here comes data:")
      #puts data
      #--------------------search in db part----------------------
      
      def subcat_search (search_request) #function that takes category id and keyword and return the quizze 

        search_result = []

        search_request['tags'].each do |t_key| 
          
          if Tag.where(:tag => t_key).length > 0  # checkout if tag exist in database
            search_request['categories'].each do|c_key| 
              if (test = Quiz.where(:category_id => c_key).includes(:tags).where("tags.tag" => t_key).as_json).length > 0 # if there no corresponding items in database it will return empty object 
                test[1] = t_key #added for future 
                search_result.push(test)
              end

            end

          else 
            #some error or else
          end

        end

          return search_result   
      end

      puts (subcat_search(data))
      {response: "We working on it, good response will be later. ;-)"}.to_json
      
    end

  end

end
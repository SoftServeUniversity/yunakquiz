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

      #-------------------checking of input data------------------
      
      def input_data_check (data) #function that takes object and check if it good for subcat_search function

        search = {} # init new object for search
        
        if data.has_key?('tags') && data.has_key?('categories') && (data['tags'].length > 0) && (data['categories'].length > 0)
          search['tags'] = data['tags'] 
          search['categories'] = data['categories']
        else
          halt 500, "error message" #need to look for right error number http
        end

        puts (search)

        return search
      end 

      #--------------------search in db part----------------------
      
      def subcat_search (search_request) #function that takes object that contain 2 keys: [tags], [categories] and return array 

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
     #-------------------------------------------------------------- 
      #(subcat_search(input_data_check(JSON.parse(request.body.read)))).to_json #return results to site
      

      #test = (Quiz.where({ category_id: [1, 2, 3, 4, \
      #5, 6, 7, 8, 9, 10, 11, 12]}).joins(:tags).where('tags.tag \
      #= "teg1"').where('tags.tag = "teg2"').as_json) # WORKING VERSION

      test = (Quiz.where({ category_id: [1, 2, 3, 4, \
      5, 6, 7, 8, 9, 10, 11, 12]}).joins(:tags).where("tags.tag" => ['teg1','teg2']).as_json) # WORKING VERSION
      
      print ('HERE WE GO MOTHERFUCKER')
      puts (test)
    end

  end

end
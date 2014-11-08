module PlastApp
	class YunakQuiz < Sinatra::Base
 	 set :cross_origin, true
	 set :allow_origin, :any
	 set :allow_methods, [:post, :get, :options,:delete]
	 set :allow_credentials, true
	 set :allow_headers, ["*", "Content-Type", "Accept", "AUTHORIZATION", "Cache-Control"]
	 set :max_age, 1728000
	 set :expose_headers, ['Cache-Control', 'Content-Language', 'Content-Type', 'Expires', 'Last-Modified', 'Pragma']
	end
end

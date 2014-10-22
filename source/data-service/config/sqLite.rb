module PlastApp
	class YunakQuiz < Sinatra::Base
 		configure  do
 			set :database, {adapter: 'sqlite3', database: './db/YunakQuiz.sqlite3'}
		end
	end
end

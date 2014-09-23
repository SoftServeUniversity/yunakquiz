require 'sinatra'

get '/hi' do
  "Hello World!"
end

get '/assessments' do
  "list of assessments"
end

get '/assessments/:id' do |id|
  "assessment.id = #{id}"
end

put '/assessments/:id' do |id|
  "put but not get assessment.id = #{id}"
end

get '/assessments/:id/pass' do
  "assessment passed"
end

put '/assessments/:id/pass' do
  "put but not get assessment passed"
end

get '/auth' do
	"auth get"
end	

post '/auth' do
	"auth post"
end	

get '/auth/login' do
	"login get"
end	

get '/auth/logout' do
	"logout"
end	

get '/auth/signup' do
	"signup"
end	

get '/admin/users' do
	"list of users"
end	

get '/admin/users/:id' do |id|
	"get user.#{id}"
end	

post '/admin/users/:id' do |id|
	"post user.#{id}"
end	

delete '/admin/users/:id' do |id|
	"delete user.#{id}"
end	

get '/admin/blacklist' do
	"blacklist"
end	

get '/admin/assessments' do
	"list of assessments"
end	

get '/admin/assessments/:id' do |id|
	"get assessment.#{id}"
end	

post '/admin/assessments/:id' do |id|
	"post assessment.#{id}"
end	

put '/admin/assessments/:id' do |id|
	"put assessment.#{id}"
end	

delete '/admin/assessments/:id' do |id|
	"delete assessment.#{id}"
end	

get '/admin/categories' do
	"get categories list"
end	

post '/admin/categories' do
	"post categories list"
end	

put '/admin/categories' do
	"put categories list"
end	

delete '/admin/categories' do
	"delete categories list"
end	
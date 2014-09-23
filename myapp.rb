require 'sinatra'

get '/auth' do
  "auth"
end

get '/auth/login' do
  "Login"
end

get '/auth/logout' do
  "Logout"
end

get '/auth/signup' do
  "SignUp"
end

get '/assessments' do
  "assessments list"
end

put '/assessments/:id' do |n|
  "put assessments #{n}"
end

get '/assessments/:id/pass' do
  "assessments pass"
end

get '/admin' do
  "Hello admin"
end

get '/admin/users' do
  "users list"
end

get '/admin/users/:id' do |n|
  "get user #{n}"
end

post '/admin/users/:id' do |n|
  "post user #{n}"
end

delete '/admin/users/:id' do |n|
  "delete user #{n}"
end

get '/admin/users/blacklist' do
  "blacklist"
end

get '/admin/assessmnets/:id' do |n|
   "Assessment #{n}"
end

post '/admin/assessmnets/:id' do |n|
   "post Assessment #{n}"
end

put '/admin/assessmnets/:id' do
    "put Assessment #{n}"
end

delete '/admin/assessmnets/:id' do
     "delete Assessment #{n}"
end

get '/admin/assessmnets/categories' do
  "get categories"
end

post '/admin/assessmnets/categories' do
  "post categories"
end

put '/admin/assessmnets/categories' do
  "put categories"
end

delete '/admin/assessmnets/categories' do
  "delete categories"
end



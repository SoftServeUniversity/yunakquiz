require File.expand_path('../app.rb', __FILE__)
use Rack::ShowExceptions
run PlastApp::YunakQuiz.new
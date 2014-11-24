class User < ActiveRecord::Base
  has_many :quizzes
  has_many :results
  belongs_to :role
  attr_protected :hashed_password, :salt
  attr_accessor :password
   
end

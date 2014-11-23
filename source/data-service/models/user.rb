require 'digest/sha2'
require 'protected_attributes'

class User < ActiveRecord::Base
  has_many :quizzes
  has_many :results
  belongs_to :role
  attr_protected :hashed_password, :salt
  attr_accessor :password
  enum status: [:blocked, :enabled]
  
  USERNAME_REGEX = /\A[A-Z0-9_-]+\z/i
  EMAIL_REGEX = /\A([A-Z0-9\-_]+\.?[A-Z0-9\-_]+)+@([A-Z0-9\-_]+\.?[A-Z0-9\-_]+)+\.[a-z]{2,4}\z/i
  
  validates :username, :length => {:within => 3..25}, :uniqueness => true, :format => {:with => USERNAME_REGEX}
  validates :email, :length => {:within => 6..255}, :uniqueness => true, :format => {:with => EMAIL_REGEX}
  validates_length_of :password, :within => 8..25, :on => :create
  validates_confirmation_of :password, :on => :create
  
  before_save :create_hashed_password
  after_save :clear_password
  
  def self.make_salt(username="")
    Digest::SHA2.hexdigest("Use #{username} with #{Time.now} to make salt")
  end
  
  def self.hash_with_salt(password="", salt="")
    Digest::SHA2.hexdigest("Put #{salt} on the #{password}")
  end
  
  def self.authenticate(username="", password="")
    user = User.find_by_username(username)
    if user && user.does_password_match(password)
      return user
    else
      false
    end
  end
  
  def does_password_match(password="")
    hashed_password == User.hash_with_salt(password, salt)
  end
  
  private
  
  def create_hashed_password
    unless password.blank?
      self.salt = User.make_salt(username) if salt.blank?
      self.hashed_password = User.hash_with_salt(password, salt)
    end
  end
  
  def clear_password
    self.password = nil
  end
  def self.user_query(status='enabled', query = '', page=1, per_page = 10, role)
    page -= 1
    statusCode =  User.statuses[status] 
    query = '%'+query[0,20]+'%'
    if statusCode 
      users = User.select("id, username, first_name, last_name, email, role_id, status").where("status=? AND username like ? AND role_id IN (?)", statusCode, query, role).offset(page*per_page.to_i).limit(per_page)
      users = users.as_json()
      resultData = {:users => users, :totalItems => queryCount(statusCode, query, role)}
    end
  end

  def self.queryCount(statusCode,query, role)
    User.where("status=? AND username like ? AND role_id IN (?)", statusCode, query, role).count()
  end

  def self.block_unblock_user(id)
    user = User.find(id)
    if user.enabled?
      user.blocked!
      user.save
    else 
      user.enabled!
      user.save
    end
  end
end

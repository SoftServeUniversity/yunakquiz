require 'digest/sha2'
require 'protected_attributes'

class User < ActiveRecord::Base
  attr_protected :hashed_password, :salt
  attr_accessor :password
  
  USERNAME_REGEX = /\A[A-Z0-9_-]+\z/i
  EMAIL_REGEX = /\A([A-Z0-9\-_]+\.?[A-Z0-9\-_]+)+@([A-Z0-9\-_]+\.?[A-Z0-9\-_]+)+\.[a-z]{2,4}\z/i
  
  validates :username, :length => {:within => 6..25}, :uniqueness => true, :format => {:with => USERNAME_REGEX}
  validates :email, :length => {:within => 6..255}, :format => {:with => EMAIL_REGEX}
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
  
end
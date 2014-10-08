  class Quiz < ActiveRecord::Base
    has_many :questions
    belongs_to :category
  end
    

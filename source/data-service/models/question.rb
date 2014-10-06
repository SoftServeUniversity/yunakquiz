class Question < ActiveRecord::Base
  belongs_to :assessment
  has_many :answers
end
class Assessment < ActiveRecord::Base
  belongs_to :subcat
  has_many :questions
  has_many :tags
end
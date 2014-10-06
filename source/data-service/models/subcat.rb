class Subcat < ActiveRecord::Base
  belongs_to :parcat
  has_many :assessments
end
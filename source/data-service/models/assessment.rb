  class Measure < ActiveRecord::Base
    has_many :assessments
  end
  
  class Assessment < ActiveRecord::Base
    has_many :questions
    belongs_to :measure
  end

  class Question < ActiveRecord::Base
    belongs_to :assessment
    has_many :answers
  end

  class Answer < ActiveRecord::Base
    belongs_to :question
  end
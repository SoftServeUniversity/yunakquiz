class Quiz < ActiveRecord::Base
  belongs_to :category
  has_many :questions
  has_many :comments
  has_and_belongs_to_many :tags
  enum status: [:draft, :review, :enhance, :published, :deleted]

  def self.updateQ(data)
    if (data['id'] == nil)
      return "Quiz not found" 
    end
    quiz = Quiz.find(data['id'])
    quiz.update(title: data['title'], description: data['description'], category_id: data['category_id'], status: data['status'])
    Question.updateQ(data['questions'], quiz)
    return quiz
  end

  def self.createQ(data)
    category = Category.find(data['category_id'])
    quiz = category.quizzes.create(title: data['title'],description: data['description'], status: data['status'])
    Question.createQ(data['questions'], quiz)

    return quiz 
  end

  def self.queryQ(id)
    quiz = Quiz.find_by(id: id)
    if quiz.nil?
      return {'error' => "Quiz not found"}
    else  
      quiz.to_json(:include => {:questions => {:include => :answers}})
    end
  end

  def self.quizQuery(status='published', query = '', page=0, per_page = 10)
    page = page.to_i - 1
    statusCode =  Quiz.statuses[status] 
    query = '%'+query[0,20]+'%'
    if statusCode 
      quizzes = Quiz.where("status=? AND title like ?", statusCode, query).offset(page*per_page.to_i).limit(per_page)
      quizzes = quizzes.as_json(:include => 
        {:category => {:include=> {:category =>{:only => :title}},
         :only=> :title}}
        )
      resultData = {
        'quizzes' => quizzes,
        'queryData' => {
          'totalItems' => queryCount(status,query)
        }
      }
      resultData
    end
  end

  def self.queryCount(status="published",query)
    statusCode =  Quiz.statuses[status] 
    if statusCode
      return Quiz.where("status=? AND title like ?", statusCode, query).count()
    end
  end

  def self.deleteQ(id)
    Quiz.find_by(id: id).deleted!
  end

end

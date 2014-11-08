class Quiz < ActiveRecord::Base
  belongs_to :category
  belongs_to :user
  has_many :questions, :dependent => :destroy
  has_many :comments, :dependent => :destroy
  has_and_belongs_to_many :tags
  enum status: [:draft, :review, :enhance, :published, :deleted]

  
  def self.get_by_id(id)
    Quiz.find_by(id: id).as_json(:include => {:questions => {:include => :answers}})
  end

  def self.create_quiz(data)
    category = Category.find(data['category_id'])
    quiz = category.quizzes.create(title: data['title'],description: data['description'], status: data['status'])
    Question.createQ(data['questions'], quiz)
    quiz[:id]
  end
  
  def self.update_quiz(data)
    quiz = Quiz.find(data['id'])
    quiz.update(title: data['title'], description: data['description'], category_id: data['category_id'], status: data['status'])
    Question.updateQ(data['questions'], quiz)
    return quiz
  end

  def self.delete_quiz(id)
    quiz = Quiz.find_by(id: id)
    quiz.deleted! if quiz
  end

  def self.quiz_query(status='published', query = '', page=1, per_page = 10)
    page -= 1
    statusCode =  Quiz.statuses[status] 
    query = '%'+query[0,20]+'%'
    if statusCode 
      quizzes = Quiz.where("status=? AND title like ?", statusCode, query).offset(page*per_page.to_i).limit(per_page)
      quizzes = quizzes.as_json(:include =>{:category => {:include=> {:category =>{:only => :title}},:only=> :title}})
      resultData = {:quizzes => quizzes, :totalItems => queryCount(statusCode,query)}
    end
  end

  def self.queryCount(statusCode,query)
    Quiz.where("status=? AND title like ?", statusCode, query).count()
  end

  def self.queryListAll(status="published")
    statusCode =  Quiz.statuses[status] 
    if statusCode
      return Quiz.where(status: statusCode).select('id','category_id').as_json
    end
  end

end

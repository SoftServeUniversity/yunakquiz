class Quiz < ActiveRecord::Base
  belongs_to :category
  belongs_to :user
  has_many :questions, :dependent => :destroy
  has_many :comments, :dependent => :destroy
  has_and_belongs_to_many :tags
  enum status: [:draft, :review, :enhance, :published, :deleted]

  def self.get_by_id(id)
    Quiz.find_by(id: id).as_json(:include => [{:questions => {:include => :answers}},{:tags=> {:only => [:id, :tag]}}])
  end
  
  def self.create_quiz(data)
    category = Category.find(data['category_id'])
    quiz = category.quizzes.create(title: data['title'],description: data['description'], status: data['status'])
    Tag.insert_tags(data['tags'], quiz)
    Question.createQ(data['questions'], quiz)
    quiz[:id]
  end
  
  def self.update_quiz(data)
    quiz = Quiz.find(data['id'])
    quiz.update(title: data['title'], description: data['description'], category_id: data['category_id'], status: data['status'])
    Tag.update_tags(data['tags'], quiz)
    Question.update_questions(data['questions'], quiz)
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
      quizzes = quizzes.as_json(:include =>[
        {:category => {:include=> {:category =>{:only => :title}},:only=> :title}},
        {:user => {:only => :username}}
        ])
      resultData = {:quizzes => quizzes, :totalItems => queryCount(statusCode,query)}
    end
  end

  def self.queryCount(statusCode,query)
    Quiz.where("status=? AND title like ?", statusCode, query).count()
  end

  def self.queryListAll(status="published")
    statusCode =  Quiz.statuses[status] 
    if statusCode
      return Quiz.where(status: statusCode).as_json
    end
  end

  def self.lastQuizzes (id)
    statusCode =  Quiz.statuses['published']
    quizzes = Quiz.where("category_id = ? AND status = ?",id ,statusCode).order('updated_at').reverse_order.limit(3).as_json
    quizzes.each_with_index do |value, index|
      value['allTags'] = Quiz.find(value['id']).tags.select('tag').as_json 
    end
    return quizzes.to_json
  end

end

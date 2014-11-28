class Quiz < ActiveRecord::Base
  belongs_to :category
  belongs_to :user
  has_many :questions, :dependent => :destroy
  has_many :comments, :dependent => :destroy
  has_many :results
  has_and_belongs_to_many :tags
  enum status: [:draft, :review, :enhance, :published, :deleted]

  def add_questions 
    self.as_json(
      :include => [
        { :questions => {:include => :answers}},
        { :tags=> {:only => [:id, :tag]}},
        { :category => {:include => :category}}
      ])
  end

  def self.quizzes_pack quizzes
    quizzes.as_json(:include =>[
        {:category => {:include=> {:category =>{:only => :title}},:only=> :title}},
        {:user => {:only => :username}}
        ])
  end

  def self.get_by_id(id)
    quiz = Quiz.where(id: id).published.first
    quiz.add_questions if quiz
  end

  def self.get_for_edit(id, user)
    if user.role.name === "moder"
      quiz = Quiz.find_by(:id => id) 
    else
      quiz = user.quizzes.find_by(:id => id)
    end  
    quiz = nil if quiz.deleted?
    quiz.add_questions if quiz
  end
  
  def self.quiz_validation(data, min_quest=0, min_answ=1)
    return !data['title'].nil? && data['questions'].length>min_quest && data['questions'][0]['answers'].length>min_answ
  end
    
  def self.create_quiz(data, user)
    return unless quiz_validation(data)
    category = Category.find(data['category_id'])
    quiz = category.quizzes.create(title: data['title'],description: data['description'], status: data['status'])
    quiz.update(user: user)
    Tag.insert_tags(data['tags'], quiz)
    Question.createQ(data['questions'], quiz)
    quiz
  end
  
  def self.update_quiz(data, user)
    quiz = Quiz.find(data['id'])
    return nil if quiz.deleted? || quiz.nil?
    
    if (quiz.user == user) || user.role.name === "moder"
      quiz.update(title: data['title'], description: data['description'], category_id: data['category_id'], status: data['status'])
      Tag.update_tags(data['tags'], quiz)
      Question.update_questions(data['questions'], quiz)
      return quiz
    end
    return nil
  end

  def self.delete_quiz(id, user)
    quiz = Quiz.find_by(id: id)
    if (quiz.user == user) || user.role.name === "moder"
      quiz.deleted! if quiz
    end
  end

  def self.quiz_query(status='published', query='',page=1, per_page = 10, categories=[], user = nil)
    page -= 1
    statusCode =  Quiz.statuses[status] 
    query = '%'+query[0,20]+'%'
    if statusCode 
      quizzes = self.user_list(user, statusCode, query) if user
      quizzes = moder_list(statusCode, query, categories) unless user
      count = quizzes.as_json.count()
      quizzes= quizzes.offset(page*per_page.to_i).limit(per_page)
      quizzes = Quiz.quizzes_pack(quizzes)
      resultData = {:quizzes => quizzes, :totalItems => count}
    end
  end

  def self.moder_list(status, query, categories)
    Quiz.joins(:category)
    .where(:status => status).where("quizzes.title like ?", query)
    .where(:categories => { :id => categories }).group('quizzes.id')
  end

  def self.user_list(user, status, query)
    user.quizzes.where("status=? AND title like ?", status, query)
  end

  def self.queryListAll(status="published")
    statusCode =  Quiz.statuses[status] 
    if statusCode
      return Quiz.where(status: statusCode).as_json
    end
  end

  def self.lastQuizzes (id)
    statusCode =  Quiz.statuses['published']
    requiredAmount = 10
    quizzes = Quiz.find_by_sql(
      "SELECT * FROM quizzes Q LEFT JOIN (\
      SELECT QT.quiz_id, group_concat(T.tag, ' ') AS allTags \
      FROM quizzes_tags QT JOIN tags T ON QT.tag_id = T.id \
      GROUP BY QT.quiz_id) \
      AS J ON J.quiz_id = Q.id \
      WHERE category_id = #{id} AND STATUS = #{statusCode} \
      ORDER BY updated_at DESC LIMIT #{requiredAmount}"
    )
    return quizzes.to_json
  end

end

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
    	quizObject = {
        'id' => id,
        'title' => quiz.title,
        'category_id'=> quiz.category_id,
        'description'=>quiz.description,
        'questions' => quiz.questions.as_json,
      }
      quizObject['questions'].each do |this_question|
        this_question['answers'] = Question.find_by(id: this_question['id']).answers.as_json
      end
      
      qJSON = quiz.to_json(:include => [:questions => {:include => :answers}] )
      cJSON =  quiz.category.to_json(:include => :category)

      # qJSON = quiz.to_json(:include => [:questions, :category ] )
      return qJSON
      # return "["+qJSON+","+cJSON+ "]"
      # return quiz.to_json(:include => {:questions => {:include => :answers}})

      # return quizObject      
    end
  end

  def self.queryList(status="published")
    statusCode =  Quiz.statuses[status] 
    if statusCode
      return Quiz.where(status: statusCode).as_json
    end
  end 

  def self.deleteQ(id)
    Quiz.find_by(id: id).deleted!
  end

end

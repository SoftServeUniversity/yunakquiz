class Quiz < ActiveRecord::Base
  belongs_to :category
  has_many :questions
  has_and_belongs_to_many :tags

  def self.updateQ(data)
  		if (data['id'] == nil)
  			return "Quiz not found"	
  		end
	  	quiz = Quiz.find(data['id'])
  		quiz.update(title: data['title'], description: data['description'], category_id: data['category_id'])

  		Question.updateQ(data['questions'], quiz)

  	return quiz
  end

  def self.createQ(data)
    category = Category.find(data['category_id'])
  	quiz = category.quizzes.create(title: data['title'],description: data['description'])
  	Question.createQ(data['questions'], quiz)

  	return quiz	
  end

  def self.queryQ(id)
  	
	#qq.questions.collect {|q| q.answers.select('id',"title",'correct').to_json}
	quiz = Quiz.find(id)

  	quizObject = {
        'id' => id,
        'title' => quiz.title,
        'category_id'=> quiz.category_id,
        'description'=>quiz.description,
        'questions' => quiz.questions.as_json,
         }

    quizObject['questions'].each do |this_question|
            this_question['answers'] = Question.find(this_question['id']).answers.as_json
          end
    return quizObject      
  end

end

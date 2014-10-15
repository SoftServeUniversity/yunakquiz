class Quiz < ActiveRecord::Base
  belongs_to :category
  has_many :questions
  has_and_belongs_to_many :tags

  def self.update(data="")
  		Quiz.find(data['id'])
  end

  def self.createQ(data=[])
  		quiz = Quiz.create(title: data['title'], category_id: ['categoty_id'])
  		data['questions'].each do |q|
  			question = quiz.questions.create(title: q['title'])
  				q['answers'].each do |a|
  					question.answers.create(title: a['title'])
  				end	
  			end
  		quiz	
  end

end

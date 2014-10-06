class CreateAssessments < ActiveRecord::Migration
  def change
  	
   	  create_table :measures do |table|
      table.column :parent_id,  :integer
      table.column :title, :string
  	  end

      create_table :assessments do |table|
      table.column :measure_id,  :integer
      table.column :title, :string
      table.column :description, :string
      end
       
      create_table :questions do |table|
      table.column :assessment_id,  :integer
      table.column :title, :string
      table.column :description, :string
      end
       
      create_table :answers do |table|
      table.column :question_id,  :integer
      table.column :title, :string
      table.column :correct, :boolean
      end

      Measure.create(title: "Спорт")
      Measure.create(parent_id: 1, title: "Футбол")
      Assessment.create(measure_id: 2,
                        title: "Тест на знання правил футболу",
                        description: "Детальний опис тесту")
      Question.create(assessment_id: 1,
                      title: "Скільки гравців в команді?",
                      description: "")
          Answer.create(question_id: 1, title: "11", correct: true)
          Answer.create(question_id: 1, title: "12", correct: false)
          Answer.create(question_id: 1, title: "5", correct: false)

      Question.create(assessment_id: 1,
                      title: "Скільки триває один тайм?",
                      description: "")
          Answer.create(question_id: 2, title: "20хв", correct: false)
          Answer.create(question_id: 2, title: "45хв", correct: true)
          Answer.create(question_id: 2, title: "до останнього гравця", correct: false)

      Question.create(assessment_id: 1,
                      title: "Що відбудеться, коли гравець торкнеться м’яча рукою?",
                      description: "")
          Answer.create(question_id: 3, title: "Порушенння правил", correct: true)
          Answer.create(question_id: 3, title: "Штрафний удар", correct: true)
          Answer.create(question_id: 3, title: "Дадуть пиріжок", correct: false)
          Answer.create(question_id: 3, title: "Дадуть в голову", correct: false)

          

  end
end

#encoding: utf-8 

Category.create(title: "Спорт" ,category_id: 0)
Category.create(category_id: 1, title: "Футбол")

Quiz.create(category_id: 2, title: "Тест на знання правил футболу", description: "Детальний опис тесту")
Question.create(quiz_id: 1, title: "Скільки гравців в команді?", description: "")
Answer.create(question_id: 1, title: "11", correct: true)
Answer.create(question_id: 1, title: "12", correct: false)
Answer.create(question_id: 1, title: "5", correct: false)
Question.create(quiz_id: 1, title: "Скільки триває один тайм?", description: "")
Answer.create(question_id: 2, title: "20хв", correct: false)
Answer.create(question_id: 2, title: "45хв", correct: true)
Answer.create(question_id: 2, title: "до останнього гравця", correct: false)
Question.create(quiz_id: 1, title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "")

Answer.create(question_id: 3, title: "Порушенння правил", correct: true)
Answer.create(question_id: 3, title: "Штрафний удар", correct: true)
Answer.create(question_id: 3, title: "Дадуть пиріжок", correct: false)
Answer.create(question_id: 3, title: "Дадуть в голову", correct: false)

Comment.create(quiz_id: 1, text: "Гарний тест")
Comment.create(quiz_id: 1, text: "Потрібно додати питання з двома правильними відповідями")


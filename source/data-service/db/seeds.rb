#encoding: utf-8 

Category.create(title: "Спорт" ,category_id: 0)
Category.create(category_id: 1, title: "Футбол")

Category.create(category_id: 1, title: "Хокей")
Category.create(category_id: 0, title: "Історія")
Category.create(category_id: 4, title: "Історія України")
Category.create(category_id: 4, title: "Історія світу")
Quiz.create(category_id: 2, title: "Тест на знання правил футболу", description: "Детальний опис тесту")
Question.create(quiz_id: 1, title: "Скільки гравців в команді?", description: "Згідно правил на полі знаходиться 11 гравців однієї команди")
Answer.create(question_id: 1, title: "11", correct: true)
Answer.create(question_id: 1, title: "12", correct: false)
Answer.create(question_id: 1, title: "5", correct: false)
Question.create(quiz_id: 1, title: "Скільки триває один тайм?", description: "Один тайм матчу триває 45 хв. не враховуючи додаткового часу")
Answer.create(question_id: 2, title: "20хв", correct: false)
Answer.create(question_id: 2, title: "45хв", correct: true)
Answer.create(question_id: 2, title: "до останнього гравця", correct: false)
Question.create(quiz_id: 1, title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "Це є порушенням правил, після того як гравець торкнувся мяча рукою гра зупиняється, та назначається штрафний")

Answer.create(question_id: 3, title: "Порушенння правил", correct: true)
Answer.create(question_id: 3, title: "Штрафний удар", correct: true)
Answer.create(question_id: 3, title: "Дадуть пиріжок", correct: false)
Answer.create(question_id: 3, title: "Дадуть в голову", correct: false)

Comment.create(quiz_id: 1, text: "Гарний тест")
Comment.create(quiz_id: 1, text: "Потрібно додати питання з двома правильними відповідями")


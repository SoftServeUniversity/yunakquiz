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

Role.create(name: 'admin')
Role.create(name: 'moder')
Role.create(name: 'user')
Role.create(name: 'superadmin')

Permission.create(tabs: 'admin1', admin: '1', superadmin: '4')
Permission.create(tabs: 'admin2', admin: '1', superadmin: '4')
Permission.create(tabs: 'admin3', admin: '1', superadmin: '4')

Permission.create(tabs: 'moder1', moder: '2', superadmin: '4')
Permission.create(tabs: 'moder2', moder: '2', superadmin: '4')
Permission.create(tabs: 'moder3', moder: '2', superadmin: '4')

Permission.create(tabs: 'comm1', admin: '1', moder: '2', user: '3', superadmin: '4')
Permission.create(tabs: 'comm2', admin: '1', moder: '2', user: '3', superadmin: '4')
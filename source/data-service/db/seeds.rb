#encoding: utf-8 

cat1 = Category.create(category_id: 0, title: "Спорт")
subcat1 = cat1.categories.create(title: "Футбол")
subcat2 = cat1.categories.create(title: "Хокей")

cat2 = Category.create(category_id: 0, title: "Історія")
subcat3 = cat2.categories.create(title: "Історія України")
subcat4 = cat2.categories.create(title: "Історія світу")

cat3 = Category.create(category_id: 0, title: "Програмування")
subcat5 = cat3.categories.create(title: "Основи ООП")
subcat6 = cat3.categories.create(title: "Основи Java")

adminRole = Role.create(name: 'admin')
userRole =  Role.create(name: 'user')
moderRole = Role.create(name: 'moder')
superadminRole = Role.create(name: 'superadmin')

user = User.create({username: "user123", password: "12345678", password_confirmation: "12345678", email: "user@mail.com", birthday: "2000-12-31T22:00:00.000Z"})
admin = User.create({username: "admin123", password: "12345678", password_confirmation: "12345678", email: "admin@mail.com", birthday: "2000-12-31T22:00:00.000Z"})
moder = User.create({username: "moder123", password: "12345678", password_confirmation: "12345678", email: "moder@mail.com", birthday: "2000-12-31T22:00:00.000Z"})
superadmin = User.create({username: "super123", password: "12345678", password_confirmation: "12345678", email: "super@mail.com", birthday: "2000-12-31T22:00:00.000Z"})

Permission.create(tabs: 'admin1', admin: '1', superadmin: '4')
Permission.create(tabs: 'admin2', admin: '1', superadmin: '4')
Permission.create(tabs: 'admin3', admin: '1', superadmin: '4')

Permission.create(tabs: 'moder1', moder: '2', superadmin: '4')
Permission.create(tabs: 'moder2', moder: '2', superadmin: '4')
Permission.create(tabs: 'moder3', moder: '2', superadmin: '4')

Permission.create(tabs: 'comm1', admin: '1', moder: '2', user: '3', superadmin: '4')
Permission.create(tabs: 'comm2', admin: '1', moder: '2', user: '3', superadmin: '4')



quiz1 = subcat1.quizzes.create(status:"published", title: "Тест на знання правил футболу", description: "Детальний опис тесту")
question1_1 = quiz1.questions.create(title: "Скільки гравців в команді?", description: "Згідно правил на полі знаходиться 11 гравців однієї команди")
question1_1.answers.create(title: "11", correct: true)
question1_1.answers.create( title: "12", correct: false)
question1_1.answers.create( title: "5", correct: false)
question1_2 = quiz1.questions.create(title: "Скільки триває один тайм?", description: "Один тайм матчу триває 45 хв. не враховуючи додаткового часу")
question1_2.answers.create( title: "20хв", correct: false)
question1_2.answers.create( title: "45хв", correct: true)
question1_2.answers.create( title: "до останнього гравця", correct: false)
question1_3 = quiz1.questions.create(title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "Це є порушенням правил, після того як гравець торкнувся мяча рукою гра зупиняється, та назначається штрафний")
question1_3.answers.create( title: "Порушенння правил", correct: true)
question1_3.answers.create( title: "Штрафний удар", correct: true)
question1_3.answers.create( title: "Дадуть пиріжок", correct: false)
question1_3.answers.create(title: "Дадуть в голову", correct: false)
quiz1.comments.create(text: "Дуже гарний тест")
quiz1.comments.create(text: "Потрібно додати питання із декількома правильними відповідями")

quiz2 = subcat1.quizzes.create(status:"published", title: "Тест на знання історії України", description: "Детальний опис тесту")
question2_1 = quiz2.questions.create(title: "У 1223 р. на Київську Русь напали орди", description: "")
question2_1.answers.create(title: "печенігів", correct: false)
question2_1.answers.create( title: "половців", correct: false)
question2_1.answers.create( title: "монголо-татар", correct: true)
question2_2 = quiz2.questions.create(title: " Визвольна війна, очолювана Богданом Хмельницьким тривала", description: "")
question2_2.answers.create( title: "1648 – 1652 рр.", correct: false)
question2_2.answers.create( title: "1652 – 1662 рр.", correct: true)
question2_2.answers.create( title: "1698 – 1700 рр.", correct: false)
question2_3 = quiz2.questions.create(title: "Перший Президент України", description: "")
question2_3.answers.create( title: "Л.Кравчук", correct: false)
question2_3.answers.create( title: "Л.Кучма", correct: false)
question2_3.answers.create( title: "М.Грушевський", correct: true)
question2_3.answers.create(title: "Ленін", correct: false)
quiz2.comments.create(text: "Потрібно додати більше питань")

tag1 = Tag.create(tag: "футбол")
tag2 = Tag.create(tag: "спорт")
tag3 = Tag.create(tag: "м'яч")
tag4 = Tag.create(tag: "україна")
tag5 = Tag.create(tag: "історія")

quiz1.tags << tag1
quiz1.tags << tag2
quiz1.tags << tag3
quiz2.tags << tag4
quiz2.tags << tag5


quiz3 = subcat4.quizzes.create(category_id: 6,status: "published", title: "Тест на знання історії світу", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
quiz3.tags << tag6 = Tag.create(tag: "світ")
quiz3.tags << tag5
quiz3.tags << tag7 = Tag.create(tag: "всьо")

quiz4 = subcat4.quizzes.create(category_id: 6,status:"published", title: "Тест на знання другої світової війни", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
quiz4.tags << tag8 = Tag.create(tag: "гітлер")
quiz4.tags << tag9 = Tag.create(tag: "сталін")
quiz4.tags << tag10 = Tag.create(tag: "голодомор")
quiz4.tags << tag11 = Tag.create(tag: "друга_світова")

quiz5 = subcat4.quizzes.create(category_id: 6,status:"published", title: "Тест на знання першої світової війни", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
quiz5.tags << tag12 = Tag.create(tag: "перша_світова")
quiz5.tags << tag13 = Tag.create(tag: "війна")
quiz5.tags << tag14 = Tag.create(tag: "німеччина")

quiz6 = subcat2.quizzes.create(category_id: 3,status:"published", title: "Тест на знання правил хокею", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
quiz6.tags << tag15 = Tag.create(tag: "хокей")
quiz6.tags << tag16 = Tag.create(tag: "лід")
quiz6.tags << tag17 = Tag.create(tag: "клюшка")

quiz7 = subcat1.quizzes.create(category_id: 2,status:"published", title: "Тест на знання видатних футболістів", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
quiz7.tags << tag18 = Tag.create(tag: "рональдо")
quiz7.tags << tag19 = Tag.create(tag: "блохін")
quiz7.tags << tag20 = Tag.create(tag: "шевченко")

quiz8 = subcat4.quizzes.create(category_id: 6,status:"published", title: "Тест на знання війни в Вєтнамі", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
quiz8.tags << tag21 = Tag.create(tag: "вєтнам")
quiz8.tags << tag22 = Tag.create(tag: "гвинтокрил")
quiz8.tags << tag23 = Tag.create(tag: "напалм")

quiz9 = subcat3.quizzes.create(category_id: 5,status:"published", title: "Тест на знання революції гідності 2014 року", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
quiz9.tags << tag24 = Tag.create(tag: "революція")
quiz9.tags << tag4
quiz9.tags << tag25 = Tag.create(tag: "яник")

quiz10 = subcat3.quizzes.create(category_id: 5,status:"published", title: "Тест на знання Украйни в часи незалежності", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
quiz10.tags << tag26 = Tag.create(tag: "1991")
quiz10.tags << tag4
quiz10.tags << tag27 = Tag.create(tag: "незалежність")
quiz10.tags << tag28 = Tag.create(tag: "батьківщина")

quiz11 = subcat5.quizzes.create(category_id: 5,status:"published", title: "Тест на знання Поліморфізму", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
quiz11.tags << tag29 = Tag.create(tag: "ооп")
quiz11.tags << tag30 = Tag.create(tag: "поліморфізм")
quiz11.tags << tag31 = Tag.create(tag: "програмування")

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
moderRole = Role.create(name: 'moder')
userRole =  Role.create(name: 'user')
superadminRole = Role.create(name: 'superadmin')

user1 = userRole.users.create(username: "user123", password: "12345678", password_confirmation: "12345678", email: "user@mail.com", birthday: "2000-12-31T22:00:00.000Z")
admin1 = adminRole.users.create(username: "admin123", password: "12345678", password_confirmation: "12345678", email: "admin@mail.com", birthday: "2000-12-31T22:00:00.000Z")
moder1 = moderRole.users.create(username: "moder123", password: "12345678", password_confirmation: "12345678", email: "moder@mail.com", birthday: "2000-12-31T22:00:00.000Z")
superadmin1 = superadminRole.users.create(username: "super123", password: "12345678", password_confirmation: "12345678", email: "super@mail.com", birthday: "2000-12-31T22:00:00.000Z")

valera = userRole.users.create(username: "Valera", password: "12345678", password_confirmation: "12345678", email: "valera@mail.com", birthday: "2000-12-31T22:00:00.000Z")
ivan = userRole.users.create(username: "Ivan", password: "12345678", password_confirmation: "12345678", email: "ivan@mail.com", birthday: "2000-12-31T22:00:00.000Z")
vasyl = userRole.users.create(username: "Vasyl", password: "12345678", password_confirmation: "12345678", email: "vasyl@mail.com", birthday: "2000-12-31T22:00:00.000Z")

Permission.create(tabs: 'admin1', admin: '1', superadmin: '4')
Permission.create(tabs: 'admin2', admin: '1', superadmin: '4')
Permission.create(tabs: 'admin3', admin: '1', superadmin: '4')

Permission.create(tabs: 'moder1', moder: '2', superadmin: '4')
Permission.create(tabs: 'moder2', moder: '2', superadmin: '4')
Permission.create(tabs: 'moder3', moder: '2', superadmin: '4')

Permission.create(tabs: 'comm1', admin: '1', moder: '2', user: '3', superadmin: '4')
Permission.create(tabs: 'comm2', admin: '1', moder: '2', user: '3', superadmin: '4')

tag1 = Tag.create(tag: "футбол")
tag2 = Tag.create(tag: "спорт")
tag3 = Tag.create(tag: "м'яч")
tag4 = Tag.create(tag: "україна")
tag5 = Tag.create(tag: "історія")
tag6 = Tag.create(tag: "світ")
tag7 = Tag.create(tag: "програмування")
tag8 = Tag.create(tag: "java")
tag9 = Tag.create(tag: "масиви")
tag10 = Tag.create(tag: "всьо")
tag11 = Tag.create(tag: "гітлер")
tag12 = Tag.create(tag: "сталін")
tag13 = Tag.create(tag: "голодомор")
tag14 = Tag.create(tag: "друга_світова")
tag15 = Tag.create(tag: "перша_світова")
tag16 = Tag.create(tag: "війна")
tag17 = Tag.create(tag: "німеччина")
tag18 = Tag.create(tag: "хокей")
tag19 = Tag.create(tag: "лід")
tag20 = Tag.create(tag: "клюшка")
tag21 = Tag.create(tag: "рональдо")
tag22 = Tag.create(tag: "блохін")
tag23 = Tag.create(tag: "шевченко")
tag24 = Tag.create(tag: "вєтнам")
tag25 = Tag.create(tag: "гвинтокрил")
tag26 = Tag.create(tag: "напалм")
tag27 = Tag.create(tag: "революція")
tag28 = Tag.create(tag: "яник")
tag29 = Tag.create(tag: "1991")
tag30 = Tag.create(tag: "незалежність")
tag31 = Tag.create(tag: "батьківщина")
tag32 = Tag.create(tag: "ооп")
tag33 = Tag.create(tag: "поліморфізм")

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
quiz1.tags << tag1
quiz1.tags << tag2
quiz1.tags << tag3
quiz1.update(user: valera)

quiz2 = subcat3.quizzes.create(status:"enhance", title: "Тест на знання історії України", description: "Детальний опис тесту монголо-татар")
question2_1 = quiz2.questions.create(title: "У 1223 р. на Київську Русь напали орди", description: "У 1223 р. на Київську Русь напали орди")
question2_1.answers.create(title: "печенігів", correct: false)
question2_1.answers.create( title: "половців", correct: false)
question2_1.answers.create( title: "монголо-татар", correct: true)
question2_2 = quiz2.questions.create(title: "Визвольна війна, очолювана Богданом Хмельницьким тривала", description: "Визвольна війна, очолювана Богданом Хмельницьким тривала в період 1652 – 1662 рр.")
question2_2.answers.create( title: "1648 – 1652 рр.", correct: false)
question2_2.answers.create( title: "1652 – 1662 рр.", correct: true)
question2_2.answers.create( title: "1698 – 1700 рр.", correct: false)
question2_3 = quiz2.questions.create(title: "Перший Президент України", description: "Першим президентом вважається М.Грушевський")
question2_3.answers.create( title: "Л.Кравчук", correct: false)
question2_3.answers.create( title: "Л.Кучма", correct: false)
question2_3.answers.create( title: "М.Грушевський", correct: true)
question2_3.answers.create(title: "Ленін", correct: false)
quiz2.comments.create(text: "Потрібно додати більше питань")
quiz2.tags << tag4
quiz2.tags << tag5
quiz2.update(user: valera)

quiz3 = subcat4.quizzes.create(status:"published", title: "Друга світова війна", description: "Детальний опис тесту")
question3_1 = quiz3.questions.create(title: "У якому році почалась Друга Світова Війна?", description: "Друга світова війна почалась з нападу Третього Рейху на Польщу 9-го вересня 1939р року")
question3_1.answers.create(title: "1941р.", correct: false)
question3_1.answers.create( title: "1939р.", correct: true)
question3_1.answers.create( title: "1911р.", correct: false)
question3_1.answers.create( title: "ШТО?", correct: false)
question3_2 = quiz3.questions.create(title: "Як називався план нападу Третього Рейху на СРСР?", description: "План Барбаросса передбачував військовий напад на СРСР з повним розгромом Радянської армії")
question3_2.answers.create( title: "Вайс", correct: false)
question3_2.answers.create( title: "Рот", correct: false)
question3_2.answers.create( title: "Барбаросса", correct: true)
question3_3 = quiz3.questions.create(title: "У якому році завершилась Друга Світова Війна?", description: "Друга Світова Війна завершилась у 1945р.")
question3_3.answers.create( title: "1950р.", correct: false)
question3_3.answers.create( title: "1981р.", correct: false)
question3_3.answers.create( title: "1945р.", correct: true)
question3_3.answers.create(title: "1944р.", correct: false)
quiz3.tags << tag5
quiz3.tags << tag6
quiz3.update(user: ivan)

quiz4 = subcat6.quizzes.create(status:"review", title: "Історія Java", description: "Детальний опис тесту")
question4_1 = quiz4.questions.create(title: "Якою компанією випущена мова Java?", description: "Java випущена компанією Sun Microsystems у 1995 році як основний компонент платформи Java.")
question4_1.answers.create(title: "Sun Microsystems", correct: true)
question4_1.answers.create( title: "Motorolla", correct: false)
question4_1.answers.create( title: "Google", correct: false)
question4_2 = quiz4.questions.create(title: "Звідки мова Java отримала свою назву?", description: "Названа на честь марки кави Java, яка, в свою чергу, отримала найменування однойменного острова")
question4_2.answers.create( title: "Назва була вигадана першим розробником", correct: false)
question4_2.answers.create( title: "Запозичення з іншої мови", correct: false)
question4_2.answers.create( title: "Марка кави", correct: true)
question4_3 = quiz4.questions.create(title: "Хто започаткував розробку мови Java?", description: "Розробку проекту започаткував Джеймс Ґослінґ, сам проект мав назву «Green»(Зелений)")
question4_3.answers.create( title: "Фред Лонг", correct: false)
question4_3.answers.create( title: "Джеймс Ґослінґ", correct: true)
question4_3.answers.create( title: "Кей Хорстманн", correct: false)
quiz4.comments.create(text: "Дуже гарний тест")
quiz4.comments.create(text: "Потрібно додати питання із декількома правильними відповідями")
quiz4.tags << tag5
quiz4.tags << tag7
quiz4.tags << tag8
quiz4.update(user: vasyl)

quiz5 = subcat6.quizzes.create(status:"draft", title: "Базові знання Java", description: "Детальний опис тесту")
question5_1 = quiz5.questions.create(title: "Який з вказаних типів не є простим?", description: "Простими типами в Java є : boolean, byte, char, short, int, long, float, double.")
question5_1.answers.create(title: "int", correct: false)
question5_1.answers.create( title: "double", correct: false)
question5_1.answers.create( title: "word", correct: true)
question5_1.answers.create( title: "boolean", correct: false)
question5_1.answers.create( title: "char", correct: false)
question5_2 = quiz5.questions.create(title: "Який оператор відповідає за імпортування зовнішніх пакетів в Java?", description: "За імпортування зовнішніх пакетів в Java відповідає оператор import")
question5_2.answers.create( title: "include", correct: false)
question5_2.answers.create( title: "import", correct: true)
question5_2.answers.create( title: "require", correct: false)
question5_3 = quiz5.questions.create(title: "Як оголосити масив типу int в Java?", description: "int my_array[] або int[] my_array")
question5_3.answers.create( title: "int my_array[]", correct: true)
question5_3.answers.create( title: "int[] my_array", correct: true)
question5_3.answers.create( title: "var array = new Array", correct: false)
quiz5.comments.create(text: "Потрібно детальніше описати правильну відповідь у питанні про масиви")
quiz5.tags << tag7
quiz5.tags << tag8
quiz5.tags << tag9
quiz5.update(user: vasyl)



quiz6 = subcat4.quizzes.create(category_id: 6,status: "published", title: "Тест на знання історії світу", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
question6_1 = quiz6.questions.create(title: "У 1223 р. на Київську Русь напали орди", description: "У 1223 р. на Київську Русь напали орди")
question6_1.answers.create(title: "печенігів", correct: false)
question6_1.answers.create( title: "половців", correct: false)
question6_1.answers.create( title: "монголо-татар", correct: true)
question6_2 = quiz6.questions.create(title: "Визвольна війна, очолювана Богданом Хмельницьким тривала", description: "Визвольна війна, очолювана Богданом Хмельницьким тривала в період 1652 – 1662 рр.")
question6_2.answers.create( title: "1648 – 1652 рр.", correct: false)
question6_2.answers.create( title: "1652 – 1662 рр.", correct: true)
question6_2.answers.create( title: "1698 – 1700 рр.", correct: false)
question6_3 = quiz6.questions.create(title: "Перший Президент України", description: "Першим президентом вважається М.Грушевський")
question6_3.answers.create( title: "Л.Кравчук", correct: false)
question6_3.answers.create( title: "Л.Кучма", correct: false)
question6_3.answers.create( title: "М.Грушевський", correct: true)
question6_3.answers.create(title: "Ленін", correct: false)
quiz6.comments.create(text: "Потрібно додати більше питань")
quiz6.tags << tag6
quiz6.tags << tag5
quiz6.tags << tag10
quiz6.update(user: valera)

quiz7 = subcat4.quizzes.create(category_id: 6,status:"published", title: "Тест на знання другої світової війни", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
question7_1 = quiz7.questions.create(title: "У якому році почалась Друга Світова Війна?", description: "Друга світова війна почалась з нападу Третього Рейху на Польщу 9-го вересня 1939р року")
question7_1.answers.create(title: "1941р.", correct: false)
question7_1.answers.create( title: "1939р.", correct: true)
question7_1.answers.create( title: "1911р.", correct: false)
question7_1.answers.create( title: "ШТО?", correct: false)
question7_2 = quiz7.questions.create(title: "Як називався план нападу Третього Рейху на СРСР?", description: "План Барбаросса передбачував військовий напад на СРСР з повним розгромом Радянської армії")
question7_2.answers.create( title: "Вайс", correct: false)
question7_2.answers.create( title: "Рот", correct: false)
question7_2.answers.create( title: "Барбаросса", correct: true)
question7_3 = quiz7.questions.create(title: "У якому році завершилась Друга Світова Війна?", description: "Друга Світова Війна завершилась у 1945р.")
question7_3.answers.create( title: "1950р.", correct: false)
question7_3.answers.create( title: "1981р.", correct: false)
question7_3.answers.create( title: "1945р.", correct: true)
question7_3.answers.create(title: "1944р.", correct: false)
quiz7.tags << tag11
quiz7.tags << tag12
quiz7.tags << tag13
quiz7.tags << tag14
quiz7.update(user: valera)

quiz8 = subcat4.quizzes.create(category_id: 6,status:"published", title: "Тест на знання першої світової війни", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
question8_1 = quiz8.questions.create(title: "У якому році почалась Друга Світова Війна?", description: "Друга світова війна почалась з нападу Третього Рейху на Польщу 9-го вересня 1939р року")
question8_1.answers.create(title: "1941р.", correct: false)
question8_1.answers.create( title: "1939р.", correct: true)
question8_1.answers.create( title: "1911р.", correct: false)
question8_1.answers.create( title: "ШТО?", correct: false)
question8_2 = quiz8.questions.create(title: "Як називався план нападу Третього Рейху на СРСР?", description: "План Барбаросса передбачував військовий напад на СРСР з повним розгромом Радянської армії")
question8_2.answers.create( title: "Вайс", correct: false)
question8_2.answers.create( title: "Рот", correct: false)
question8_2.answers.create( title: "Барбаросса", correct: true)
question8_3 = quiz8.questions.create(title: "У якому році завершилась Друга Світова Війна?", description: "Друга Світова Війна завершилась у 1945р.")
question8_3.answers.create( title: "1950р.", correct: false)
question8_3.answers.create( title: "1981р.", correct: false)
question8_3.answers.create( title: "1945р.", correct: true)
question8_3.answers.create(title: "1944р.", correct: false)
quiz8.tags << tag15
quiz8.tags << tag16
quiz8.tags << tag17
quiz8.update(user: valera)

quiz9 = subcat2.quizzes.create(category_id: 3,status:"published", title: "Тест на знання правил хокею", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
question9_1 = quiz9.questions.create(title: "Скільки гравців в команді?", description: "Згідно правил на полі знаходиться 11 гравців однієї команди")
question9_1.answers.create(title: "11", correct: true)
question9_1.answers.create( title: "12", correct: false)
question9_1.answers.create( title: "5", correct: false)
question9_2 = quiz9.questions.create(title: "Скільки триває один тайм?", description: "Один тайм матчу триває 45 хв. не враховуючи додаткового часу")
question9_2.answers.create( title: "20хв", correct: false)
question9_2.answers.create( title: "45хв", correct: true)
question9_2.answers.create( title: "до останнього гравця", correct: false)
question9_3 = quiz9.questions.create(title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "Це є порушенням правил, після того як гравець торкнувся мяча рукою гра зупиняється, та назначається штрафний")
question9_3.answers.create( title: "Порушенння правил", correct: true)
question9_3.answers.create( title: "Штрафний удар", correct: true)
question9_3.answers.create( title: "Дадуть пиріжок", correct: false)
question9_3.answers.create(title: "Дадуть в голову", correct: false)
quiz9.tags << tag18
quiz9.tags << tag19
quiz9.tags << tag20
quiz9.update(user: valera)

quiz10 = subcat1.quizzes.create(category_id: 2,status:"published", title: "Тест на знання видатних футболістів", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
question10_1 = quiz10.questions.create(title: "Скільки гравців в команді?", description: "Згідно правил на полі знаходиться 11 гравців однієї команди")
question10_1.answers.create(title: "11", correct: true)
question10_1.answers.create( title: "12", correct: false)
question10_1.answers.create( title: "5", correct: false)
question10_2 = quiz10.questions.create(title: "Скільки триває один тайм?", description: "Один тайм матчу триває 45 хв. не враховуючи додаткового часу")
question10_2.answers.create( title: "20хв", correct: false)
question10_2.answers.create( title: "45хв", correct: true)
question10_2.answers.create( title: "до останнього гравця", correct: false)
question10_3 = quiz10.questions.create(title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "Це є порушенням правил, після того як гравець торкнувся мяча рукою гра зупиняється, та назначається штрафний")
question10_3.answers.create( title: "Порушенння правил", correct: true)
question10_3.answers.create( title: "Штрафний удар", correct: true)
question10_3.answers.create( title: "Дадуть пиріжок", correct: false)
question10_3.answers.create(title: "Дадуть в голову", correct: false)
quiz10.tags << tag21
quiz10.tags << tag22
quiz10.tags << tag23
quiz10.update(user: valera)

quiz11 = subcat4.quizzes.create(category_id: 6,status:"published", title: "Тест на знання війни в Вєтнамі", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
question11_1 = quiz11.questions.create(title: "Скільки гравців в команді?", description: "Згідно правил на полі знаходиться 11 гравців однієї команди")
question11_1.answers.create(title: "11", correct: true)
question11_1.answers.create( title: "12", correct: false)
question11_1.answers.create( title: "5", correct: false)
question11_2 = quiz11.questions.create(title: "Скільки триває один тайм?", description: "Один тайм матчу триває 45 хв. не враховуючи додаткового часу")
question11_2.answers.create( title: "20хв", correct: false)
question11_2.answers.create( title: "45хв", correct: true)
question11_2.answers.create( title: "до останнього гравця", correct: false)
question11_3 = quiz11.questions.create(title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "Це є порушенням правил, після того як гравець торкнувся мяча рукою гра зупиняється, та назначається штрафний")
question11_3.answers.create( title: "Порушенння правил", correct: true)
question11_3.answers.create( title: "Штрафний удар", correct: true)
question11_3.answers.create( title: "Дадуть пиріжок", correct: false)
question11_3.answers.create(title: "Дадуть в голову", correct: false)
quiz11.tags << tag24
quiz11.tags << tag25
quiz11.tags << tag26
quiz11.update(user: valera)

quiz12 = subcat3.quizzes.create(category_id: 5,status:"published", title: "Тест на знання революції гідності 2014 року", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
question12_1 = quiz12.questions.create(title: "Скільки гравців в команді?", description: "Згідно правил на полі знаходиться 11 гравців однієї команди")
question12_1.answers.create(title: "11", correct: true)
question12_1.answers.create( title: "12", correct: false)
question12_1.answers.create( title: "5", correct: false)
question12_2 = quiz12.questions.create(title: "Скільки триває один тайм?", description: "Один тайм матчу триває 45 хв. не враховуючи додаткового часу")
question12_2.answers.create( title: "20хв", correct: false)
question12_2.answers.create( title: "45хв", correct: true)
question12_2.answers.create( title: "до останнього гравця", correct: false)
question12_3 = quiz12.questions.create(title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "Це є порушенням правил, після того як гравець торкнувся мяча рукою гра зупиняється, та назначається штрафний")
question12_3.answers.create( title: "Порушенння правил", correct: true)
question12_3.answers.create( title: "Штрафний удар", correct: true)
question12_3.answers.create( title: "Дадуть пиріжок", correct: false)
question12_3.answers.create(title: "Дадуть в голову", correct: false)
quiz12.tags << tag27
quiz12.tags << tag4
quiz12.tags << tag28
quiz12.update(user: valera)

quiz13 = subcat3.quizzes.create(category_id: 5,status:"published", title: "Тест на знання Украйни в часи незалежності", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
question13_1 = quiz13.questions.create(title: "Скільки гравців в команді?", description: "Згідно правил на полі знаходиться 11 гравців однієї команди")
question13_1.answers.create(title: "11", correct: true)
question13_1.answers.create( title: "12", correct: false)
question13_1.answers.create( title: "5", correct: false)
question13_2 = quiz13.questions.create(title: "Скільки триває один тайм?", description: "Один тайм матчу триває 45 хв. не враховуючи додаткового часу")
question13_2.answers.create( title: "20хв", correct: false)
question13_2.answers.create( title: "45хв", correct: true)
question13_2.answers.create( title: "до останнього гравця", correct: false)
question13_3 = quiz13.questions.create(title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "Це є порушенням правил, після того як гравець торкнувся мяча рукою гра зупиняється, та назначається штрафний")
question13_3.answers.create( title: "Порушенння правил", correct: true)
question13_3.answers.create( title: "Штрафний удар", correct: true)
question13_3.answers.create( title: "Дадуть пиріжок", correct: false)
question13_3.answers.create(title: "Дадуть в голову", correct: false)
quiz13.tags << tag29
quiz13.tags << tag4
quiz13.tags << tag30
quiz13.tags << tag31
quiz13.update(user: valera)

quiz14 = subcat5.quizzes.create(category_id: 5,status:"published", title: "Тест на знання Поліморфізму", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
question14_1 = quiz14.questions.create(title: "Скільки гравців в команді?", description: "Згідно правил на полі знаходиться 11 гравців однієї команди")
question14_1.answers.create(title: "11", correct: true)
question14_1.answers.create( title: "12", correct: false)
question14_1.answers.create( title: "5", correct: false)
question14_2 = quiz14.questions.create(title: "Скільки триває один тайм?", description: "Один тайм матчу триває 45 хв. не враховуючи додаткового часу")
question14_2.answers.create( title: "20хв", correct: false)
question14_2.answers.create( title: "45хв", correct: true)
question14_2.answers.create( title: "до останнього гравця", correct: false)
question14_3 = quiz14.questions.create(title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "Це є порушенням правил, після того як гравець торкнувся мяча рукою гра зупиняється, та назначається штрафний")
question14_3.answers.create( title: "Порушенння правил", correct: true)
question14_3.answers.create( title: "Штрафний удар", correct: true)
question14_3.answers.create( title: "Дадуть пиріжок", correct: false)
question14_3.answers.create(title: "Дадуть в голову", correct: false)
quiz14.tags << tag32
quiz14.tags << tag33
quiz14.tags << tag7
quiz14.update(user: valera)

Faq.create(faq_question: "Як створити свій тест?", faq_answer: "Для цього потрібно зареєструватись")
Faq.create(faq_question: "Де можна знайти інформацію про сайт?", faq_answer: "В нижньому меню, яке називається Про Нас")
Faq.create(faq_question: "За якою шкалою оцінюється пройдений тест?", faq_answer: "100% - всі відповіді вірні, 67% - 2 відповіді з 3 правильні, 33% - 1 лише відповідь првильна, 0% - всі відповіді не правильні")
Faq.create(faq_question: "Де можна знайти тест на знання правил хокею?", faq_answer: "В підкатегорії Хокей, яка знаходиться в категорії Спорт")
Faq.create(faq_question: "Чи можна для пошук вибрати якусь конкретну підкатегорію?", faq_answer: "Так, звичайно.")

Contact.create(id: 1, role: "Адміністратор", phone: "+38 032 244-44-44", mail: "someone@somemail.com", address:"79000, Fedkovycha Str. 60A, building 1")
Contact.create(id: 2, role: "Модератор", phone: "+38 032 244-44-44", mail: "someone@somemail.com", address:"79000, Fedkovycha Str. 60A, building 1")
Contact.create(id: 3, role: "Ще хтось", phone: "+38 032 244-44-44", mail: "someone@somemail.com", address:"79000, Fedkovycha Str. 60A, building 1")
about ='<p>&#10;Пласт – українська скаутська організація. <a href="http://www.plast.org.ua/about/goal/">Метою Пласту</a> є сприяти всебічному, патріотичному вихованню та самовихованню української молоді на засадах християнської моралі. Будучи неполітичною і позаконфесійною організацією, Пласт виховує молодь на свідомих, відповідальних і повновартісних громадян місцевої, національної та світової спільноти, провідників суспільства.&#10;</p><p>&#10;Пласт <a href="http://www.plast.org.ua/history/">був створений</a> у 1911 році, невдовзі після заснування скаутського руху Робертом Бейден-Пауелом в 1907 р., а вже 12 квітня 1912 року у Львові пластуни склали першу Пластову присягу. Серед засновників організації були д-р. Олександр Тисовський, Петро Франко (син Івана Франка) та Іван Чмола. В основі назви &#34;Пласт&#34; лежить відповідник англійського Scout (розвідник), взятий за прикладом пластунів - козаків-розвідників.&#10;</p><div style="float: right;">&#10;<img alt="Герб Пласту - тризуб, переплетений із трилистою лілеєю" src="http://www.plast.org.ua/images/site/lelia.gif" height="180" vspace="5" width="142"/><br/>&#10;<div style="text-align: center;">&#10;<span>Герб Пласту</span>&#10;</div>&#10;</div><p>&#10;<a href="http://www.plast.org.ua/about/ideology/emblem/">Гербом Пласту</a> є трилиста квітка лілії - символ скаутського руху (відомий як Fleur-de-lis) - та тризуб, сплетені в одну гармонійну цілісність.&#10;</p><p>&#10;Для досягнення виховних цілей Пласт застосовує <a href="http://www.plast.org.ua/about/method/method/">власну унікальну методу виховання</a>, основні принципи якої полягають у добровільності членства в організації, вихованні і навчанні через гру та працю, поступовій програмі занять і випробувань, гуртковій системі самоорганізації, заохоченні ініціативи і самоврядування, пізнанні природи і житті серед природи, підтримці спеціальних зацікавлень і здібностей дітей та молоді.&#10;</p><p>&#10;На відміну від більшості скаутських організацій світу, де членство завершується із досягненням 25-ліття, членство в Пласті є пожиттєвим. Умовний віковий поділ передбачає <a href="http://www.plast.org.ua/about/method/agegroups/">4 вікові категорії</a>: новаки (6-12 років), юнаки (12-18 років), старші пластуни (18-35 років) та пластуні-сеніори (від 35 років). Виховна та адміністративна праця в Пласті здійснюється старшими пластунами та пластунами-сеніорами виключно на волонтерських засадах.&#10;</p><p>&#10;Пласт в Україні об\'єднує близько 6 тисяч членів різного віку і таким чином є найбільшою скаутською організацією України. На сьогодні 121 осередок Пласту діє у 22 областях України, Автономній республіці Крим, Києві і Севастополі. Пласт активно співпрацює з органами державної влади та громадськими організаціями, реалізуючи різноманітні соціальні та виховні програми.&#10;</p><p>&#10;Протягом року Пласт в Україні проводить понад 100 виховних таборів різної спеціалізації: спортивні, морські, з повітроплавання, мистецькі, лижні, альпіністичні, археологічні, кінні, екологічні тощо. У таборах пластуни практично закріплюють знання і уміння, здобуті впродовж року на щотижневих заняттях. Серед найбільших заходів, котрі щороку проводяться Пластом на всеукраїнському рівні - інтелектуально-мистецький змаг Орликіада, фестиваль творчості День пластуна, спортивний змаг Спартакіада, <a href="http://www.vvm.plast.org.ua">передача Вифлеємського вогню</a> місцевим громадам, змагання з пішого мандрівництва &#34;Стежками героїв&#34; та &#34;Осінній рейд&#34;. На місцевому рівні осередками Пласту постійно реалізується безліч акцій соціально-культурного та виховного спрямування.&#10;</p><p>&#10;Окрім України, Пласт офіційно існує у восьми країнах світу: Австралії, Аргентині, Великобританії, Канаді, Німеччині, Польщі, Словаччині та США. Пластові організації із усіх дев\'яти країн об\'єднані в <a href="http://www.plastscouting.org/">Конференцію українських пластових організацій</a>, на чолі світового пластового руху стоїть <a href="http://www.plast.org.ua/history/nachalni/info/">Начальний пластун</a>.&#10;</p>' 
Staticinfo.create(id: 1,about_us: about)

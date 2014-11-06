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

user = User.create(username: "user123", password: "12345678", password_confirmation: "12345678", email: "user@mail.com", birthday: "2000-12-31T22:00:00.000Z")
admin = User.create(username: "admin123", password: "12345678", password_confirmation: "12345678", email: "admin@mail.com", birthday: "2000-12-31T22:00:00.000Z")
moder = User.create(username: "moder123", password: "12345678", password_confirmation: "12345678", email: "moder@mail.com", birthday: "2000-12-31T22:00:00.000Z")
superadmin = User.create(username: "super123", password: "12345678", password_confirmation: "12345678", email: "super@mail.com", birthday: "2000-12-31T22:00:00.000Z")

Permission.create(tabs: 'admin1', admin: '1', superadmin: '4')
Permission.create(tabs: 'admin2', admin: '1', superadmin: '4')
Permission.create(tabs: 'admin3', admin: '1', superadmin: '4')

Permission.create(tabs: 'moder1', moder: '2', superadmin: '4')
Permission.create(tabs: 'moder2', moder: '2', superadmin: '4')
Permission.create(tabs: 'moder3', moder: '2', superadmin: '4')

Permission.create(tabs: 'comm1', admin: '1', moder: '2', user: '3', superadmin: '4')
Permission.create(tabs: 'comm2', admin: '1', moder: '2', user: '3', superadmin: '4')

quiz1 = subcat3.quizzes.create(status:"published", title: "Тест на знання правил футболу", description: "Детальний опис тесту")
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

quiz2 = subcat3.quizzes.create(status:"enhance", title: "Тест на знання історії України", description: "Детальний опис тесту")
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
question3_3 = quiz3.questions.create(title: "У якому році завершилась Друга Світова Війна?", description: "")
question3_3.answers.create( title: "1950р.", correct: false)
question3_3.answers.create( title: "1981р.", correct: false)
question3_3.answers.create( title: "1945р.", correct: true)
question3_3.answers.create(title: "1944р.", correct: false)

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


tag1 = Tag.create(tag: "футбол")
tag2 = Tag.create(tag: "спорт")
tag3 = Tag.create(tag: "м'яч")
tag4 = Tag.create(tag: "україна")
tag5 = Tag.create(tag: "історія")
tag6 = Tag.create(tag: "світ")
tag7 = Tag.create(tag: "програмування")
tag8 = Tag.create(tag: "java")
tag9 = Tag.create(tag: "масиви")
Tag.create(tag: "батьківщина")
Tag.create(tag: "світ")
Tag.create(tag: "історія")
Tag.create(tag: "всьо")
Tag.create(tag: "Гітлер")
Tag.create(tag: "Сталін")
Tag.create(tag: "голодомор")
Tag.create(tag: "перша_світова")
Tag.create(tag: "війна")
Tag.create(tag: "Німеччина")
Tag.create(tag: "хокей")
Tag.create(tag: "лід")
Tag.create(tag: "клюшка")
Tag.create(tag: "Рональдо")
Tag.create(tag: "Блохін")
Tag.create(tag: "Шевченко")
Tag.create(tag: "Вєтнам")
Tag.create(tag: "гвинтокрил")
Tag.create(tag: "напалм")
Tag.create(tag: "1991")
Tag.create(tag: "Україна")
Tag.create(tag: "незалежність")
Tag.create(tag: "Революція")
Tag.create(tag: "Україна")
Tag.create(tag: "Яник")

quiz1.tags << tag1
quiz1.tags << tag2
quiz1.tags << tag3
quiz2.tags << tag4
quiz3.tags << tag5
quiz3.tags << tag6
quiz4.tags << tag5
quiz4.tags << tag7
quiz4.tags << tag8
quiz5.tags << tag7
quiz5.tags << tag8
quiz5.tags << tag9

Faq.create(faq_question: "Як створити свій тест?", faq_answer: "Для цього потрібно зареєструватись")
Faq.create(faq_question: "Де можна знайти інформацію про сайт?", faq_answer: "В нижньому меню, яке називається Про Нас")
Faq.create(faq_question: "За якою шкалою оцінюється пройдений тест?", faq_answer: "100% - всі відповіді вірні, 67% - 2 відповіді з 3 правильні, 33% - 1 лише відповідь првильна, 0% - всі відповіді не правильні")
Faq.create(faq_question: "Де можна знайти тест на знання правил хокею?", faq_answer: "В підкатегорії Хокей, яка знаходиться в категорії Спорт")
Faq.create(faq_question: "Чи можна для пошук вибрати якусь конкретну підкатегорію?", faq_answer: "Так, звичайно.")

quiz3 = subcat4.quizzes.create(category_id: 6,status: "published", title: "Тест на знання історії світу", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
quiz3.tags << tag6
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

Contact.create(id: 1, role: "Адміністратор", phone: "+38 032 244-44-44", mail: "someone@somemail.com", address:"79000, Fedkovycha Str. 60A, building 1")
Contact.create(id: 2, role: "Модератор", phone: "+38 032 244-44-44", mail: "someone@somemail.com", address:"79000, Fedkovycha Str. 60A, building 1")
Contact.create(id: 3, role: "Ще хтось", phone: "+38 032 244-44-44", mail: "someone@somemail.com", address:"79000, Fedkovycha Str. 60A, building 1")

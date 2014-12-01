#encoding: utf-8 

cat1 = Category.create(category_id: 0, title: "Патрони")
cat1.categories.create(title: "Середньовіччя")
temp = cat1.categories.create(title: "Козаччина")
cat1.categories.create(title: "Новий час")
cat1.categories.create(title: "Новітній час")
cat1.categories.create(title: "Незалежність")


cat2 = Category.create(category_id: 0, title: "Вмілості")
cat2.categories.create(title: "Практичного пластування")
cat2.categories.create(title: "Морські")
cat2.categories.create(title: "Летунські")
cat2.categories.create(title: "Мистецькі")
cat2.categories.create(title: "Кінні")
cat2.categories.create(title: "Екологічні")
cat2.categories.create(title: "Мандрівництва")
cat2.categories.create(title: "Рятівництва")
cat2.categories.create(title: "Етнографічні")
cat2.categories.create(title: "Комп'ютерні")
cat2.categories.create(title: "Військові")
cat2.categories.create(title: "Природничі")
cat2.categories.create(title: "Спеціального зацікавлення")
cat2.categories.create(title: "Інші")

cat3 = Category.create(category_id: 0, title: "Проба")
cat3.categories.create(title: "Відзнака прихильника")
cat3.categories.create(title: "Перша проба")
cat3.categories.create(title: "Друга проба")
cat3.categories.create(title: "Третя проба")


adminRole = Role.create(name: 'admin')
moderRole = Role.create(name: 'moder')
userRole =  Role.create(name: 'user')
superadminRole = Role.create(name: 'superadmin')

# user1 = userRole.users.create(username: "user123", password: "12345678", password_confirmation: "12345678", email: "user1@mail.com", birthday: "2000-12-31T22:00:00.000Z")
# user2 = userRole.users.create(username: "user124", password: "12345678", password_confirmation: "12345678", email: "user2@mail.com", birthday: "2000-12-31T22:00:00.000Z")
# user3 = userRole.users.create(username: "user125", password: "12345678", password_confirmation: "12345678", email: "user3@mail.com", birthday: "2000-12-31T22:00:00.000Z")
# user4 = userRole.users.create(username: "user126", password: "12345678", password_confirmation: "12345678", email: "user4@mail.com", birthday: "2000-12-31T22:00:00.000Z")
# user5 = userRole.users.create(username: "user127", password: "12345678", password_confirmation: "12345678", email: "user5@mail.com", birthday: "2000-12-31T22:00:00.000Z")
# user6 = userRole.users.create(username: "user1239", password: "12345678", password_confirmation: "12345678", email: "use6r@mail.com", birthday: "2000-12-31T22:00:00.000Z")
# user7 = userRole.users.create(username: "user129", password: "12345678", password_confirmation: "12345678", email: "user7@mail.com", birthday: "2000-12-31T22:00:00.000Z")
# user8 = userRole.users.create(username: "user1231", password: "12345678", password_confirmation: "12345678", email: "use8r@mail.com", birthday: "2000-12-31T22:00:00.000Z")
# user9 = userRole.users.create(username: "user1232", password: "12345678", password_confirmation: "12345678", email: "user9@mail.com", birthday: "2000-12-31T22:00:00.000Z")
# user10 = userRole.users.create(username: "user1233", password: "12345678", password_confirmation: "12345678", email: "user10@mail.com", birthday: "2000-12-31T22:00:00.000Z")
# user11 = userRole.users.create(username: "user1234", password: "12345678", password_confirmation: "12345678", email: "user11@mail.com", birthday: "2000-12-31T22:00:00.000Z")
# user12 = userRole.users.create(username: "user1235", password: "12345678", password_confirmation: "12345678", email: "user12@mail.com", birthday: "2000-12-31T22:00:00.000Z")

# admin1 = adminRole.users.create(username: "admin123", password: "12345678", password_confirmation: "12345678", email: "admin@mail.com", birthday: "2000-12-31T22:00:00.000Z")
# moder1 = moderRole.users.create(username: "moder123", password: "12345678", password_confirmation: "12345678", email: "moder@mail.com", birthday: "2000-12-31T22:00:00.000Z")
superadmin1 = superadminRole.users.create(username: "super123", password: "12345678", password_confirmation: "12345678", email: "super@mail.com", birthday: "2000-12-31T22:00:00.000Z")

# valera = userRole.users.create(username: "Valera", password: "12345678", password_confirmation: "12345678", email: "valera@mail.com", birthday: "2000-12-31T22:00:00.000Z")
# ivan = userRole.users.create(username: "Ivan", password: "12345678", password_confirmation: "12345678", email: "ivan@mail.com", birthday: "2000-12-31T22:00:00.000Z")
# vasyl = userRole.users.create(username: "Vasyl", password: "12345678", password_confirmation: "12345678", email: "vasyl@mail.com", birthday: "2000-12-31T22:00:00.000Z")

Permission.create(tabs: 'adminUsersTab', admin: true, superadmin: true)
Permission.create(tabs: 'adminBlackListTab', admin: true, superadmin: true)
Permission.create(tabs: 'adminAdministrationTab', admin: true, superadmin: true)
Permission.create(tabs: 'adminModeratorsTab', admin: true, superadmin: true)
Permission.create(tabs: 'adminCategoriesTab', admin: true, superadmin: true)
Permission.create(tabs: 'adminAboutUsTab', admin: true, superadmin: true)
Permission.create(tabs: 'adminFAQ', admin: true, superadmin: true)

Permission.create(tabs: 'Moder_cabinet', moder: true, superadmin: true)
Permission.create(tabs: 'Moder_published', moder: true, superadmin: true)
Permission.create(tabs: 'Moder_review', moder: true, superadmin: true)
Permission.create(tabs: 'Moder_enhance', moder: true, superadmin: true)
Permission.create(tabs: 'Moder_review_quiz', moder: true, superadmin: true)

Permission.create(tabs: 'User_cabinet', user: true, moder: true, admin: true, superadmin: true)
Permission.create(tabs: 'User_published', user: true, moder: true, admin: true, superadmin: true)
Permission.create(tabs: 'User_enhance', user: true, moder: true, admin: true, superadmin: true)
Permission.create(tabs: 'User_review', user: true, moder: true, admin: true, superadmin: true)
Permission.create(tabs: 'User_draft', user: true, moder: true, admin: true, superadmin: true)
Permission.create(tabs: 'User_profile', user: true, moder: true, admin: true, superadmin: true)
Permission.create(tabs: 'User_create_quiz', user: true, moder: true, admin: true, superadmin: true)
Permission.create(tabs: 'User_edit_quiz', user: true, moder: true, admin: true, superadmin: true)
Permission.create(tabs: 'User_statistic', user: true, moder: true, admin: true, superadmin: true)

Permission.create(tabs: 'menuPersonalCabinet', admin: true, moder: true, user: true, superadmin: true)
Permission.create(tabs: 'menuAdminPanel', admin: true, superadmin: true)
Permission.create(tabs: 'menuModerationCabinet', moder: true, superadmin: true)

tag1 = Tag.create(tag: "Іван")
tag2 = Tag.create(tag: "Богун")
# tag3 = Tag.create(tag: "м'яч")
# tag4 = Tag.create(tag: "україна")
# tag5 = Tag.create(tag: "історія")
# tag6 = Tag.create(tag: "світ")
# tag7 = Tag.create(tag: "програмування")
# tag8 = Tag.create(tag: "java")
# tag9 = Tag.create(tag: "масиви")
# tag10 = Tag.create(tag: "всьо")
# tag11 = Tag.create(tag: "гітлер")
# tag12 = Tag.create(tag: "сталін")
# tag13 = Tag.create(tag: "голодомор")
# tag14 = Tag.create(tag: "друга_світова")
# tag15 = Tag.create(tag: "перша_світова")
# tag16 = Tag.create(tag: "війна")
# tag17 = Tag.create(tag: "німеччина")
# tag18 = Tag.create(tag: "хокей")
# tag19 = Tag.create(tag: "лід")
# tag20 = Tag.create(tag: "клюшка")
# tag21 = Tag.create(tag: "рональдо")
# tag22 = Tag.create(tag: "блохін")
# tag23 = Tag.create(tag: "шевченко")
# tag24 = Tag.create(tag: "вєтнам")
# tag25 = Tag.create(tag: "гвинтокрил")
# tag26 = Tag.create(tag: "напалм")
# tag27 = Tag.create(tag: "революція")
# tag28 = Tag.create(tag: "яник")
# tag29 = Tag.create(tag: "1991")
# tag30 = Tag.create(tag: "незалежність")
# tag31 = Tag.create(tag: "батьківщина")
# tag32 = Tag.create(tag: "ооп")
# tag33 = Tag.create(tag: "поліморфізм")

questions = ["Хто такий Іван Богун?","Коли і де народився Іван Богун?",
"Обороною перевозу через яку річку керував Іван Богун, при захисті м. Азова від турецьких військ султана Ібрагіма?",
"Серед козаків якого полку значився Богун згідно «Реєстру Війська Запорізького 1649 р.» ?",
"Яким титулом (військовим званням) його було нагороджено близько 1650 року ?",
"Для чого Богун наказав прорубати ополонки в Пд. Бузі при обороні Вінниці 1951 р. ?",
"В якій битві Іван Богун вивів з оточеня основні сили українського війська, після того, як на нього поклали обов’язки гетьмана ?",
"З ким 1653 р. Богун  водив козацькі полки в похід на Молдавію, де було розгромлено армію Георгіци та його союзників?",
"Як ставився Іван Богун до Берестейського Договору 1654 р. Б.?",
"Чи є відома дата смерті Івана Богуна ?"]

info = [ "Іван Богун був одним із найвідоміших козацьких полководців в Україні середини XVII ст., слава про якого — гучно лунала не лише на українських землях, а й за їх межами.",
"Незважаючи на велику популярність, історичних джерел, що повною мірою документують його життя і діяльність — не збереглося. Достеменно невідомо, коли і де народився Іван Богун.",
"Перші дані про ратні справи Івана Богуна пов'язані з його участю в обороні Азова, коли запорізькі та донські козаки героїчно захищали місто від турецьких військ султана Ібрагіма і датуються 1637—1642 роками. Богун, зокрема, керував тоді одним із козацьких загонів, який прикривав Борівський перевіз через річку Сіверський Донець.",
"З початком у 1648 р. Визвольної війни українського народу Богун став одним із сподвижників гетьмана Богдана Хмельницького, і згідно «Реєстру Війська Запорізького 1649 р.» він значився серед козаків Чигиринського полку. ",
"Згодом, найвірогідніше у 1650 р., за неабиякі організаторські здібності та військовий талант Богуна було призначено кальницьким полковником, а тому подальша його доля була тісно пов'язана із захистом Вінничини та Брацлавщини від військ Речі Посполитої.",
"У боях під Вінницею в березні 1651 р. Богун вперше найбільш масштабно проявив здібності воєводи, заманивши в ході бою польську кінноту на Південний Буг, де драгуни потрапили до зарання підготованої пастки. (Богун наказав пропрубати в ночі в кризі ополонки, а потім присипати їх соломою і снігом, так що до ранку поверхня річки була знов як “новенька”). Тут же Богун проявив значну особисту хоробрість, очолюючи сміливі нічні вилазки з козацького табору. В кінцевому підсумку Богун втримав свої оборонні позиції під Вінницею i після підходу основних сил української армії змусив коронне військо відступити. В подальшому, переслідуючи польські загони, полк Богуна брав участь у штурмі Кам'янця-Подільського (29 квітня - 1 травня 1651 р. ) а в середині травня його козаки оволоділи Корцем.",
"Важливою сторінкою з-поміж ратних справ кальницького полковника стала Берестецька битва, в якій І. Богун проявив себе розсудливим полководцем в найтрагічніший момент бою. Саме його було обрано наказним гетьманом в оточеному поляками козацькому таборі 30 червня 1651 р. І. Богун виправдав покладені на нього сподівання, вивів із оточення основні сили українського війська.",
"В 1653 р. Богун разом із Тимошем Хмельницьким водив козацькі полки в похід на Молдавію, де було розгромлено армію Георгіци та його союзників. Після загибелі в Сучаві Т. Хмельницького (5.11.1653) І. Богун повернувся з військом в Україну.",
"Характеризуючи політичну діяльність полковника Війська Запорозького Івана Богуна, відзначимо, що він палко любив свою Україну й досить боляче реагував на кроки українських гетьманів, що могли ущемляти права останньої або козацькі вольності. Тому Іван Богун в політичному спектрі Української козацької держави займав місце постійного опозиціонера. Зокрема, він досить рішуче виступив проти укладення Богданом Хмельницьким Білоцерківського договору (28 жовтня 1651), засуджуючи при цьому політику поступок Польщі і зменшення козацького реєстру. У 1654 Богун був у числі противників курсу Хмельницького на союз iз Москвою i, так і не склавши присяги російському цареві, згодом очолив антимосковську старшинську опозицію.",
"У 1662 р. кальницький полковник І. Богун був ув'язнений поляками і відправлений до Мальборга. Він був звільнений Яном Казимиром в обмін на участь в поході на Лівобережну Україну. Але згодом Богун був не справедливо звинувачений у зносинах з москалями та урядом І. Брюховецького і був підло вбитий поблизу Новгород-Сіверського 17 лютого 1664 року."]

answers = [[["Магнат, відомий на весь світ своїм цукровим бізнесом", false], ["Головний суперник М. Грушевського на пост президента", false], ["Одним із найвідоміших козацьких полководців", true]],
[["Острог, 1576", false], ["Не відомо", true], ["Луцьк, 1579", false]],
[["Дон", false], ["річку ім. Богуна", false], ["Сіверський Донець", true]],
[["Чигиринського", true], ["Чернівецького", false], ["Катеринославського", false]],
[["гетьманичем чигиринським", false], ["полковником кальницький", true], ["морським гетьманом", false]],
[["в місті почався голод, тому козаки врятували таким чином місто, наловивши риби", false], ["це була військова хитрість", true], ["хотів, скупатись в крижаній воді на Водохрещу", false]],
[["Під Корсунем", false], ["Під Жовтими Водами", false], ["Під Берестечком", true]],
[["Байдою Вишнивецьким", false], ["Тимошем Хмельницким", true], ["Юрком Острозьким", false]],
[["засуджував", true], ["нейтрально", false], ["з прихильністю", false]],
[["достеменно сказати не можем", false], ["17 лютого 1664 р. Б.", true], ["14 серпня 1654 р. Б.", false]]]

quiz1 = temp.quizzes.create(status:"published", 
														title: "Іван Богун",
														description: "Тест про патрона куреня УПЮ ч. 73 ім. Івана Богуна зі станиці Львів.")

questions.each_with_index { |question, index| 
	temp = quiz1.questions.create(title: question,
								description: info[index])
	temp.answers.create( title: answers[index][0][0], correct: answers[index][0][1])
	temp.answers.create( title: answers[index][1][0], correct: answers[index][1][1])
	temp.answers.create( title: answers[index][2][0], correct: answers[index][2][1])
}

quiz1.tags << tag1
quiz1.tags << tag2

quiz1.update(user: superadmin1)

# quiz2 = subcat3.quizzes.create(status:"enhance", title: "Знання історії України", description: "Детальний опис тесту монголо-татар")
# question2_1 = quiz2.questions.create(title: "У 1223 р. на Київську Русь напали орди", description: "У 1223 р. на Київську Русь напали орди")
# question2_1.answers.create(title: "печенігів", correct: false)
# question2_1.answers.create( title: "половців", correct: false)
# question2_1.answers.create( title: "монголо-татар", correct: true)
# question2_2 = quiz2.questions.create(title: "Визвольна війна, очолювана Богданом Хмельницьким тривала", description: "Визвольна війна, очолювана Богданом Хмельницьким тривала в період 1652 – 1662 рр.")
# question2_2.answers.create( title: "1648 – 1652 рр.", correct: false)
# question2_2.answers.create( title: "1652 – 1662 рр.", correct: true)
# question2_2.answers.create( title: "1698 – 1700 рр.", correct: false)
# question2_3 = quiz2.questions.create(title: "Перший Президент України", description: "Першим президентом вважається М.Грушевський")
# question2_3.answers.create( title: "Л.Кравчук", correct: false)
# question2_3.answers.create( title: "Л.Кучма", correct: false)
# question2_3.answers.create( title: "М.Грушевський", correct: true)
# question2_3.answers.create(title: "Ленін", correct: false)
# quiz2.comments.create(text: "Потрібно додати більше питань")
# quiz2.tags << tag4
# quiz2.tags << tag5
# quiz2.update(user: valera)

# quiz3 = subcat4.quizzes.create(status:"published", title: "Друга світова війна", description: "Детальний опис тесту")
# question3_1 = quiz3.questions.create(title: "У якому році почалась Друга Світова Війна?", description: "Друга світова війна почалась з нападу Третього Рейху на Польщу 9-го вересня 1939р року")
# question3_1.answers.create(title: "1941р.", correct: false)
# question3_1.answers.create( title: "1939р.", correct: true)
# question3_1.answers.create( title: "1911р.", correct: false)
# question3_1.answers.create( title: "ШТО?", correct: false)
# question3_2 = quiz3.questions.create(title: "Як називався план нападу Третього Рейху на СРСР?", description: "План Барбаросса передбачував військовий напад на СРСР з повним розгромом Радянської армії")
# question3_2.answers.create( title: "Вайс", correct: false)
# question3_2.answers.create( title: "Рот", correct: false)
# question3_2.answers.create( title: "Барбаросса", correct: true)
# question3_3 = quiz3.questions.create(title: "У якому році завершилась Друга Світова Війна?", description: "Друга Світова Війна завершилась у 1945р.")
# question3_3.answers.create( title: "1950р.", correct: false)
# question3_3.answers.create( title: "1981р.", correct: false)
# question3_3.answers.create( title: "1945р.", correct: true)
# question3_3.answers.create(title: "1944р.", correct: false)
# quiz3.tags << tag5
# quiz3.tags << tag6
# quiz3.update(user: ivan)

# quiz4 = subcat6.quizzes.create(status:"review", title: "Історія Java", description: "Детальний опис тесту")
# question4_1 = quiz4.questions.create(title: "Якою компанією випущена мова Java?", description: "Java випущена компанією Sun Microsystems у 1995 році як основний компонент платформи Java.")
# question4_1.answers.create(title: "Sun Microsystems", correct: true)
# question4_1.answers.create( title: "Motorolla", correct: false)
# question4_1.answers.create( title: "Google", correct: false)
# question4_2 = quiz4.questions.create(title: "Звідки мова Java отримала свою назву?", description: "Названа на честь марки кави Java, яка, в свою чергу, отримала найменування однойменного острова")
# question4_2.answers.create( title: "Назва була вигадана першим розробником", correct: false)
# question4_2.answers.create( title: "Запозичення з іншої мови", correct: false)
# question4_2.answers.create( title: "Марка кави", correct: true)
# question4_3 = quiz4.questions.create(title: "Хто започаткував розробку мови Java?", description: "Розробку проекту започаткував Джеймс Ґослінґ, сам проект мав назву «Green»(Зелений)")
# question4_3.answers.create( title: "Фред Лонг", correct: false)
# question4_3.answers.create( title: "Джеймс Ґослінґ", correct: true)
# question4_3.answers.create( title: "Кей Хорстманн", correct: false)
# quiz4.comments.create(text: "Дуже гарний тест")
# quiz4.comments.create(text: "Потрібно додати питання із декількома правильними відповідями")
# quiz4.tags << tag5
# quiz4.tags << tag7
# quiz4.tags << tag8
# quiz4.update(user: vasyl)

# quiz5 = subcat6.quizzes.create(status:"draft", title: "Базові знання Java", description: "Детальний опис тесту")
# question5_1 = quiz5.questions.create(title: "Який з вказаних типів не є простим?", description: "Простими типами в Java є : boolean, byte, char, short, int, long, float, double.")
# question5_1.answers.create(title: "int", correct: false)
# question5_1.answers.create( title: "double", correct: false)
# question5_1.answers.create( title: "word", correct: true)
# question5_1.answers.create( title: "boolean", correct: false)
# question5_1.answers.create( title: "char", correct: false)
# question5_2 = quiz5.questions.create(title: "Який оператор відповідає за імпортування зовнішніх пакетів в Java?", description: "За імпортування зовнішніх пакетів в Java відповідає оператор import")
# question5_2.answers.create( title: "include", correct: false)
# question5_2.answers.create( title: "import", correct: true)
# question5_2.answers.create( title: "require", correct: false)
# question5_3 = quiz5.questions.create(title: "Як оголосити масив типу int в Java?", description: "int my_array[] або int[] my_array")
# question5_3.answers.create( title: "int my_array[]", correct: true)
# question5_3.answers.create( title: "int[] my_array", correct: true)
# question5_3.answers.create( title: "var array = new Array", correct: false)
# quiz5.comments.create(text: "Потрібно детальніше описати правильну відповідь у питанні про масиви")
# quiz5.tags << tag7
# quiz5.tags << tag8
# quiz5.tags << tag9
# quiz5.update(user: vasyl)



# quiz6 = subcat4.quizzes.create(category_id: 6,status: "published", title: "Знання історії світу", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
# question6_1 = quiz6.questions.create(title: "У 1223 р. на Київську Русь напали орди", description: "У 1223 р. на Київську Русь напали орди")
# question6_1.answers.create(title: "печенігів", correct: false)
# question6_1.answers.create( title: "половців", correct: false)
# question6_1.answers.create( title: "монголо-татар", correct: true)
# question6_2 = quiz6.questions.create(title: "Визвольна війна, очолювана Богданом Хмельницьким тривала", description: "Визвольна війна, очолювана Богданом Хмельницьким тривала в період 1652 – 1662 рр.")
# question6_2.answers.create( title: "1648 – 1652 рр.", correct: false)
# question6_2.answers.create( title: "1652 – 1662 рр.", correct: true)
# question6_2.answers.create( title: "1698 – 1700 рр.", correct: false)
# question6_3 = quiz6.questions.create(title: "Перший Президент України", description: "Першим президентом вважається М.Грушевський")
# question6_3.answers.create( title: "Л.Кравчук", correct: false)
# question6_3.answers.create( title: "Л.Кучма", correct: false)
# question6_3.answers.create( title: "М.Грушевський", correct: true)
# question6_3.answers.create(title: "Ленін", correct: false)
# quiz6.comments.create(text: "Потрібно додати більше питань")
# quiz6.tags << tag6
# quiz6.tags << tag5
# quiz6.tags << tag10
# quiz6.update(user: valera)

# quiz7 = subcat4.quizzes.create(category_id: 6,status:"published", title: "Знання другої світової війни", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
# question7_1 = quiz7.questions.create(title: "У якому році почалась Друга Світова Війна?", description: "Друга світова війна почалась з нападу Третього Рейху на Польщу 9-го вересня 1939р року")
# question7_1.answers.create(title: "1941р.", correct: false)
# question7_1.answers.create( title: "1939р.", correct: true)
# question7_1.answers.create( title: "1911р.", correct: false)
# question7_1.answers.create( title: "ШТО?", correct: false)
# question7_2 = quiz7.questions.create(title: "Як називався план нападу Третього Рейху на СРСР?", description: "План Барбаросса передбачував військовий напад на СРСР з повним розгромом Радянської армії")
# question7_2.answers.create( title: "Вайс", correct: false)
# question7_2.answers.create( title: "Рот", correct: false)
# question7_2.answers.create( title: "Барбаросса", correct: true)
# question7_3 = quiz7.questions.create(title: "У якому році завершилась Друга Світова Війна?", description: "Друга Світова Війна завершилась у 1945р.")
# question7_3.answers.create( title: "1950р.", correct: false)
# question7_3.answers.create( title: "1981р.", correct: false)
# question7_3.answers.create( title: "1945р.", correct: true)
# question7_3.answers.create(title: "1944р.", correct: false)
# quiz7.tags << tag11
# quiz7.tags << tag12
# quiz7.tags << tag13
# quiz7.tags << tag14
# quiz7.update(user: valera)

# quiz8 = subcat4.quizzes.create(category_id: 6,status:"published", title: "Знання першої світової війни", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
# question8_1 = quiz8.questions.create(title: "У якому році почалась Друга Світова Війна?", description: "Друга світова війна почалась з нападу Третього Рейху на Польщу 9-го вересня 1939р року")
# question8_1.answers.create(title: "1941р.", correct: false)
# question8_1.answers.create( title: "1939р.", correct: true)
# question8_1.answers.create( title: "1911р.", correct: false)
# question8_1.answers.create( title: "ШТО?", correct: false)
# question8_2 = quiz8.questions.create(title: "Як називався план нападу Третього Рейху на СРСР?", description: "План Барбаросса передбачував військовий напад на СРСР з повним розгромом Радянської армії")
# question8_2.answers.create( title: "Вайс", correct: false)
# question8_2.answers.create( title: "Рот", correct: false)
# question8_2.answers.create( title: "Барбаросса", correct: true)
# question8_3 = quiz8.questions.create(title: "У якому році завершилась Друга Світова Війна?", description: "Друга Світова Війна завершилась у 1945р.")
# question8_3.answers.create( title: "1950р.", correct: false)
# question8_3.answers.create( title: "1981р.", correct: false)
# question8_3.answers.create( title: "1945р.", correct: true)
# question8_3.answers.create(title: "1944р.", correct: false)
# quiz8.tags << tag15
# quiz8.tags << tag16
# quiz8.tags << tag17
# quiz8.update(user: valera)

# quiz9 = subcat2.quizzes.create(category_id: 3,status:"published", title: "Правила хокею", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
# question9_1 = quiz9.questions.create(title: "Скільки гравців в команді?", description: "Згідно правил на полі знаходиться 11 гравців однієї команди")
# question9_1.answers.create(title: "11", correct: true)
# question9_1.answers.create( title: "12", correct: false)
# question9_1.answers.create( title: "5", correct: false)
# question9_2 = quiz9.questions.create(title: "Скільки триває один тайм?", description: "Один тайм матчу триває 45 хв. не враховуючи додаткового часу")
# question9_2.answers.create( title: "20хв", correct: false)
# question9_2.answers.create( title: "45хв", correct: true)
# question9_2.answers.create( title: "до останнього гравця", correct: false)
# question9_3 = quiz9.questions.create(title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "Це є порушенням правил, після того як гравець торкнувся мяча рукою гра зупиняється, та назначається штрафний")
# question9_3.answers.create( title: "Порушенння правил", correct: true)
# question9_3.answers.create( title: "Штрафний удар", correct: true)
# question9_3.answers.create( title: "Дадуть пиріжок", correct: false)
# question9_3.answers.create(title: "Дадуть в голову", correct: false)
# quiz9.tags << tag18
# quiz9.tags << tag19
# quiz9.tags << tag20
# quiz9.update(user: valera)

# quiz10 = subcat1.quizzes.create(category_id: 2,status:"published", title: "Видатні футболісти", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
# question10_1 = quiz10.questions.create(title: "Скільки гравців в команді?", description: "Згідно правил на полі знаходиться 11 гравців однієї команди")
# question10_1.answers.create(title: "11", correct: true)
# question10_1.answers.create( title: "12", correct: false)
# question10_1.answers.create( title: "5", correct: false)
# question10_2 = quiz10.questions.create(title: "Скільки триває один тайм?", description: "Один тайм матчу триває 45 хв. не враховуючи додаткового часу")
# question10_2.answers.create( title: "20хв", correct: false)
# question10_2.answers.create( title: "45хв", correct: true)
# question10_2.answers.create( title: "до останнього гравця", correct: false)
# question10_3 = quiz10.questions.create(title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "Це є порушенням правил, після того як гравець торкнувся мяча рукою гра зупиняється, та назначається штрафний")
# question10_3.answers.create( title: "Порушенння правил", correct: true)
# question10_3.answers.create( title: "Штрафний удар", correct: true)
# question10_3.answers.create( title: "Дадуть пиріжок", correct: false)
# question10_3.answers.create(title: "Дадуть в голову", correct: false)
# quiz10.tags << tag21
# quiz10.tags << tag22
# quiz10.tags << tag23
# quiz10.update(user: valera)

# quiz11 = subcat3.quizzes.create(category_id: 6,status:"published", title: "Тест на знання війни в Вєтнамі", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
# question11_1 = quiz11.questions.create(title: "В якому році почалася війна?", description: "Війна почалася в 1959 році")
# question11_1.answers.create(title: "1959", correct: true)
# question11_1.answers.create( title: "1976", correct: false)
# question11_1.answers.create( title: "1983", correct: false)
# question11_2 = quiz11.questions.create(title: "Між якими країнами?", description: "Війна між комуністичним Північним В'єтнамом (підтримуваним СРСР та КНР) і Південним В'єтнамом (підтримуваним США, Австралією, Новою Зеландією, Південною Кореєю)")
# question11_2.answers.create( title: "Північний Вєтнам - Австралія", correct: false)
# question11_2.answers.create( title: "Південний Вєтнам - Південний Вєтнам", correct: true)
# question11_2.answers.create( title: "Південний Вєтнам - Австралія", correct: false)
# question11_3 = quiz11.questions.create(title: "В якому році закінчилася війна?", description: "Війна закінчилася в 1975 році")
# question11_3.answers.create( title: "1975", correct: true)
# question11_3.answers.create( title: "1985", correct: false)
# question11_3.answers.create(title: "1992", correct: false)
# quiz11.tags << tag24
# quiz11.tags << tag25
# quiz11.tags << tag26
# quiz11.update(user: valera)

# quiz12 = subcat3.quizzes.create(category_id: 5,status:"published", title: "Революція гідності 2014 року", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
# question12_1 = quiz12.questions.create(title: "Скільки гравців в команді?", description: "Згідно правил на полі знаходиться 11 гравців однієї команди")
# question12_1.answers.create(title: "11", correct: true)
# question12_1.answers.create( title: "12", correct: false)
# question12_1.answers.create( title: "5", correct: false)
# question12_2 = quiz12.questions.create(title: "Скільки триває один тайм?", description: "Один тайм матчу триває 45 хв. не враховуючи додаткового часу")
# question12_2.answers.create( title: "20хв", correct: false)
# question12_2.answers.create( title: "45хв", correct: true)
# question12_2.answers.create( title: "до останнього гравця", correct: false)
# question12_3 = quiz12.questions.create(title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "Це є порушенням правил, після того як гравець торкнувся мяча рукою гра зупиняється, та назначається штрафний")
# question12_3.answers.create( title: "Порушенння правил", correct: true)
# question12_3.answers.create( title: "Штрафний удар", correct: true)
# question12_3.answers.create( title: "Дадуть пиріжок", correct: false)
# question12_3.answers.create(title: "Дадуть в голову", correct: false)
# quiz12.tags << tag27
# quiz12.tags << tag4
# quiz12.tags << tag28
# quiz12.update(user: valera)

# quiz13 = subcat3.quizzes.create(category_id: 5,status:"published", title: "Украйна в часи незалежності", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
# question13_1 = quiz13.questions.create(title: "Скільки гравців в команді?", description: "Згідно правил на полі знаходиться 11 гравців однієї команди")
# question13_1.answers.create(title: "11", correct: true)
# question13_1.answers.create( title: "12", correct: false)
# question13_1.answers.create( title: "5", correct: false)
# question13_2 = quiz13.questions.create(title: "Скільки триває один тайм?", description: "Один тайм матчу триває 45 хв. не враховуючи додаткового часу")
# question13_2.answers.create( title: "20хв", correct: false)
# question13_2.answers.create( title: "45хв", correct: true)
# question13_2.answers.create( title: "до останнього гравця", correct: false)
# question13_3 = quiz13.questions.create(title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "Це є порушенням правил, після того як гравець торкнувся мяча рукою гра зупиняється, та назначається штрафний")
# question13_3.answers.create( title: "Порушенння правил", correct: true)
# question13_3.answers.create( title: "Штрафний удар", correct: true)
# question13_3.answers.create( title: "Дадуть пиріжок", correct: false)
# question13_3.answers.create(title: "Дадуть в голову", correct: false)
# quiz13.tags << tag29
# quiz13.tags << tag4
# quiz13.tags << tag30
# quiz13.tags << tag31
# quiz13.update(user: valera)

# quiz14 = subcat5.quizzes.create(category_id: 5,status:"published", title: "Поліморфізм", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
# question14_1 = quiz14.questions.create(title: "Скільки гравців в команді?", description: "Згідно правил на полі знаходиться 11 гравців однієї команди")
# question14_1.answers.create(title: "11", correct: true)
# question14_1.answers.create( title: "12", correct: false)
# question14_1.answers.create( title: "5", correct: false)
# question14_2 = quiz14.questions.create(title: "Скільки триває один тайм?", description: "Один тайм матчу триває 45 хв. не враховуючи додаткового часу")
# question14_2.answers.create( title: "20хв", correct: false)
# question14_2.answers.create( title: "45хв", correct: true)
# question14_2.answers.create( title: "до останнього гравця", correct: false)
# question14_3 = quiz14.questions.create(title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "Це є порушенням правил, після того як гравець торкнувся мяча рукою гра зупиняється, та назначається штрафний")
# question14_3.answers.create( title: "Порушенння правил", correct: true)
# question14_3.answers.create( title: "Штрафний удар", correct: true)
# question14_3.answers.create( title: "Дадуть пиріжок", correct: false)
# question14_3.answers.create(title: "Дадуть в голову", correct: false)
# quiz14.tags << tag32
# quiz14.tags << tag33
# quiz14.tags << tag7
# quiz14.update(user: valera)

# quiz15 = subcat3.quizzes.create(category_id: 5,status:"published", title: "Тест на знання історії Галичини", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
# question15_1 = quiz15.questions.create(title: "Скільки гравців в команді?", description: "Згідно правил на полі знаходиться 11 гравців однієї команди")
# question15_1.answers.create(title: "11", correct: true)
# question15_1.answers.create( title: "12", correct: false)
# question15_1.answers.create( title: "5", correct: false)
# question15_2 = quiz15.questions.create(title: "Скільки триває один тайм?", description: "Один тайм матчу триває 45 хв. не враховуючи додаткового часу")
# question15_2.answers.create( title: "20хв", correct: false)
# question15_2.answers.create( title: "45хв", correct: true)
# question15_2.answers.create( title: "до останнього гравця", correct: false)
# question15_3 = quiz15.questions.create(title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "Це є порушенням правил, після того як гравець торкнувся мяча рукою гра зупиняється, та назначається штрафний")
# question15_3.answers.create( title: "Порушенння правил", correct: true)
# question15_3.answers.create( title: "Штрафний удар", correct: true)
# question15_3.answers.create( title: "Дадуть пиріжок", correct: false)
# question15_3.answers.create(title: "Дадуть в голову", correct: false)
# quiz15.tags << tag4
# quiz15.tags << tag31
# quiz15.tags << tag5
# quiz15.update(user: valera)

# quiz16 = subcat3.quizzes.create(category_id: 5,status:"published", title: "Тест на знання історії світових воєн", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
# question16_1 = quiz16.questions.create(title: "Скільки гравців в команді?", description: "Згідно правил на полі знаходиться 11 гравців однієї команди")
# question16_1.answers.create(title: "11", correct: true)
# question16_1.answers.create( title: "12", correct: false)
# question16_1.answers.create( title: "5", correct: false)
# question16_2 = quiz16.questions.create(title: "Скільки триває один тайм?", description: "Один тайм матчу триває 45 хв. не враховуючи додаткового часу")
# question16_2.answers.create( title: "20хв", correct: false)
# question16_2.answers.create( title: "45хв", correct: true)
# question16_2.answers.create( title: "до останнього гравця", correct: false)
# question16_3 = quiz16.questions.create(title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "Це є порушенням правил, після того як гравець торкнувся мяча рукою гра зупиняється, та назначається штрафний")
# question16_3.answers.create( title: "Порушенння правил", correct: true)
# question16_3.answers.create( title: "Штрафний удар", correct: true)
# question16_3.answers.create( title: "Дадуть пиріжок", correct: false)
# question16_3.answers.create(title: "Дадуть в голову", correct: false)
# quiz16.tags << tag14
# quiz16.tags << tag16
# quiz16.tags << tag15
# quiz16.tags << tag5
# quiz16.update(user: valera)

# quiz17 = subcat3.quizzes.create(category_id: 5,status:"published", title: "Тест на знання історії першої світової війни", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
# question17_1 = quiz17.questions.create(title: "Скільки гравців в команді?", description: "Згідно правил на полі знаходиться 11 гравців однієї команди")
# question17_1.answers.create(title: "11", correct: true)
# question17_1.answers.create( title: "12", correct: false)
# question17_1.answers.create( title: "5", correct: false)
# question17_2 = quiz17.questions.create(title: "Скільки триває один тайм?", description: "Один тайм матчу триває 45 хв. не враховуючи додаткового часу")
# question17_2.answers.create( title: "20хв", correct: false)
# question17_2.answers.create( title: "45хв", correct: true)
# question17_2.answers.create( title: "до останнього гравця", correct: false)
# question17_3 = quiz17.questions.create(title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "Це є порушенням правил, після того як гравець торкнувся мяча рукою гра зупиняється, та назначається штрафний")
# question17_3.answers.create( title: "Порушенння правил", correct: true)
# question17_3.answers.create( title: "Штрафний удар", correct: true)
# question17_3.answers.create( title: "Дадуть пиріжок", correct: false)
# question17_3.answers.create(title: "Дадуть в голову", correct: false)
# quiz17.tags << tag15
# quiz17.tags << tag5
# quiz17.update(user: valera)

# quiz18 = subcat3.quizzes.create(category_id: 5,status:"published", title: "Тест на знання історії другої світової війни", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
# question18_1 = quiz18.questions.create(title: "Скільки гравців в команді?", description: "Згідно правил на полі знаходиться 11 гравців однієї команди")
# question18_1.answers.create(title: "11", correct: true)
# question18_1.answers.create( title: "12", correct: false)
# question18_1.answers.create( title: "5", correct: false)
# question18_2 = quiz18.questions.create(title: "Скільки триває один тайм?", description: "Один тайм матчу триває 45 хв. не враховуючи додаткового часу")
# question18_2.answers.create( title: "20хв", correct: false)
# question18_2.answers.create( title: "45хв", correct: true)
# question18_2.answers.create( title: "до останнього гравця", correct: false)
# question18_3 = quiz18.questions.create(title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "Це є порушенням правил, після того як гравець торкнувся мяча рукою гра зупиняється, та назначається штрафний")
# question18_3.answers.create( title: "Порушенння правил", correct: true)
# question18_3.answers.create( title: "Штрафний удар", correct: true)
# question18_3.answers.create( title: "Дадуть пиріжок", correct: false)
# question18_3.answers.create(title: "Дадуть в голову", correct: false)
# quiz18.tags << tag15
# quiz18.tags << tag5
# quiz18.tags << tag11
# quiz18.tags << tag12
# quiz18.update(user: valera)

# quiz19 = subcat3.quizzes.create(category_id: 5,status:"published", title: "Тест на знання історії революцій України", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
# question19_1 = quiz19.questions.create(title: "Скільки гравців в команді?", description: "Згідно правил на полі знаходиться 11 гравців однієї команди")
# question19_1.answers.create(title: "11", correct: true)
# question19_1.answers.create( title: "12", correct: false)
# question19_1.answers.create( title: "5", correct: false)
# question19_2 = quiz19.questions.create(title: "Скільки триває один тайм?", description: "Один тайм матчу триває 45 хв. не враховуючи додаткового часу")
# question19_2.answers.create( title: "20хв", correct: false)
# question19_2.answers.create( title: "45хв", correct: true)
# question19_2.answers.create( title: "до останнього гравця", correct: false)
# question19_3 = quiz19.questions.create(title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "Це є порушенням правил, після того як гравець торкнувся мяча рукою гра зупиняється, та назначається штрафний")
# question19_3.answers.create( title: "Порушенння правил", correct: true)
# question19_3.answers.create( title: "Штрафний удар", correct: true)
# question19_3.answers.create( title: "Дадуть пиріжок", correct: false)
# question19_3.answers.create(title: "Дадуть в голову", correct: false)
# quiz19.tags << tag27
# quiz19.tags << tag5
# quiz19.update(user: valera)

# quiz20 = subcat3.quizzes.create(category_id: 5,status:"published", title: "Тест на знання історії Революції Гідності України", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
# question20_1 = quiz20.questions.create(title: "Скільки гравців в команді?", description: "Згідно правил на полі знаходиться 11 гравців однієї команди")
# question20_1.answers.create(title: "11", correct: true)
# question20_1.answers.create( title: "12", correct: false)
# question20_1.answers.create( title: "5", correct: false)
# question20_2 = quiz20.questions.create(title: "Скільки триває один тайм?", description: "Один тайм матчу триває 45 хв. не враховуючи додаткового часу")
# question20_2.answers.create( title: "20хв", correct: false)
# question20_2.answers.create( title: "45хв", correct: true)
# question20_2.answers.create( title: "до останнього гравця", correct: false)
# question20_3 = quiz20.questions.create(title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "Це є порушенням правил, після того як гравець торкнувся мяча рукою гра зупиняється, та назначається штрафний")
# question20_3.answers.create( title: "Порушенння правил", correct: true)
# question20_3.answers.create( title: "Штрафний удар", correct: true)
# question20_3.answers.create( title: "Дадуть пиріжок", correct: false)
# question20_3.answers.create(title: "Дадуть в голову", correct: false)
# quiz20.tags << tag27
# quiz20.tags << tag5
# quiz20.tags << tag4
# quiz20.tags << tag28
# quiz20.update(user: valera)

# quiz21 = subcat3.quizzes.create(category_id: 5,status:"published", title: "Тест на знання історії незалежності України", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
# question21_1 = quiz21.questions.create(title: "Скільки гравців в команді?", description: "Згідно правил на полі знаходиться 11 гравців однієї команди")
# question21_1.answers.create(title: "11", correct: true)
# question21_1.answers.create( title: "12", correct: false)
# question21_1.answers.create( title: "5", correct: false)
# question21_2 = quiz21.questions.create(title: "Скільки триває один тайм?", description: "Один тайм матчу триває 45 хв. не враховуючи додаткового часу")
# question21_2.answers.create( title: "20хв", correct: false)
# question21_2.answers.create( title: "45хв", correct: true)
# question21_2.answers.create( title: "до останнього гравця", correct: false)
# question21_3 = quiz21.questions.create(title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "Це є порушенням правил, після того як гравець торкнувся мяча рукою гра зупиняється, та назначається штрафний")
# question21_3.answers.create( title: "Порушенння правил", correct: true)
# question21_3.answers.create( title: "Штрафний удар", correct: true)
# question21_3.answers.create( title: "Дадуть пиріжок", correct: false)
# question21_3.answers.create(title: "Дадуть в голову", correct: false)
# quiz21.tags << tag30
# quiz21.tags << tag5
# quiz21.tags << tag4
# quiz21.tags << tag31
# quiz21.update(user: valera)

# quiz22 = subcat3.quizzes.create(category_id: 5,status:"published", title: "Тест на знання історії президентів України", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
# question22_1 = quiz22.questions.create(title: "Скільки гравців в команді?", description: "Згідно правил на полі знаходиться 11 гравців однієї команди")
# question22_1.answers.create(title: "11", correct: true)
# question22_1.answers.create( title: "12", correct: false)
# question22_1.answers.create( title: "5", correct: false)
# question22_2 = quiz22.questions.create(title: "Скільки триває один тайм?", description: "Один тайм матчу триває 45 хв. не враховуючи додаткового часу")
# question22_2.answers.create( title: "20хв", correct: false)
# question22_2.answers.create( title: "45хв", correct: true)
# question22_2.answers.create( title: "до останнього гравця", correct: false)
# question22_3 = quiz22.questions.create(title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "Це є порушенням правил, після того як гравець торкнувся мяча рукою гра зупиняється, та назначається штрафний")
# question22_3.answers.create( title: "Порушенння правил", correct: true)
# question22_3.answers.create( title: "Штрафний удар", correct: true)
# question22_3.answers.create( title: "Дадуть пиріжок", correct: false)
# question22_3.answers.create(title: "Дадуть в голову", correct: false)
# quiz22.tags << tag28
# quiz22.tags << tag5
# quiz22.tags << tag4
# quiz22.update(user: valera)

# quiz23 = subcat3.quizzes.create(category_id: 5,status:"published", title: "Тест на знання історії голодомору в Україні", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
# question23_1 = quiz23.questions.create(title: "Скільки гравців в команді?", description: "Згідно правил на полі знаходиться 11 гравців однієї команди")
# question23_1.answers.create(title: "11", correct: true)
# question23_1.answers.create( title: "12", correct: false)
# question23_1.answers.create( title: "5", correct: false)
# question23_2 = quiz23.questions.create(title: "Скільки триває один тайм?", description: "Один тайм матчу триває 45 хв. не враховуючи додаткового часу")
# question23_2.answers.create( title: "20хв", correct: false)
# question23_2.answers.create( title: "45хв", correct: true)
# question23_2.answers.create( title: "до останнього гравця", correct: false)
# question23_3 = quiz23.questions.create(title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "Це є порушенням правил, після того як гравець торкнувся мяча рукою гра зупиняється, та назначається штрафний")
# question23_3.answers.create( title: "Порушенння правил", correct: true)
# question23_3.answers.create( title: "Штрафний удар", correct: true)
# question23_3.answers.create( title: "Дадуть пиріжок", correct: false)
# question23_3.answers.create(title: "Дадуть в голову", correct: false)
# quiz23.tags << tag12
# quiz23.tags << tag5
# quiz23.tags << tag13
# quiz23.update(user: valera)

# quiz24 = subcat3.quizzes.create(category_id: 5,status:"published", title: "Тест на знання історії України у складі СРСР", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
# question24_1 = quiz24.questions.create(title: "Скільки гравців в команді?", description: "Згідно правил на полі знаходиться 11 гравців однієї команди")
# question24_1.answers.create(title: "11", correct: true)
# question24_1.answers.create( title: "12", correct: false)
# question24_1.answers.create( title: "5", correct: false)
# question24_2 = quiz24.questions.create(title: "Скільки триває один тайм?", description: "Один тайм матчу триває 45 хв. не враховуючи додаткового часу")
# question24_2.answers.create( title: "20хв", correct: false)
# question24_2.answers.create( title: "45хв", correct: true)
# question24_2.answers.create( title: "до останнього гравця", correct: false)
# question24_3 = quiz24.questions.create(title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "Це є порушенням правил, після того як гравець торкнувся мяча рукою гра зупиняється, та назначається штрафний")
# question24_3.answers.create( title: "Порушенння правил", correct: true)
# question24_3.answers.create( title: "Штрафний удар", correct: true)
# question24_3.answers.create( title: "Дадуть пиріжок", correct: false)
# question24_3.answers.create(title: "Дадуть в голову", correct: false)
# quiz24.tags << tag12
# quiz24.tags << tag5
# quiz24.tags << tag11
# quiz24.update(user: valera)

# quiz25 = subcat3.quizzes.create(category_id: 5,status:"published", title: "Тест на знання історії України у в час 2 світової війни", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.")
# question25_1 = quiz25.questions.create(title: "Скільки гравців в команді?", description: "Згідно правил на полі знаходиться 11 гравців однієї команди")
# question25_1.answers.create(title: "11", correct: true)
# question25_1.answers.create( title: "12", correct: false)
# question25_1.answers.create( title: "5", correct: false)
# question25_2 = quiz25.questions.create(title: "Скільки триває один тайм?", description: "Один тайм матчу триває 45 хв. не враховуючи додаткового часу")
# question25_2.answers.create( title: "20хв", correct: false)
# question25_2.answers.create( title: "45хв", correct: true)
# question25_2.answers.create( title: "до останнього гравця", correct: false)
# question25_3 = quiz25.questions.create(title: "Що відбудеться, коли гравець торкнеться м’яча рукою?", description: "Це є порушенням правил, після того як гравець торкнувся мяча рукою гра зупиняється, та назначається штрафний")
# question25_3.answers.create( title: "Порушенння правил", correct: true)
# question25_3.answers.create( title: "Штрафний удар", correct: true)
# question25_3.answers.create( title: "Дадуть пиріжок", correct: false)
# question25_3.answers.create(title: "Дадуть в голову", correct: false)
# quiz25.tags << tag5
# quiz25.tags << tag14
# quiz25.update(user: valera)

Faq.create(faq_question: "Як створити свій тест?", faq_answer: "Для цього потрібно зареєструватись")
Faq.create(faq_question: "Де можна знайти інформацію про сайт?", faq_answer: "В нижньому меню, яке називається Про Нас")
Faq.create(faq_question: "За якою шкалою оцінюється пройдений тест?", faq_answer: "100% - всі відповіді вірні, 67% - 2 відповіді з 3 правильні, 33% - 1 лише відповідь првильна, 0% - всі відповіді не правильні")
Faq.create(faq_question: "Де можна знайти тест на знання правил хокею?", faq_answer: "В підкатегорії Хокей, яка знаходиться в категорії Спорт")
Faq.create(faq_question: "Чи можна для пошук вибрати якусь конкретну підкатегорію?", faq_answer: "Так, звичайно.")

# Contact.create(id: 1, role: "Адміністратор", phone: "+38 032 244-44-44", mail: "someone@somemail.com", address:"79000, Fedkovycha Str. 60A, building 1")
# Contact.create(id: 2, role: "Модератор", phone: "+38 032 244-44-44", mail: "someone@somemail.com", address:"79000, Fedkovycha Str. 60A, building 1")
# Contact.create(id: 3, role: "Ще хтось", phone: "+38 032 244-44-44", mail: "someone@somemail.com", address:"79000, Fedkovycha Str. 60A, building 1")
Contact.create(id: 3, role: "Крайова булава УПЮ", phone: "...", mail: "upu(sobaka)plast.org.ua", address:"...")
about ='<p>&#10;Пласт – українська скаутська організація. <a href="http://www.plast.org.ua/about/goal/">Метою Пласту</a> є сприяти всебічному, патріотичному вихованню та самовихованню української молоді на засадах християнської моралі. Будучи неполітичною і позаконфесійною організацією, Пласт виховує молодь на свідомих, відповідальних і повновартісних громадян місцевої, національної та світової спільноти, провідників суспільства.&#10;</p><p>&#10;Пласт <a href="http://www.plast.org.ua/history/">був створений</a> у 1911 році, невдовзі після заснування скаутського руху Робертом Бейден-Пауелом в 1907 р., а вже 12 квітня 1912 року у Львові пластуни склали першу Пластову присягу. Серед засновників організації були д-р. Олександр Тисовський, Петро Франко (син Івана Франка) та Іван Чмола. В основі назви &#34;Пласт&#34; лежить відповідник англійського Scout (розвідник), взятий за прикладом пластунів - козаків-розвідників.&#10;</p><div style="float: right;">&#10;<img alt="Герб Пласту - тризуб, переплетений із трилистою лілеєю" src="http://www.plast.org.ua/images/site/lelia.gif" height="180" vspace="5" width="142"/><br/>&#10;<div style="text-align: center;">&#10;<span>Герб Пласту</span>&#10;</div>&#10;</div><p>&#10;<a href="http://www.plast.org.ua/about/ideology/emblem/">Гербом Пласту</a> є трилиста квітка лілії - символ скаутського руху (відомий як Fleur-de-lis) - та тризуб, сплетені в одну гармонійну цілісність.&#10;</p><p>&#10;Для досягнення виховних цілей Пласт застосовує <a href="http://www.plast.org.ua/about/method/method/">власну унікальну методу виховання</a>, основні принципи якої полягають у добровільності членства в організації, вихованні і навчанні через гру та працю, поступовій програмі занять і випробувань, гуртковій системі самоорганізації, заохоченні ініціативи і самоврядування, пізнанні природи і житті серед природи, підтримці спеціальних зацікавлень і здібностей дітей та молоді.&#10;</p><p>&#10;На відміну від більшості скаутських організацій світу, де членство завершується із досягненням 25-ліття, членство в Пласті є пожиттєвим. Умовний віковий поділ передбачає <a href="http://www.plast.org.ua/about/method/agegroups/">4 вікові категорії</a>: новаки (6-12 років), юнаки (12-18 років), старші пластуни (18-35 років) та пластуні-сеніори (від 35 років). Виховна та адміністративна праця в Пласті здійснюється старшими пластунами та пластунами-сеніорами виключно на волонтерських засадах.&#10;</p><p>&#10;Пласт в Україні об\'єднує близько 6 тисяч членів різного віку і таким чином є найбільшою скаутською організацією України. На сьогодні 121 осередок Пласту діє у 22 областях України, Автономній республіці Крим, Києві і Севастополі. Пласт активно співпрацює з органами державної влади та громадськими організаціями, реалізуючи різноманітні соціальні та виховні програми.&#10;</p><p>&#10;Протягом року Пласт в Україні проводить понад 100 виховних таборів різної спеціалізації: спортивні, морські, з повітроплавання, мистецькі, лижні, альпіністичні, археологічні, кінні, екологічні тощо. У таборах пластуни практично закріплюють знання і уміння, здобуті впродовж року на щотижневих заняттях. Серед найбільших заходів, котрі щороку проводяться Пластом на всеукраїнському рівні - інтелектуально-мистецький змаг Орликіада, фестиваль творчості День пластуна, спортивний змаг Спартакіада, <a href="http://www.vvm.plast.org.ua">передача Вифлеємського вогню</a> місцевим громадам, змагання з пішого мандрівництва &#34;Стежками героїв&#34; та &#34;Осінній рейд&#34;. На місцевому рівні осередками Пласту постійно реалізується безліч акцій соціально-культурного та виховного спрямування.&#10;</p><p>&#10;Окрім України, Пласт офіційно існує у восьми країнах світу: Австралії, Аргентині, Великобританії, Канаді, Німеччині, Польщі, Словаччині та США. Пластові організації із усіх дев\'яти країн об\'єднані в <a href="http://www.plastscouting.org/">Конференцію українських пластових організацій</a>, на чолі світового пластового руху стоїть <a href="http://www.plast.org.ua/history/nachalni/info/">Начальний пластун</a>.&#10;</p>' 
Staticinfo.create(id: 1,about_us: about)

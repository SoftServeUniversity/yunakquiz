Feature: If I've already chosen a category and its subcategory, 
         I'll have had an opportunity to choose test and pass it.
 
    Scenario:
	Given have a test with three questions and each of them has three possible answers
	When choose the answer
	Then it turns green

    Scenario:

	Given there is a green button under the questions "Пройти тест"
	When all answers are chosen
	And the button is onclicked
	Then there will be a result of the test evaluated in 100 points
	And correct answers will be green
	And wrong answers will be red
	And under the answers is a green button to pass the test again
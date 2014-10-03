Yunak Quiz Application
======
*Group Lv_124*

## Setup
* Clone the project ``` git clone git@github.com:SoftServeUniversity/yunakquiz.git ```

### Data provider back-end service:
* Go to ``` source/data-service/ ```
* ``` bundle install ``` to resolve dependencies
* ``` rackup ``` to run the server
* Check out [http://localhost:9292](http://localhost:9292)

### Angular app client side app:
* Go to ``` source/ang-app/ ```
* ``` npm start ``` to start the Node.js server
* ``` npm test ``` to run Karma unit tests (you can leave it open to track in real time)
* ``` npm run update-webdriver ```
* You need Java to run protractor
* To install Java run ``` sudo apt-get update ``` then ``` sudo apt-get install default-jre ``` and ``` sudo apt-get install default-jdk ```
* ``` npm run protractor ``` to run cucumber end-to-end tests

### Cucumber 
* Put your ``` *.feature ``` files to ``` source/ang-app/e2e-tests/features/ ```
* And your ``` *.js ``` steps files to ``` source/ang-app/e2e-tests/features/step_definitions/ ```


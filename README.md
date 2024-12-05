Setup:

- clone repository

- run command: "npm install" to install dependencies

- There is a file untracked by git called "credentials.json". You will need to create this file at the top level of the directory. The format of this file will be:

{

  "username" : <siteUsername> //can be found in the assessment doc
  
  "password" : <sitePassword> //can be found in the assessment doc
  
}

- run command: "npx playwright test" to run the tests

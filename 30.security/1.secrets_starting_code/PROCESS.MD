# Workflow process for section 35 of The Complete 2023 Web Development Bootcamp
Initial files had nothing but /public, /views and single empty entry point file app.js

## Initial setup:
1) npm init to initialise project
2) edit package.json to add following: "type" : "module", 
"dependencies" : {"body-parser": "^1.20.2", "ejs": "^3.1.9", "express": "^4.18.2", "pg": "^8.11.3"} 
- ***note:*** body-parser can be omitted as integrated into express itself
3) npm install to install all packages and their dependencies
4) attach .gitignore, templates are available here: https://github.com/github/gitignore
5) edit app.js and add boilerplate
6) in app.js add GET "/" routing and render home.ejs
7) run server with command node app.js, verify in browser at url: localhost:port
8) you should be welcomed with a website. From here you progress the job

## Workflow milestones:
- [x] Create this file 00:20
- [x] Understand assignment 00:40
- [x] Create functional diagram 01:30
- [x] DB setup 01:55
- [x] Code 21:30
- [x] Test 21:35
- [x] Document 22:05
- [x] Deliver 22:10

## Outcomes:
This was a very difficult task. Due to completely missing course content for this assignment (outdated/not related to used database)
During programming this app, I had to research resources to learn from, often going in depth with concepts of sessions and how are sessions handled, cookies, cryptography storage for session data, environmental variables. In total 80% of time spend was research and learning, 20% actual programming. I feel enormously proud that I was able to tackle this problem on my own. 

## Credits:
Special thanks to Zach Gollwitzer and his course on User Authentication in Web Apps, which provided some direction and explanation.

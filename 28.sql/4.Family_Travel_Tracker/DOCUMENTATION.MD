# Family Travel Tracker - project notes.

## Pointers:

### index.ejs
Require following on render:
- **users** - array of user objects with keys: .id; .color; .name
- **error** - string; if missing falls back on literal
- **total** - number
- **countries** - string of country_codes separated by ","
- **color** - color of currently selected user (passed separately to users[].color)?

Uses following client-side scripts:
- splits **countries** into array, for each ***element***, assign style.fill = **color** to SVG <path> element with corresponding id === ***element***

### new.ejs
None


### index.js
- GET / endpoint call function **checkVisited**, returning array of visited countries country_codes. Renders index.ejs passing **countries**, **countries**.length, local array **users**, **color** of static value.

- POST /add endpoint add new country to selected user

- POST /user endpoint select between users, adds new user through new.ejs

- POST /new endpoint add new user to DB, is called from rendered new.ejs

## Solution:

### index.ejs
- no changes

### new.ejs
- no changes

### index.js
- removed **checkVisited**, using **queryList** object holding all queries, those are passed to db.query() as argument when needed.
- all POST requests redirect to /, with exception of add new user which renders **new.ejs** fist.
- heavy reliance on global states **error** and **selectedUser**

## Need fixing:
- whole **error** system need fixing
- need testing for edge cases

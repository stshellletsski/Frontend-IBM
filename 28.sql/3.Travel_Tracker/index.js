//////////////////////////////////////////////////////////
// Need more work. Revised: 13/12/2023
//////////////////////////////////////
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const dbConfig = {
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "****",
  port: 5432
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const response = await dbQuery(queryList(1));
  const message = 'Enter country name';
  const visited_countries = response.rows.map((x) => {return x.country_code});
  renderMsg(res, message, visited_countries)
});

// Add new country to the visited_countries and render
app.post("/add", async (req, res) => {
  const country = req.body.country;
  // Check if requested country exist
  const result = await dbQuery(queryList(2, null, country));
  if (result.rows.length != 1) {
    // 0 or more than 1 Countries found, try again
      const countriesFound = result.rows.map(
        (x) => {return x.country_name}).toString();
      const message = (result.rows.length) ?
        `Found ${result.rows.length} countries. Specify: ${countriesFound}` :
        `Found ${result.rows.length} countries.`;
    
      const response = await dbQuery(queryList(1));
      const visited_countries = response.rows.map((x) => {return x.country_code});
      renderMsg(res, message, visited_countries);
  } else {
    // Insert into table new visited country
    await dbQuery(queryList(3, result));
    res.redirect("/");
  } 
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

/////////////////////////////////////////////////////////////////
///////////////////////////// NOTE: /////////////////////////////
// db.query() accepts "query $1, $2", [arg$1, arg$2] as template


//////////////////////////////////////////////////////////
// Query list:
// -----------
// 1) visited - Returns array of 0+ visited country codes.
// 2) doesExist - Returns array of 0+ countries and codes.
// 3) addCountry - Adds visited country to the table.
/////////////////////////////////////////////////////
function queryList (x, result=null, country=null) {
  let query;
  switch(x) {
    case 1:
      query = "SELECT country_code FROM visited_countries";
      break;
    case 2:
      query = `select country_code, country_name
      from country_codes
      where country_name like '%${country}%'
      ;`;
      break;
    case 3:
      query = `Insert into visited_countries (country_code)
      values ('${result.rows[0].country_code}');`;
      break;
    default:
      // code block
  } 
  return query;
}

////////////////////////////////////////////////////////
// Render with a message.
/////////////////////////
function renderMsg (res, message, visited_countries) {
  res.render("index.ejs", {
    error: message,
    countries : visited_countries, 
    total: visited_countries.length 
  });
}

/////////////////////////////////////////////
// Connect to Postgres, query, disconnect.
// Accepts query from queryList.
// Returns error or response. 
/////////////////////////////
async function dbQuery (query) {
  let response;
  let error;
  const db = new pg.Client(dbConfig);
  try {
    await db.connect();
    console.log("Client has connected");
    response = await db.query(query);
    /* console.log(response.rows); */
  } catch (err) {
    error = err;
    console.error(JSON.stringify(err));
  } finally {
    await db.end();
    console.log("Client has disconnected");
  }
  return error || response;
}
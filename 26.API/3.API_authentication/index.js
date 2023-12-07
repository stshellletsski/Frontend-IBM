import express from "express";
import axios from "axios";

const app = express();
const port = 3002;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "randUser1";
const yourPassword = "randPassword1";
const yourAPIKey = "2f3e18fc-510a-4f6e-b734-5c7511926c91";
const yourBearerToken = "a153cc0d-8db9-4599-a593-dac512e07224";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

//DONE:
app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "random");
    console.log(response.data);
    res.render("index.ejs", { content : JSON.stringify(response.data) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", { content : error.message });
  }

  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});


// DONE:
app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "all?page=3", { auth: {username:yourUsername, password:yourPassword}});
    res.render("index.ejs", { content : JSON.stringify(response.data) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", { content : error.message });
  }

  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

// DONE:
app.get("/apiKey", async (req, res) => {
  try {
    //https://secrets-api.appbrewery.com/filter?score=5&apiKey=b886c845-9989-43aa-8c60-ea4a669bb587
    const response = await axios.get(API_URL + `filter?score=3&apiKey=${yourAPIKey}`);
    res.render("index.ejs", { content : JSON.stringify(response.data) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", { content : error.message });
  }

  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarrassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

// DONE:
app.get("/bearerToken", async (req, res) => {
  const secretId = 42;
  try {
    const response = await axios.get(API_URL + `secrets/${secretId}`, { headers: {Authorization: `Bearer ${yourBearerToken}`}});
    res.render("index.ejs", { content : JSON.stringify(response.data) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", { content : error.message });
  }

  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

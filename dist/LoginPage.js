

async function makePostRequest(data) {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      console.log(responseData);
      if (responseData != null) {
        window.location.href = "home.html";
      } else {
        console.log("Username and/or password incorrect")
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  }
  
  const postData = { key: 'value' }; // Replace with your data
  
  

document.getElementById('loginButton').addEventListener('click', function() {
  console.log("alligator")
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  makePostRequest({
    "username": username,
    "password": password
})
});

//Browser can cache data which is stopping it from updating, the "-c-1" in the package.json prevents the browser from caching



console.log("hello!");
// let host = "http://localhost:8080";


// window.location.href = 'home.html';
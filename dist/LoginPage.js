

async function makePostRequest(data) {
    try {
      const response = await fetch("ljksdflksjdfklsdajfklsjfl;ksadjf;kldj", {
        method: 'POST',
        body: JSON.stringify(data), // Convert data to JSON format
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  const postData = { key: 'value' }; // Replace with your data
  
  

document.getElementById('loginButton').addEventListener('click', function() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    makePostRequest({
        "username": username,
        "password": password
    })
});

console.log("hello!");
// let host = "http://localhost:8080";


// window.location.href = 'home.html';
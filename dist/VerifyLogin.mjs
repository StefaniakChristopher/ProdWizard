const host = "http://localhost:8080"

const verifyCookies = () => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === "sessionID") {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

const verifySessionID = async () => {
    const sessionID = verifyCookies()
    const url = host + '/session'; // Replace with your API endpoint

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(sessionID),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const user = await response.json(); // Assuming the response is JSON data

        // Process the data returned from the GET request
        console.log(user);

        return user
    } catch (error) {
        console.error('Error:', error);
    }
}

const userLogin = async (loginCredentials) => {
    const url = host + "/login"
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(loginCredentials),
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const sessionID = await response.text();
      console.log(sessionID);
      if (sessionID == "FAILED") {
        console.log("Username and/or password incorrect")
      } else {
        const expires = new Date(); 
        expires.setTime(expires.getTime() + 60 * 60 * 1000);
        document.cookie = `sessionID=${sessionID}; expires=${expires.toUTCString()}; path=/`;
        window.location.href = "home.html";
        
      }
      
      
    } catch (error) {
      console.error('Error: ', error);
    }
  }

export { verifyCookies, verifySessionID, userLogin }
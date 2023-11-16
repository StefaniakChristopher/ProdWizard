const host = "http://localhost:8080"

const retrieveCookies = () => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === "sessionID") {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

const deleteSessionIDCookie = () => {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === "sessionID") {
          // Expire the cookie by setting its expiration date to the past
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          console.log("SessionID cookie deleted.");
          return; // No need to continue checking other cookies
      }
  }
  console.log("SessionID cookie not found.");
};


const verifySessionID = async () => {
    const sessionID = retrieveCookies()
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
        window.location.href = "../HomePage/home.html";
        
      }
      
      
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  const createUser = async (userCredentials) => {
    const url = host + "/newuser"
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(userCredentials),
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.text()
      return result
      
      
    } catch (error) {
      console.error('Error: ', error);
    }

  }

  const signOut = async () => {
    const sessionIDtoRemove = retrieveCookies()
    const url = host + "/signout"
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(sessionIDtoRemove),
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

    deleteSessionIDCookie()
  
      const result = await response.text()
      return result
      
      
    } catch (error) {
      console.error('Error: ', error);
    }

  }

  const createTask = async (task) => {
    const originOfRequestSessionID = retrieveCookies()
    task.originOfRequestSessionID = originOfRequestSessionID
    const url = host + "/createTask"
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.text()
      return result
      
      
    } catch (error) {
      console.error('Error: ', error);
    }

  }

export { retrieveCookies, verifySessionID, userLogin, createUser, signOut, createTask }
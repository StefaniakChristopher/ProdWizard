const host = "http://prodwizard.com"

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
        alert("Username and/or password incorrect")
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
      if(!result) {
        alert("User Already Exists")
      }
      
      
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

      getCurrentTasks()
  
      const result = await response.text()
      return result
      
      
    } catch (error) {
      console.error('Error: ', error);
    }

  }

  const getCurrentTasks = async () => {
    const url = host + "/retrieveTasks"
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.text()
      console.log("this is the list in json:" + result)
      const currentTasksArray = JSON.parse(result)
      return currentTasksArray
      
      
    } catch (error) {
      console.error('Error: ', error);
    }

  }

  const completeTask = async (taskIDandVolume) => {
    console.log('elephante')
    const { id } = taskIDandVolume  //function being double sent for some reason, has to do with the rerender
    const url = host + "/completeTask/" + id
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(taskIDandVolume),
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.text()
      console.log(result)
      if (result) {
        return true
      }
      
    } catch (error) {
      console.error('Error: ', error);
    }

  }

  const createTaskCategory = async (taskCategoryName) => {
    const url = host + "/createTaskCategory"
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(taskCategoryName),
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      
    } catch (error) {
      console.error('Error: ', error);
    }

  }

  const retrieveTaskCategories = async () => {
    const url = host + "/retrieveTaskCategories"
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const taskCategories = await response.text()
      console.log("this is the list in json:" + taskCategories)
      const taskCategoriesArray = JSON.parse(taskCategories)
      return taskCategoriesArray
      
    } catch (error) {
      console.error('Error: ', error);
    }

  }

  const retrieveCurrentUserTasks = async () => {
    const currentUserSessionID = retrieveCookies()
    const url = host + "/retrieveCurrentUserTasks"
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(currentUserSessionID),
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const currentUserTasks = await response.text()
      const currentUserTasksArray = JSON.parse(currentUserTasks)
      return currentUserTasksArray
      
    } catch (error) {
      console.error('Error: ', error);
    }

  }

  

  const retrieveCompletedUserTasks = async () => {
    const currentUserSessionID = retrieveCookies()
    const url = host + "/retrieveCompletedTasks"
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(currentUserSessionID),
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const completedUserTasks = await response.text()
      const completedUserTasksArray = JSON.parse(completedUserTasks)
      return completedUserTasksArray
      
    } catch (error) {
      console.error('Error: ', error);
    }

  }

  const retrieveUserStatsByUsername = async (username) => {
    const url = host + "/retrieveSearchedUser"
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(username),
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const userStats = await response.json()
      return userStats
      
    } catch (error) {
      console.error('Error: ', error);
    }

  }

  
  
  const retrievePlacement = async (taskCategoryAndUsername) => {
    const url = host + "/retrievePlacement"
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(taskCategoryAndUsername),
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const placement = await response.text()
      console.log(placement)
      return placement
      
    } catch (error) {
      console.error('Error: ', error);
    }

  }

  const produceLeaderboard = async (taskCategory) => {
    const url = host + "/produceLeaderboard"
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(taskCategory),
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const leaderboard = await response.text()
      const parsedLeaderboard = JSON.parse(leaderboard)
      return parsedLeaderboard
      
    } catch (error) {
      console.error('Error: ', error);
    }

  }

export { retrieveCookies, verifySessionID, userLogin, createUser, signOut, createTask, getCurrentTasks, completeTask, createTaskCategory, retrieveTaskCategories, retrieveCurrentUserTasks, retrieveCompletedUserTasks, retrieveUserStatsByUsername, retrievePlacement, produceLeaderboard }
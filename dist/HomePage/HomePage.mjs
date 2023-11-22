import { verifySessionID, createUser, signOut, createTask, getCurrentTasks, completeTask, createTaskCategory, retrieveTaskCategories, retrieveCurrentUserTasks, retrieveCompletedUserTasks, retrieveUserStatsByUsername, retrievePlacement, produceLeaderboard } from "../VerifyLogin.mjs";

const { sessionID, username } = await verifySessionID()

if (sessionID === "none") {
  console.log("penguin")
  window.location.href = "../LoginPage/index.html"
}
if (username === "admin") {
  let adminOnlyButtons = document.getElementsByClassName('adminOnlyButton');
  Array.from(adminOnlyButtons).forEach((button) => {
    button.style.display = 'block'; 
});
}
if (username) {
  let signedInUserDisplay = document.getElementById('welcome-name-placeholder');
  signedInUserDisplay.textContent = username
}


const mainContent = document.querySelector('.main-content');
const modals = document.querySelector('.modals')

const displayLeaderboard = async (leaderboard, taskName) => {
 
  mainContent.innerHTML = ''
  const header = document.createElement('h2')
  header.innerText = `Leaderboard for ${taskName}`
  header.style.fontSize = '2rem'
  mainContent.appendChild(header)
  
  leaderboard.forEach(async user => {
    const userBox = document.createElement('div');
    userBox.className = 'box';

    userBox.innerHTML = `
              <div class ="topOfBox">
                <h2>${user.username}</h2>
                <p class="boxElement" id="expectedTimeCompletionDisplay">Placement: ${user.placementValue}</p>
                <p class="boxElement" id="teamDisplay">Avg Rate: ${user.mean} parts/min</p>
              </div>
      `

    mainContent.appendChild(userBox);
  })
}

const submitTaskFunction = async (Event) => {
          
  const completeTaskButton = Event.target
  console.log(completeTaskButton)
  const taskID = completeTaskButton.getAttribute('task-info');
  const volume = document.getElementById("volume-" + taskID).value

  console.log('Task Name:', taskID);
  const completedTaskSent = await completeTask({
    "id": taskID,
    "volume": volume
  })
  
  if(completedTaskSent) {
    const newTaskList = await getCurrentTasks()
    displayTasks(newTaskList)
  }
  
}

const displayTasks = async (taskList) => {
  
  console.log("displaytasks is running")
  try {
    mainContent.innerHTML = ''
    const header = document.createElement('h2')
    header.innerText = taskListName
    header.style.fontSize = '2rem'
    mainContent.appendChild(header)

    


    if(taskList.length == 0) {
      const newBox = document.createElement('div');
      newBox.className = 'box';
    
      // Set content for the new box (you can modify this part)
      newBox.innerHTML = `
              <div class ="topOfBox">
                <h2>No Tasks to Display, everything done</h2>
              </div>
      `;
      // Append the new box to the main content
      mainContent.appendChild(newBox);
    } else {
      taskList.forEach(async task => {
        
        const newBox = document.createElement('div');
        newBox.className = 'box';
        newBox.id = `taskBox-${task.id}`
        
        if (task.avgRate == 0) {
          task.avgRate = "N/A"
        }
  
       
        newBox.innerHTML = `
            <div class ="topOfBox">
              <h2>${task.taskName}</h2>
              <p class="boxElement" id="expectedTimeCompletionDisplay">Avg Rate for ${task.taskOwner}: ${task.avgRate} parts/min</p>
              <p class="boxElement" id="teamDisplay">Team: ${task.team}</p>
              <p class="boxElement" id="teamDisplay">Task Owner: ${task.taskOwner}</p>
            </div>
            <div class="bottomOfBox">
              <p id="taskDescriptionArea">${task.taskDescription}</p>
            </div>
            <div class="completeTaskButtonStyling">
              <button task-info=${task.id} id="task-${task.id}"class="task-${task.id}">Complete</button>
            </div>
    `;
  
        // Append the new box to the main content
        mainContent.appendChild(newBox);
        const currentLoggedInUser = await verifySessionID()
        if (task.taskOwner != currentLoggedInUser.username) {
          const taskSubmitButton = document.getElementById(`task-${task.id}`)
          taskSubmitButton.style.display = 'none'
        }
        const newModal = document.createElement('div');
        newModal.className = 'modal'
        newModal.id = `enterVolumeModal${task.id}`
  
        newModal.innerHTML = `
          <span class="close-button" id="enterVolume-close-button${task.id}">&times;</span>
          <label for="volume">Volume:</label>
          <input class="generalInput" type="text" id="volume-${task.id}" required></input>
          <button class="submitTaskButtons" task-info="${task.id}" id="submit-task-${task.id}">Submit Task</button>
        `
        modals.appendChild(newModal);
        modalCloser(`enterVolume-close-button${task.id}`, newModal.id)
        modalCloser(`submit-task-${task.id}`, newModal.id)
        modalOpener('task-' + task.id , newModal.id)

        

       
        
        
        const submitTaskButton = document.getElementById(`submit-task-${task.id}`)
        
        submitTaskButton.removeEventListener('click', submitTaskFunction);
        submitTaskButton.addEventListener('click', submitTaskFunction);
        
          
        
       
        
        
        
        
      });
    }
    
  } catch (error) {
    console.log("Error: " + error)
  }


}

const displayCompletedTasks = async (taskList) => {
  

  console.log("displayCompletedTasks is running")
  try {
    mainContent.innerHTML = ''
    const header = document.createElement('h2')
    header.innerText = taskListName
    header.style.fontSize = '2rem'
    mainContent.appendChild(header)

    


    if(taskList.length == 0) {
      const newBox = document.createElement('div');
      newBox.className = 'box';
    
      // Set content for the new box (you can modify this part)
      newBox.innerHTML = `
              <div class ="topOfBox">
                <h2>No Tasks to Display, everything done</h2>
              </div>
      `;
      // Append the new box to the main content
      mainContent.appendChild(newBox);
    } else {
      taskList.forEach(async task => {

        
        
        const newBox = document.createElement('div');
        newBox.className = 'box';
        newBox.id = `taskBox-${task.id}`
        
        if (task.avgRate == 0) {
          task.avgRate = "N/A"
        }
  
       
        newBox.innerHTML = `
            <div class ="topOfBox">
              <h2>${task.taskName}</h2>
              <p class="boxElement" id="expectedTimeCompletionDisplay">Rate: ${task.rate} parts/min</p>
              <p class="boxElement" id="teamDisplay">Volume: ${task.volume}</p>
              <p class="boxElement" id="teamDisplay">Task Owner: ${task.taskCompleter}</p>
            </div>
            <div class="bottomOfBox">
              <p id="taskDescriptionArea">${task.taskDescriptionString}</p>
            </div>
    `;
  
        // Append the new box to the main content
        mainContent.appendChild(newBox);
      });
    }
    
  } catch (error) {
    console.log("Error: " + error)
  }


}



const newOption = (optionName, targetOption) => {
  const dropDownMenuItself = document.getElementById(targetOption)
  const newOption = document.createElement('option');
  newOption.value = optionName
  newOption.textContent = optionName

  dropDownMenuItself.appendChild(newOption);
}

const dropDownMenuAvailableTasks = async (taskCategoryList, targetOption) => {
  console.log(taskCategoryList)
  try {
    const dropDownMenuItself = document.getElementById(targetOption)
    dropDownMenuItself.innerHTML = "";
    if(taskCategoryList.length != 0) {

      taskCategoryList.forEach(taskCategory => {
        newOption(taskCategory, targetOption)
    } )

  } else {
      newOption("No Tasks Avaiable", targetOption)
  }
    
  } catch (error) {
    console.log("Error: " + error)
  }


}






console.log("dog")

const modalOpener = (button, modalType) => {
  document.getElementById(button).addEventListener('click', () => {
    document.getElementById(modalType).style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    // Set opacity to 1 after a short delay
    setTimeout(() => {
      document.getElementById(modalType).style.opacity = '1';
      document.getElementById('overlay').style.opacity = '1';
    }, 10);
  })
}


const modalCloser = (button, modalType) => {
  document.getElementById(button).addEventListener('click', () => {
    document.getElementById(modalType).style.opacity = '0';
    document.getElementById('overlay').style.opacity = '0';

    setTimeout(() => {
      document.getElementById(modalType).style.display = 'none';
      document.getElementById('overlay').style.display = 'none';
    }, 300);
  })
}

var taskListName = 'Current Tasks'
const currentTasks = await getCurrentTasks()
displayTasks(currentTasks)


document.getElementById('create-task-button').addEventListener('click', async () => {
  dropDownMenuAvailableTasks(await retrieveTaskCategories(),'taskName' )
})

document.getElementById('leaderboard-lookup').addEventListener('click', async () => {
  dropDownMenuAvailableTasks(await retrieveTaskCategories(),'leaderboard-task-selection')
})




modalCloser('close-button', 'createUserModal')
modalOpener('create-user', 'createUserModal')

modalCloser('task-close-button', 'createTaskModal')
modalCloser('createTask', 'createTaskModal')
modalOpener('create-task-button', 'createTaskModal')

modalCloser('enterTaskCategory-close-button', 'enterTaskCategoryModal')
modalOpener('create-task-category-button', 'enterTaskCategoryModal')

modalCloser('leaderboardModal-close-button', 'leaderboardModal')
modalCloser('leaderboardModalButton', 'leaderboardModal')
modalOpener('leaderboard-lookup', 'leaderboardModal')

document.getElementById('create-user-button').addEventListener('click', async () => {
  const username = document.getElementById("username").value
  const password = document.getElementById("password").value
  const team = document.getElementById("team").value
  const userCreated = await createUser({
    "username": username,
    "password": password,
    "team": team
  })
  console.log(userCreated)

  if (userCreated === "true") {
    console.log("bark")
  } else {
    console.log("wolf")  //add a message that pops up saying that the user alr exists
  }
})

document.getElementById('sign-out-button').addEventListener('click', async () => {
  signOut()
  window.location.href = "../LoginPage/index.html"
})



document.getElementById('createTask').addEventListener('click', async () => {
  const taskName = document.getElementById("taskName").value
  const taskDescription = document.getElementById("taskDescription").value
  const taskDetails = await createTask({
    "taskName": taskName,
    "taskDescription": taskDescription
  })
  
  const newCurrentTasks = await getCurrentTasks()
  displayTasks(newCurrentTasks)
  console.log(taskDetails)
})

document.getElementById('createTaskCategoryButton').addEventListener('click', async () => {
  const taskCategoryName = document.getElementById("taskCategory").value
  const response = await createTaskCategory(taskCategoryName)
  console.log(taskCategoryName)
})

document.getElementById('current-tasks-option').addEventListener('click', async () => {
  taskListName = 'Current Tasks'
  const newCurrentTasks = await getCurrentTasks()
  displayTasks(newCurrentTasks)
})

document.getElementById('my-tasks-option').addEventListener('click', async () => {
  taskListName = 'My Tasks'
  const newCurrentTasks = await retrieveCurrentUserTasks()
  displayTasks(newCurrentTasks)
})

document.getElementById('my-completed-tasks-option').addEventListener('click', async () => {
  taskListName = 'My Completed Tasks'
  const newCompletedTasks = await retrieveCompletedUserTasks()
  displayCompletedTasks(newCompletedTasks)
})

document.getElementById('leaderboardModalButton').addEventListener('click', async () => {
  const taskName = document.getElementById('leaderboard-task-selection').value
  const leaderboard = await produceLeaderboard(taskName)
  displayLeaderboard(leaderboard, taskName)
})









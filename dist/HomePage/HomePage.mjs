import { verifySessionID, createUser, signOut, createTask, getCurrentTasks, completeTask, createTaskCategory } from "../VerifyLogin.mjs";

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

const displayCurrentTasks = async (taskList) => {
  console.log(taskList)
  try {
    taskList.forEach(task => {
      const newBox = document.createElement('div');
      newBox.className = 'box';

      // Set content for the new box (you can modify this part)
      newBox.innerHTML = `
          <div class ="topOfBox">
            <h2>${task.taskName}</h2>
            <p class="boxElement" id="expectedTimeCompletionDisplay">Expected Completion Time: ${task.avgTimeToComplete} mins</p>
            <p class="boxElement" id="teamDisplay">Team: ${task.team}</p>
            <p class="boxElement" id="teamDisplay">Task Owner: ${task.taskOwner}</p>
          </div>
          <div class="bottomOfBox">
            <p id="taskDescriptionArea">${task.taskDescription}</p>
          </div>
          <div class="completeTaskButtonStyling">
            <button task-info=${task.id} id="completeTaskButton"class="completeTaskButton">Complete</button>
          </div>
  `;

      // Append the new box to the main content
      mainContent.appendChild(newBox);

      const completeTaskButton = newBox.querySelector('.completeTaskButton');
      document.getElementById('2ndCompleteTaskButton').addEventListener('click', function () {
        const volume = document.getElementById('2ndCompleteTaskButton').value
        const taskID = completeTaskButton.getAttribute('task-info');

        console.log('Task Name:', taskID);
        completeTask({
          "id": taskID,
          "volume": volume
        })
        newBox.remove();
      });
    });
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

const currentTasks = await getCurrentTasks()
if (currentTasks.length === 0) {
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
  displayCurrentTasks(currentTasks)
  modalCloser('enterVolume-close-button','enterVolumeModal')
  modalOpener('completeTaskButton','enterVolumeModal')
}



modalCloser('close-button', 'createUserModal')
modalOpener('create-user', 'createUserModal')

modalCloser('task-close-button', 'createTaskModal')
modalOpener('create-task-button', 'createTaskModal')

modalCloser('enterTaskCategory-close-button', 'enterTaskCategoryModal')
modalOpener('create-task-category-button', 'enterTaskCategoryModal')

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
  console.log(taskDetails)
})

document.getElementById('createTaskCategoryButton').addEventListener('click', async () => {
  const taskCategoryName = document.getElementById("taskCategory").value
  const response = await createTaskCategory(taskCategoryName)
  console.log(taskCategoryName)
})






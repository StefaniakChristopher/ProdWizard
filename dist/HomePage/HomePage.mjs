import { verifySessionID, createUser, signOut, createTask, getCurrentTasks, completeTask } from "../VerifyLogin.mjs";

const { sessionID } = await verifySessionID()

if (sessionID === "none") {
  console.log("penguin")
  window.location.href = "../LoginPage/index.html"
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
            <p class="boxElement" id="expectedTimeCompletionDisplay">Expected Completion Time: ${task.avgTimeToComplete}</p>
            <p class="boxElement" id="teamDisplay">Team: ${task.team}</p>
            <p class="boxElement" id="teamDisplay">Task Owner: ${task.taskOwner}</p>
          </div>
          <div class="bottomOfBox">
            <p id="taskDescriptionArea">${task.taskDescription}</p>
          </div>
          <div task-info=${task.id} class="completeTaskButton">
            <button class="completeTaskButton">Complete</button>
          </div>
  `;

      // Append the new box to the main content
      mainContent.appendChild(newBox);

      const completeTaskButton = newBox.querySelector('.completeTaskButton');
      completeTaskButton.addEventListener('click', function () {
        const taskID = this.getAttribute('task-info');
        console.log('Task Name:', taskID);
        completeTask(taskID)
        newBox.remove();
      });
    });
  } catch (error) {
    console.log("Error: " + error)
  }


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


modalCloser('close-button', 'createUserModal')
modalOpener('create-user', 'createUserModal')

modalCloser('task-close-button', 'createTaskModal')
modalOpener('create-task-button', 'createTaskModal')

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





window.onscroll = function () {
  makeHeaderSticky();
};

var header = document.querySelector(".header");
var container = document.querySelector(".container");
var headerHeight = header.offsetHeight;

function makeHeaderSticky() {
  if (window.pageYOffset >= headerHeight) {
    header.classList.add("sticky");
    container.style.marginTop = headerHeight + "px";
  } else {
    header.classList.remove("sticky");
    container.style.marginTop = "0";
  }
}

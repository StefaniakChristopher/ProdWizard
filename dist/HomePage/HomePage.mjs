import { verifySessionID, createUser, signOut } from "../VerifyLogin.mjs";

const { sessionID } = await verifySessionID()

if(sessionID === "none") {
  console.log("penguin")
  window.location.href = "../LoginPage/index.html"
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

modalCloser('close-button', 'createTaskModal')
modalOpener('createTask', 'createTaskModal')

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

const mainContent = document.querySelector('.main-content');

// document.getElementById('createTask').addEventListener('click', () => {
//   // Create a new div element
//   const newBox = document.createElement('div');
//   newBox.className = 'box';

//   // Set content for the new box (you can modify this part)
//   const numberOfBoxes = document.querySelectorAll('.box').length + 1;
//   newBox.innerHTML = `
//     <h2>Box ${numberOfBoxes}</h2>
//     <p>This is the content of Box ${numberOfBoxes}.</p>
//   `;

//   // Append the new box to the main content
//   mainContent.appendChild(newBox);
// })



window.onscroll = function() {
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

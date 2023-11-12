import { verifySessionID, userLogin } from "../VerifyLogin.mjs";


const { sessionID } = await verifySessionID()

if(sessionID != "none") {
  console.log(sessionID)
  window.location.href = "../HomePage/home.html"
}
  
document.getElementById('loginButton').addEventListener('click', () => {
  console.log("alligator")
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  userLogin({
    "username": username,
    "password": password
})
});

//Browser can cache data which is stopping it from updating, the "-c-1" in the package.json prevents the browser from caching



console.log("hello!");


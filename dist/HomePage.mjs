
// if (currentLoginUser.LoginFailed == false) {

// }
console.log(currentLoginUser)
console.log("dog")

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

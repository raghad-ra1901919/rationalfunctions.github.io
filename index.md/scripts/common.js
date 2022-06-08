document.addEventListener("DOMContentLoaded", start);

async function start(){
    const menuButton = document.querySelector(".hamburger");
    menuButton.addEventListener("click", () => {
       document.querySelector("nav ul ").classList.add("navigation");
       document.querySelector("nav > span").classList.add("inactive");
       document.querySelector("nav > ul > span").classList.add("active");
    });

    const closeButton = document.querySelector(".exit");
    closeButton.addEventListener("click", () => {
        document.querySelector("nav ul ").classList.remove("navigation");
        document.querySelector("nav > span").classList.remove("inactive");
        document.querySelector("nav > ul > span").classList.remove("active");
    })
}
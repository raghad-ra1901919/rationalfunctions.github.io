import {createStudent} from "../repositories/StudentRepository.js"
import {readUser} from "../repositories/UserRepository.js";

document.addEventListener("DOMContentLoaded", start);

async function start(){
    let role = "none";
    document.querySelector("body").classList.remove("fadeout");
    const selectForm = document.querySelector("#occupation");
    selectForm.addEventListener("change", () => {
        role = selectForm.value;
        if(role === "pre-service teacher" || role === "in-service teacher") {
            document.querySelector("#role").style.height = "100vh";
            document.querySelector("#teacher").style.display = "none";
            document.querySelector("#submit").style.display = "none";
            studentForm(role);
        }
        else {
            document.querySelector("#role").style.height = "20vh";
            document.querySelector("#teacher").style.display = "flex";
            document.querySelector("#submit").style.display = "block";
        }
    })

    const submit = document.querySelector("#submit");
    submit.addEventListener("click", (event) => {
        event.preventDefault();
        moderatorForm();
    });
};

async function studentForm(role){
    const values = {};
    values.role = role;
    const response = await createStudent(values);
    sessionStorage.setItem("uuid", response);
         document.querySelector("body").classList.add("fadeout");
         window.setTimeout(() => {
             window.location.href = "../survey.html";
         },3000);
}

async function moderatorForm(){
    const values = {};
    values.username = document.querySelector("#username").value;
    values.password = document.querySelector("#password").value;
    console.log(values.username);
    console.log(values.password);
    const user = await readUser(values.username, values.password);
    console.log(user);
    if (user.exists) {
        document.querySelector("body").classList.add("fadeout");
        window.setTimeout(() => {
            window.location.href = "../survey-statistics.html";
        },3000);
    } else {
        alert("Incorrect email or password!");
    }
}
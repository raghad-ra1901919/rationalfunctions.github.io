import {updateStudentTest} from "../repositories/StudentRepository.js"

let results;

document.addEventListener("DOMContentLoaded", () => {
    const result = document.getElementsByClassName(" questionsResult");
    results = result;
    const button = document.querySelector("#start");
    button.addEventListener("click", changedButton);
});

async function changedButton(){
    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    var name = document.getElementById('studentName').value;
    if(!regName.test(name)){
        alert('Invalid name given.');
    }else{
        if (document.getElementById("start").innerHTML == "Submit") {
            // document.getElementById("start").innerHTML = "Start";
            document.getElementById("timeLeft").innerHTML = " ";
            await submitFunction();

        }
        else{
            document.getElementById("start").innerHTML = "Submit";
            start();
        }
    }
}

async function submitFunction(){
    document.getElementById("boxTxt").innerHTML = "Your score is: " + await showScore() + " / 7";
    document.getElementById("boxBack").classList.add("show");
    const feedback = document.querySelector("#feedback");
    feedback.addEventListener("click", feedBack);
}

function feedBack () {
    document.getElementById("boxBack").classList.remove("show");
    document.getElementById("timeLeft").innerHTML = "Score: " + showScore() + " / 7";
    for (let i=0; i<results.length+1; i++){
        results[i].style.display = "block";
        //window.location.href = "result.html";
    }
}

async function showScore()
{
    let score = 0;
    let answer1 = document.getElementById("QuestionOneAnswerOne").checked;
    let answer2 = document.getElementById("QuestionTwoAnswerFour").checked;
    let answer3 = document.getElementById("QuestionThreeAnswerThree").checked;
    let answer4 = document.getElementById("QuestionFourAnswerOne").checked;
    let answer5 = document.getElementById("QuestionFiveAnswerOne").checked;
    let answer6 = document.getElementById("QuestionSixAnswerFour").checked;
    let answer7 = document.getElementById("QuestionSevenAnswerThree").checked;

    const correctAnswers = [ answer1, answer2, answer3, answer4, answer5, answer6, answer7 ];
    const values = [];
    // document.getElementById("timeLeft").innerHTML = correctAnswers.length;
    for (let i=0; i<correctAnswers.length; i++){
        if (correctAnswers[i] == true){
            score = score + 1;
            values.push(1);
            document.getElementById("question"+(i+1)+"Result").innerHTML = "Correct &#10003";
            document.getElementById("question"+(i+1)+"Result").style.color = "green";
        }else{
            values.push(0);
            document.getElementById("question"+(i+1)+"Result").innerHTML = "Wrong &#10007";
            document.getElementById("question"+(i+1)+"Result").style.color = "red";
        }
    }
    console.log(values);
    const uuid = sessionStorage.getItem("uuid");
    await updateStudentTest(uuid, values);

    // for (let i=0; i<results.length; i++){
    //   document.getElementById("timeLeft").innerHTML = results[0].innerHTML;
    //   document.getElementById("question1feedback").style.display = "block";

    //   if(results[i].innerHTML == "Wrong &#10007"){
    //     document.getElementById("question"+(i+1)+"feedback").style.display = "block";
    //   }
    // }

    return score;
}

function start() {
    document.getElementById("studentName").setAttribute('readonly', true);
    document.getElementById("form").style.display = "block";
    //document.getElementById('timer').innerHTML = 07 + ":" + 00;
    startTimer();
}

function startTimer() {
    presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if(s==59){
        m=m-1
    }
    if(m<0){
        return
    }
    document.getElementById('timer').innerHTML = m + ":" + s;
    setTimeout(startTimer, 1000);
    if (m == 0 && s <=59){
        document.getElementById("timeLeft").style.color = "red";
    }
    if (m == 0 && s == 0){
        document.getElementById("timeLeft").innerHTML = "00  :  00";
        document.getElementById("form").style.display = "none";
        document.getElementById("form").style.display = "block";
        document.getElementById("boxTxt").innerHTML = "Time's up";
        document.getElementById("boxBack").classList.add("show");
    }
}

// function stopTimer(){
//   let stoppedTime = document.getElementById('timer').innerHTML = presentTime;
//   return stoppedTime;
// }

function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
    if (sec < 0) {sec = "59"};
    return sec;
}
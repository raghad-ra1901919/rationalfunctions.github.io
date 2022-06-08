let position = 0;
let toggle = false;

document.addEventListener("DOMContentLoaded", start);
const progress = document.getElementById("progress");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const circles = document.getElementsByClassName(" circle");
const actives = document.getElementsByClassName(" active");


// window.onload =()=>{ circles = document.getElementsByClassName(" circle"); }


async function start(){
    document.querySelector("body").classList.remove("fadeout");
    nextFunction();

    const next = document.querySelector("#next");
    const previous = document.querySelector("#previous");
    // const item1 = document.querySelector("#i1");
    // const item2 = document.querySelector("#i2");
    // const item3 = document.querySelector("#i3");
    // const item4 = document.querySelector("#i4");
    // const item5 = document.querySelector("#i5");
    // const item6 = document.querySelector("#i6");
    // const item7 = document.querySelector("#i7");
    // const item8 = document.querySelector("#i8");
    // const item9 = document.querySelector("#i9");
    // const item10 = document.querySelector("#i10");
    // const item11 = document.querySelector("#i11");
    // const item12 = document.querySelector("#i12");
    // const item13 = document.querySelector("#i13");
    // const item14 = document.querySelector("#i14");
    // const item15 = document.querySelector("#i15");
    // const item16 = document.querySelector("#i16");

    next.addEventListener("click", (event) => {
        event.preventDefault();
        toggle=false;
        nextFunction();
    })
     previous.addEventListener("click", (event) => {
         event.preventDefault();
         toggle=false;
         previousFunction();
     });



    let showSolution = document.querySelectorAll(".show-answer-button");
    showSolution.forEach((element) => {
        element.addEventListener("click", (event) => {
            event.preventDefault();
            let location = getPosition();
            toggleSolution(toggle, element, location);
        })
    });
    const items = [];
    for(let i =1; i<17; i++){
        let item = document.querySelector(`#i${i}`);
         item.addEventListener("click", (event) =>{
           event.preventDefault();
           selectItem(i);
       }) ;
    }

    //
    // item1.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     selectItem(1);
    // })
    // item2.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     selectItem(2);
    // })
    // item3.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     selectItem(3);
    // })
    // item4.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     selectItem(4);
    // })
    // item5.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     selectItem(5);
    // })
    // item6.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     selectItem(6);
    // })
    // item7.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     selectItem(7);
    // })
    // item8.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     selectItem(8);
    // })
    // item9.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     selectItem(9);
    // })
    // item10.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     selectItem(10);
    // })
    // item11.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     selectItem(11);
    // })
    // item12.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     selectItem(12);
    // })
    // item13.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     selectItem(13);
    // })
    // item14.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     selectItem(14);
    // })
    // item15.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     selectItem(15);
    // })
    // item16.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     selectItem(16);
    // })
}

 function previousFunction(){
     position = position - 1;
     if(position < 1)
         position = 1;
     content(position, position+1);
 }

function nextFunction(){
    position = position + 1;    
    if(position > 16){
        position = 16;
    }
    content(position, position-1);
}

function content(actual, previous){
    if(actual === previous)
        return;

    // for(let i = 1; i<17; i++){
    //     if ( i < position){
    //         circles[i].classList.add("active");
    //     }else{
    //        // circles[i].classList.remove("active");
    //     }
    // }
    console.log(previous);
    console.log(actual);

    if(actual > previous) {
        for (let i = previous; i < actual; i++) {
            circles[i].classList.add("active");
        }
    }
    else {
        if(previous === 16){
            for (let i = previous; i > actual; i--)
            circles[i-1].classList.remove("active");
        }
        else {
            for (let i = previous; i >= actual; i--) {
                circles[i].classList.remove("active");
                //  circles[i].classList.add("inactive");
            }
        }
    }

    const actualContent = document.getElementById(actual);
    actualContent.style.visibility = "visible";
    actualContent.style.opacity = "1";
    actualContent.style.transition = "opacity 1s linear";
    actualContent.style.height = "auto";

    if(previous === 0)
        return;

    const previousContent = document.getElementById(previous);
    previousContent.style.visibility = "hidden";
    previousContent.style.opacity = "0";
    previousContent.style.height = "0";

}

function selectItem(index){
    let currentLocation = getPosition();
    position = index;
    content(index, currentLocation);

}

async function toggleSolution(toggleInstance, toggleButton, location){
    console.log(toggleInstance);
    if(document.querySelector(`#solution-${location}`).style.opacity === "1"){
        toggleButton.innerHTML = "Show Answer";
        const element = document.querySelector(`#solution-${location}`);
        element.style.visibility = "hidden";
        element.style.opacity = "0";
        element.style.height = "0";
    }
    else{
        toggleButton.innerHTML = "Hide Answer";
        const element = document.querySelector(`#solution-${location}`);
        element.style.visibility = "visible";
        element.style.opacity = "1";
        element.style.transition = "opacity 1s linear";
        element.style.height = "auto";

    }
    toggle = !toggleInstance;
}

function getPosition(){
    return position;
}


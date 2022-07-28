/*
*
*
CONSTANTS
*
*
*/

const dogBar = document.querySelector('#dog-bar');
const dogInfo = document.querySelector('#dog-info');
const url = 'http://localhost:3000/pups';

/*
*
*
FUNCTION DEFINITIONS
*
*
*/

//get all dogs
const getDogs = async function(){
    let res = await fetch(url);
    let data = await res.json();
    data.forEach((el) => {
        addDog(el);
    })
}

//add one dog to span bar
const addDog = (dog) => {
    let span = document.createElement('span');
    span.innerText = dog.name;

    //on span click pass dog to showDogInfo
    span.addEventListener('click', (e) => showDogInfo(dog))

    dogBar.append(span);
}

//show info for one dog
const showDogInfo = (dog) => {
    //clear dogInfo div from any previous dogs
    dogInfo.innerHTML = '';

    //create elements 
    let dogImg = document.createElement('img');
    let dogName = document.createElement('h2');
    let dogBtn = document.createElement('button');

    //put info in elements
    dogImg.src = dog.image;
    dogName.innerText = dog.name;
    //use terneray on isGoodDog value to test wheter button should say 'Good Dog!' or 'Bad Dog!'
    dogBtn.innerText = dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!';

    //on dogBtn click toggle 'good dog' and 'bad dog' (does not persist)
    dogBtn.addEventListener('click', (e) => toggleBtn(e.target)); //e.target will be dogBtn

    //append everything to dogInfo
    dogInfo.append(dogName, dogImg, dogBtn);
}

//toggle button text between 'Good Dog!' and 'Bad Dog!' 
const toggleBtn = function(btn) {
    //get current text
    let curText = btn.innerText;
    //update current text
    if(curText === 'Good Dog!') {
        btn.innerText = 'Bad Dog!'
    } else {
        btn.innerText = 'Good Dog!'
    }
}

/*
*
*
CODE TO RUN ON PAGE LOAD
*
*
*/

getDogs();
let startPoupop = document.querySelector(".start-popup");
let selectedQuiz = document.querySelector("select");
let btnStart = document.getElementById("btn-start");

//variable of header
let quizName = document.querySelector(".quiz-name");

//variable of container
let container = document.querySelector(".container");
//start button action
btnStart.onclick = () => {
    console.log(selectedQuiz.value);  
    //hidden poppup
    startPoupop.classList.add("hidden");

    //display container
    container.classList.remove("hidden");
    //call function QuizData
    QuizData(selectedQuiz.value);
//add quiz name in the header
    quizName.innerHTML = `Quiz Name : ${selectedQuiz.value}`;
}

//get quiz question 
function QuizData(quizName) {
 
    let req =new XMLHttpRequest();
    req.open("Get", `quiz/${quizName}Quiz.json`);
    req.send();
    
    req.onreadystatechange = () => {
        if (req.status == 200 && req.readyState == 4) {
            console.log(req.responseText);
        }
     }


}


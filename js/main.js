let startPoupop = document.querySelector(".start-popup");
let selectedQuiz = document.querySelector("select");
let btnStart = document.getElementById("btn-start");
let count = 0;
let score = 0;
//variable of header
let quizName = document.querySelector(".quiz-name");
let questionNumber = document.querySelector(".number");
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
    QuizData(selectedQuiz.value, count);
    //add quiz name in the header
    quizName.innerHTML = `Quiz Name : ${selectedQuiz.value}`;

    console.log(parseInt(questionNumber.innerHTML));
    //call function to create
    createBullits(10);
    //call function to start time
    CalcTime();
}

//get quiz question 

function QuizData(quizName, count) {
    questionNumber.innerHTML = `${count + 1}`;
    let section = document.querySelector("section");
    let req = new XMLHttpRequest();
    req.open("Get", `quiz/${quizName}Quiz.json`);
    req.send();
    req.onreadystatechange = () => {
        if (req.status == 200 && req.readyState == 4) {
            let data = JSON.parse(req.responseText);
            section.innerHTML = `<div class="questions">
                <p class="question">${data[count].question}</p>
                <div class="answers">
                    <div>
                        <input type="radio" name="answer" id="answer_1" value="${data[count].answer_1}">
                        <label for="answer_1">${data[count].answer_1}</label>

                    </div>
                    <div>
                        <input type="radio" name="answer" id="answer_2" value="${data[count].answer_2}">
                        <label for="answer_2">${data[count].answer_2}</label>
                    </div>
                    <div>
                        <input type="radio" name="answer" id="answer_3" value="${data[count].answer_3}">
                        <label for="answer_3">${data[count].answer_3}</label>
                    </div>
                    <div>
                        <input type="radio" name="answer" id="answer_4" value="${data[count].answer_4}">
                        <label for="answer_4">${data[count].answer_4}</label>
                    </div>

                </div>
            </div>
            `;
            let answersinput = document.querySelectorAll(".answers input");

            checkAnswer(data, answersinput);
        }



    }//end request
}

//action of next button
let nextBtn = document.querySelector("#next");
nextBtn.onclick = function next() {

    let bullits = document.querySelectorAll(".bullits p");
    if (count == 9) {
        let resultPopup = document.querySelector(".result-popup");
        let scoreResult = document.querySelector(".result-popup span");
        let evaluation = document.querySelector(".evaluation");
        resultPopup.classList.remove("hidden");
        container.classList.add("hidden");
        scoreResult.innerHTML = `${score}`;
        if (score > 6) {
            evaluation.innerHTML = "VeryGood";
        } else {
            evaluation.innerHTML = "bad";
        };
        console.log(`result=${score}`);
    } else {
        count++;
        QuizData(selectedQuiz.value, count);
        bullits[count].classList.add("active");

    }

    setInterval(()=>{
        nextBtn.click();
    },60000);
}



//function to check answer  
function checkAnswer(data, answersinput) {
    answersinput.forEach((a) => {
        a.onclick = () => {
            console.log(data[count].right_answer);
            console.log(a.value);
            if (data[count].right_answer == a.value) {
                score++;

            }
        }
    })


}



//function to create bullits  

function createBullits(number) {
    let questionNumber = number - 1;
    let bullits = document.querySelector(".bullits");
    for (let i = 0; i < questionNumber; i++) {
        let p = document.createElement("p");
        bullits.appendChild(p);
    }
}
//function to calc
function CalcTime() {
    let minutes = document.querySelector(".minute");
    let second = document.querySelector(".second");
    let t = setInterval(() => {    
        second.innerHTML --;
        if (minutes.innerHTML == 0 && second.innerHTML == 0) {
            //show result
            let resultPopup = document.querySelector(".result-popup");
            let scoreResult = document.querySelector(".result-popup span");
            let evaluation = document.querySelector(".evaluation");
            resultPopup.classList.remove("hidden");
            container.classList.add("hidden");
            scoreResult.innerHTML = `${score}`;
            if (score > 6) {
                evaluation.innerHTML = "VeryGood";
            } else {
                evaluation.innerHTML = "bad";
            };
          
            //stop function
            clearInterval(t);
            
        }
        if (second.innerHTML == 0) {
            second.innerHTML = 59;
            if (parseInt(minutes.innerHTML) == 0) {
                minutes.innerHTML = 0;
            
            } else {
                minutes.innerHTML = minutes.innerHTML - 1;
               

            }
        }


    }, 1000)

  
}


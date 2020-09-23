(function(){
var questions=[{
    question:'Which built-in method removes the last element from an array and returns that element?',
    options:{
        a:'last()',
        b:'get()',
        c:'pop()',
        d:'None Of the Above'
    },
    answer:'c',
    marksForRightAttempt:3,
    marksForWrongAttempt:-2,
    difficulty:'Easy',
    topicName:'Array'
},

{
    question:' Which of the following function of Number object formats a number with a specific number of digits to the right of the decimal?',
    options:{
        a:'toExponential()',
        b:'toPrecision()',
        c:'toLocaleString()',
        d:'toFixed()'
    },
    answer:'d',
    marksForRightAttempt:2,
    marksForWrongAttempt:-1,
    difficulty:'Medium',
    topicName:'Number'
},

{
    question:'Which of the following function of String object combines the text of two strings and returns a new string?',
    options:{
        a:'add()',
        b:'concat()',
        c:'merge()',
        d:'append()'
    },
    answer:'b',
    marksForRightAttempt:3,
    marksForWrongAttempt:-1,
    difficulty:'Medium',
    topicName:'String'
},
{
    question:'Which of the following function of Array object returns a string representing the array and its elements?',
    options:{
        a:'toSource()',
        b:'sort()',
        c:'splice()',
        d:'toString()'
    },
    answer:'d',
    marksForRightAttempt:2,
    marksForWrongAttempt:0,
    difficulty:'Easy',
    topicName:'Array'
},
{
    question:'Which of these are  reserved keyword in JavaScript?',
    options:{
        a:'interface',
        b:' throws',
        c:'program',
        d:'while'
    },
    answer: 'abd',
    marksForRightAttempt:4,
    marksForWrongAttempt:0,
    difficulty:'Hard',
    topicName:'Keywords'
}];

var mins = 1;  //Set the number of minutes you need
var secs = mins * 60;
var currentSeconds = 0;
var currentMinutes = 0;
var userSubmittedTheTest=false;

setTimeout(Decrement,1000); 

function Decrement() {
    currentMinutes = Math.floor(secs / 60);
    currentSeconds = secs % 60;
    if(currentSeconds <= 9) currentSeconds = "0" + currentSeconds;
    secs--;
    var timerDisplay=document.getElementById("timer");
    timerDisplay.innerHTML = "Timer  "+currentMinutes + ":" + currentSeconds; //Set the element id you need the time put into.
    timerDisplay.style.color='blue';

    if(secs !==-1 ) setTimeout(Decrement,1000);

  
    else{
        alert('Your Test Ended');
        submitButton.disabled=true;
        timerDisplay.style.color='red';
    }
    if(userSubmittedTheTest==true)
    {
        submitButton.disabled=true;
        timerDisplay.style.color='red';
        timerDisplay.innerHTML='Test Ended';
        secs=-1;

    }
   
}
/*
var questions=[{
    question:'Which built-in method removes the last element from an array and returns that element?',
    options:['last()','get()','pop()','None Of the Above'],
    answer:'pop()',
    marksForRightAttempt:3,
    marksForWrongAttempt:-2,
    difficulty:'Easy',
    topicName:'Array'
},

{
    question:' Which of the following function of Number object formats a number with a specific number of digits to the right of the decimal?',
    options:['toExponential()','toPrecision()','toLocaleString()','toFixed()'],
    answer:'toFixed()',
    marksForRightAttempt:2,
    marksForWrongAttempt:-1,
    difficulty:'Medium',
    topicName:'Number'
},

{
    question:'Which of the following function of String object combines the text of two strings and returns a new string?',
    options:['add()','concat()','merge()','append()'],
    answer:'concat()',
    marksForRightAttempt:3,
    marksForWrongAttempt:-1,
    difficulty:'Medium',
    topicName:'String'
},
{
    question:'Which of the following function of Array object returns a string representing the array and its elements?',
    options:['toSource()','sort()','splice()','toString()'],
    answer:'toString()',
    marksForRightAttempt:2,
    marksForWrongAttempt:0,
    difficulty:'Easy',
    topicName:'Array'
},
{
    question:'Which of these are  reserved keyword in JavaScript?',
    options:['interface',' throws','program','while'],
    answer: ['interface','throws','while'],
    marksForRightAttempt:4,
    marksForWrongAttempt:0,
    difficulty:'Hard',
    topicName:'Keywords'
}];*/


const quizContainer=document.getElementById('Quiz');
const submitButton=document.querySelector('.submitquiz');
const resultsContainer=document.getElementById('results');

function buildQuiz(){
    var output=[];

    //--------NEW IMPLEMENTATION-------------//
    var n= Object.keys(questions).length;

    var t,i;
    while(n){
        i = Math.floor(Math.random() * n--);
        t = questions[n];
        questions[n] = questions[i];
        questions[i] = t;
    }
     
    



    questions.forEach(
        (currentQuestion,questionNumber)=>{
        const answers=[];
                
        if(currentQuestion.answer.length==1){
        for(letter in currentQuestion.options){
            answers.push(`<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter}:
            ${currentQuestion.options[letter]}
            </label>`);
        }
        }
        else{

            for(letter in currentQuestion.options){
                answers.push(`<label>
                <input type="checkbox" name="question${questionNumber}" value="${letter} id="checkboxes">
                ${letter}:
                ${currentQuestion.options[letter]}
                </label>`);

            }
        }

        output.push(
            `<span class='question'> ${currentQuestion.question} </span>
            <span class='categories'>${currentQuestion.topicName}</span><br><br>
        <div class='answers'> ${answers.join('')} </div><br><br>`);

    });

quizContainer.innerHTML=output.join('');
}
var marksScored=0;
function showResults(){

    const answerContainers=quizContainer.querySelectorAll('.answers');
    var numCorrect=0;
    questions.forEach((currentQuestion,questionNumber)=>{

        const answerContainer=answerContainers[questionNumber];
        const selector=`input[name=question${questionNumber}]:checked`;
        const userAnswer=(answerContainer.querySelector(selector)||{}).value;
        var check=answerContainer.querySelectorAll('input[type="checkbox"]');
        

       // var selectCheckbox=document.querySelector('input[type="checkbox"]:checked');
       
       if(currentQuestion.answer.length==1){

        if(userAnswer===currentQuestion.answer  ){
            numCorrect++;
            answerContainers[questionNumber].style.color='green';
            marksScored+=currentQuestion.marksForRightAttempt;
        }
        else{
            answerContainers[questionNumber].style.color='red';
            marksScored+=currentQuestion.marksForWrongAttempt;
        }
   }
      else{
        var str='';
        var untilLoop=currentQuestion.options;
      
        for(var i=0;i<Object.keys(untilLoop).length;i++){
           
       
            if(check[i].checked==true){
                str+=check[i].value.slice(0,1);
            
            }
        }
        if(str==currentQuestion.answer){
            numCorrect++;
            answerContainers[questionNumber].style.color='green';
            marksScored+=currentQuestion.marksForRightAttempt;
        }
        else{
            answerContainers[questionNumber].style.color='red';
            marksScored+=currentQuestion.marksForWrongAttempt;
        }
        
      }
 //console.log(currentQuestion.marksForWrongAttempt);

    });


    resultsContainer.innerHTML=`Total Marks scored: ${marksScored}<br>${numCorrect} out of ${questions.length} answered correctly`;
    submitButton.disabled=true;
    userSubmittedTheTest=true;

}

buildQuiz();    

submitButton.addEventListener('click',()=>{
    let confirmation=confirm("Do you really want to submit");
    if(confirmation==true) showResults();
else {}});

})();
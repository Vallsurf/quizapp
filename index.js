

let questionCount = 0;
let questionTodisplay = 0;
let score = 0;  

//when intro button is clicked, hides welcome title 
function hideStart () {
$('.startButton').on('click', function(event) {
$(this).closest('.quizStart').remove();
$("body").css({"background-image":"none"}); 
questionTodisplay ++;
renderQuestionnumber (questionTodisplay) ; 
renderQuizform(STORE, questionCount);  
  });
} 

//displays Question Number 
function renderQuestionnumber (questionTodisplay) {
$('.questionNumber').html(`${questionTodisplay}`);
} 

//displays Score
function renderScore (score) {
$('.score').html(`${score}`);
} 

//Displays question and choices
function renderQuizform (STORE, numberofquestion) {
  let questionnumber = STORE[numberofquestion]; 
  let questionarray = questionnumber.answers; 
$('.questionAnswerForm').removeAttr('hidden');
$('.questionAnswerForm').html(`<h1 class="question">${questionnumber.name} </h1>
 <form>
    <fieldset>
    <legend>Answer Choices</legend> 
    <div role="radiogroup">
    <label for="answer1" class="answerOption">
    <input type="radio" value="${questionarray[0]}" id="answer1" name="answer" required>
    <span>${questionarray[0]}</span>
    </label> 
      <label for="answer2" class="answerOption">
    <input type="radio" value="${questionarray[1]}" id="answer2" name="answer" required>
    <span>${questionarray[1]}</span>
    </label> 
      <label for="answer3" class="answerOption">
    <input type="radio" value="${questionarray[2]}" id="answer3" name="answer" required>
    <span>${questionarray[2]}</span>
    </label> 
      <label for="answer4" class="answerOption">
    <input type="radio" value="${questionarray[3]}" id="answer4" name="answer" required>
    <span>${questionarray[3]}</span>
    </label> 
    </div>
    </fieldset>
    <button type="submit" class="submitButton">Submit</button>
</form>`)
  
}

//function to determine if answer is correct or not when clicked
function CheckAnswer () {
$('.questionAnswerForm').on('submit', function(event) {
  event.preventDefault();
$('.AnswerResponse').removeAttr('hidden');
let selected = $('input:checked');
let answer = selected.val();
//var choicenum = $(this).attr("id");
console.log(`${answer}`);
console.log (`correct is ${questionCount}`) 
if (answer === STORE[questionCount].correct) 
 {rightAnswer();}
 else {wrongAnswer();}
  });
} 

//Displays next question after clicking answer feedback view button
function nextButtonclick () {
$('.AnswerResponse').on('click', '.nextButton', function(event) {
  var doneornot = questionCount ; 
  $('.AnswerResponse').hide();
  if (doneornot +1 < STORE.length) {
questionTodisplay ++;
questionCount ++;
console.log(`question count is ${questionCount}`)
renderQuestionnumber (questionTodisplay) ; 
renderQuizform(STORE, questionCount);  
  }
  else {  
   $('.AnswerResponse').attr("hidden", "true");
  $('.QuizDone').show()
   $('.QuizDone').html(`<h1> You Scored  ${score} points out of 5! </h1> <img src = "https://media.giphy.com/media/rrYfvW8z0v0qc/giphy.gif" /> 
   <h1>God Bless Kevin Durant!</h1>
   <button type="button" class="TryAgainbutton">Play Again!</button>`) }
  });
} 

//Logic for when right answer is chosen
function rightAnswer () {
  score ++;
  renderScore (score)
$('.questionAnswerForm').attr("hidden","true")
$('.AnswerResponse').show();
$('.AnswerResponse').html(`<h1>You Got It Right! </h1> <img src="https://media.giphy.com/media/10ERZqYioLWJ6U/giphy.gif" />
<button type="button" class="nextButton">I'm Heatin Up!</button>`)

} 

//Logic for when wrong answer is chosen 
function wrongAnswer () {
$('.questionAnswerForm').attr("hidden","true")  
$('.AnswerResponse').show();
$('.AnswerResponse').html(`<h1>You Got It Wrong! The correct answer was ${STORE[questionCount].correct}! </h1><img src="https://media.giphy.com/media/O5NyCibf93upy/giphy.gif" />
<button type="button" class="nextButton">You Miss 100 Percent off the Shots You Don't Take, Rack em Up!</button>`)
} 

//Resets Quiz 
function resetQuiz () {
$('.QuizDone').on('click', '.TryAgainbutton', function(event) {
$('.QuizDone').hide()
questionCount = 0 
score = 0 
questionTodisplay = 1;
renderQuestionnumber (questionTodisplay) ; 
renderScore (score); 
renderQuizform(STORE, questionCount);

});
}

//initiates Quiz
function handleQuiz() {
  hideStart();
  nextButtonclick (questionCount); 
  CheckAnswer (); 
  renderQuestionnumber (questionTodisplay);
  renderScore (score);
  resetQuiz () ; 
}


// when the page loads, call `handleQuiz`
$(handleQuiz);
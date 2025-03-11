// Soruları içeren bir dizi oluşturalım.

const questions = [
    {
        question: "Türkiye Cumhuriyeti'nin ilk cumhurbaşkanı kimdir?",
        answers: [
            {text : "İsmet İnönü", correct: false},
            {text : "Celal Bayar", correct: false},
            {text : "Mustafa Kemal Atatürk", correct: true},
            {text : "Cemal Gürsel", correct: false},
        ]
    },
    {
        question: "Türkiye'nin başkenti neresidir ?",
        answers: [
            {text : "Bursa", correct: false},
            {text : "İstanbul", correct: false},
            {text : "Ankara", correct: true},
            {text : "Şırnak", correct: false},
        ]
    },
    {
        question: "İstiklal marşının yazarı kimdir ?",
        answers: [
            {text : "Sabahttin Ali", correct: false},
            {text : "Cemal Süreyya", correct: false},
            {text : "Ömer Seyfettin", correct: false},
            {text : "Mehmet Akif Ersoy", correct: true},
        ]
    },
    {
        question: "Türkiye'nin yüz ölçümü olarak en büyük ili hangisidir ?",
        answers: [
            {text : "Konya", correct: true},
            {text : "Şanlıurfa", correct: false},
            {text : "Muş", correct: false},
            {text : "İzmir", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0 ;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + 
    currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer )   
    })

}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target ;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! `;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex ++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}



nextButton.addEventListener("click",() => {
    if( currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
 })
startQuiz();
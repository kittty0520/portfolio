/*질문을 바꾸는 함수*/

const questionList = [
    '당신의 직급은  무엇입니까?',
    '오늘의 점심은 어느 나라 음식을 드시겠습니까?',
    '어떤 식재료를 넣을까요?',
]

const  answerList = [
     // 1 
    ['신입','대리','과장','부장','대표'],
    // 2
    ['한식','양식','중식','일식','기타'],
    // 3
    ['쌀','밀가루','육류','해산물','채소'],
]

const startBtn = document.querySelector('.start__button');
const startTitle = document.querySelector('.start__title');
const startPage = document.querySelector('.start');

const questions = document.querySelector('.questions');
const question = document.querySelector('.question'); 
const answer = document.querySelector('.answers__list');

startBtn.addEventListener('click',()=>{
    CloseStart();
    questions.style.display='block';
    StartQuestion();
});

function CloseStart(){
    startPage.style.display='none';
}

function StartQuestion(){
    question.innerHTML='';
    addItem('newQuestion', question);
    addItem('newAnswer', answer);
}

function addItem(className, field){
    const item = document.createElement('div');
    item.setAttribute('class', className);
    item.style.border="1px solid #333";
    item.innerHTML= field === question? questionSet(): answerSet();
    field.appendChild(item);
}

function questionSet(){
    let questionNum = 0;
    const newQuestion = questionList[questionNum];
    questionNum++;
    return newQuestion;
}

function answerSet(){
    let answerNum = 0;
    let newAnswer = answerList[answerNum];
    return newAnswer.map(item=>styleAnswer(item));
}

function styleAnswer(item){
    const answer = document.createElement('button');
    answer.setAttribute('class', 'answer__each');
    answer.style.border = '1px solid #666';
    answer.style.margin = '10px';
    answer.innerHTML=item;
}



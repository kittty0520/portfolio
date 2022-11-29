'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT=5;
const BUG_COUNT=5;
const GAME_DURATION_SEC=5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const startBtn= document.querySelector('.game__button');
const gametimer= document.querySelector('.game__timer');
const gameScore= document.querySelector('.game__score');
const popUp=document.querySelector('.pop-up');
const popUpText =document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

const carrotSound = new Audio('sound/carrot_pull.mp3');
const alertSound = new Audio('sound/alert.wav');
const bgSound = new Audio('sound/bg.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');
const winSound = new Audio('sound/game_win.mp3');


let started= false;
let score = 0;
let timer = undefined;


startBtn.addEventListener('click',()=>{
    if(started){
        stopGame();
    } else{
        startGame();
    }
    
});

popUpRefresh.addEventListener('click',()=>{
    startGame();
    hidePopUp();
});

field.addEventListener('click',onFieldClick);

function startGame(){
    started=true;
    initGame();
    showStopBtn();
    showTimerAndCount();
    startGameTimer();
    playSound(bgSound);
}

function stopGame(){
    started=false;
    hideGameBtn();
    stopGameTimer();
    
    showPopUpWithText('REPLAY?');
    playSound(alertSound);
    stopSound(bgSound);
}


function finishGame(win){
    started=false;
    if(win){
        playSound(winSound);
    } else{
        playSound(bugSound);
    }
    stopGameTimer();
    stopSound(bgSound);
    showPopUpWithText(win? 'YOU WON!': 'YOU LOST');
    showStartBtn();
}

function showStopBtn(){
    const icon = document.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    startBtn.style.visibility='visible';
}

function hideGameBtn(){
    startBtn.style.visibility='hidden';
}

function showTimerAndCount(){
    gametimer.style.visibility='visible';
    gameScore.style.visibility='visible';
}

function startGameTimer(){
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimeSec(remainingTimeSec);
    timer = setInterval(() => {
        if(remainingTimeSec<=0){
            clearInterval(timer);
            finishGame(score===CARROT_COUNT);
            return;
        }
        updateTimeSec(--remainingTimeSec);
    }, 1000);
}

function updateTimeSec(time){
    const minutes = Math.floor(time/60);
    const seconds= time%60;
    gametimer.innerHTML=`${minutes} : ${seconds}`;
}



function stopGameTimer(){
    clearInterval(timer);
}

function showStartBtn(){
    const icon = document.querySelector('.fa-stop');
    icon.classList.add('fa-play');
    icon.classList.remove('fa-stop');
}

function showPopUpWithText(text){
    popUpText.innerHTML= text;
    popUp.classList.remove('pop-up--hide');
}


function hidePopUp(){
    popUp.classList.add('pop-up--hide');
}

function onFieldClick(event){
    if(!started){
        return;
    }
    const target = event.target;
    if(target.matches('.carrot')){
        target.remove();
        score++;
        playSound(carrotSound);
        updateScoreBoard();
        if(score===CARROT_COUNT){
            finishGame(true);
        }
    } else if(target.matches('.bug')){
        finishGame(false);
    }
}

function playSound(sound){
    sound.currentTime=0;
    sound.play();
}

function stopSound(sound){
    sound.pause();
}

function updateScoreBoard(){
    gameScore.innerHTML=CARROT_COUNT-score;
}




function initGame(){
    //벌레와 당근을 생성한 뒤 field에 추가해줌
    //console.log(fieldRect);
    score=0;
    field.innerHTML='';
    gameScore.innerHTML=CARROT_COUNT;
    addItem('carrot',CARROT_COUNT,'img/carrot.png');
    addItem('bug',BUG_COUNT,'img/bug.png');
}   

function addItem(className, count, imgPath){
    const x1=0;
    const y1=0;
    const x2=fieldRect.width-CARROT_SIZE;
    const y2=fieldRect.height-CARROT_SIZE;
    for(let i=0; i<count; i++){
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position='absolute';
        const x= randomNumber(x1,x2);
        const y= randomNumber(y1,y2);
        item.style.left= `${x}px`;
        item.style.top= `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min,max){
    return Math.random()*(max-min)+min;
}





'use strict';

const GIFT_COUNT=10;
const ITEM_SIZE=40;
const BOMB_COUNT=5;
const GAME_DURATION_SEC= 15;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const startBtn = document.querySelector('.start__button');
const startSection = document.querySelector('.start');
const gameTimer = document.querySelector('.game__timer');
const gameTimerTime= document.querySelector('.game__timer__time');
const gameScore = document.querySelector('.game__score__count');
const gameScoreCount = document.querySelector('.game__score__count');
const gameStopBtn = document.querySelector('.game__button');
const popUp= document.querySelector('.pop-up');
const popUpRefresh = document.querySelector('.pop-up__refresh');
const popUpText = document.querySelector('.pop-up__message');
const popUpImg = document.querySelector('.pop-up__image');

const alertSound= new Audio('sound/alert.wav')
const bgSound= new Audio('sound/bg.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');
const winSound = new Audio('sound/game_win.mp3');

let score=0;
let started=false;
let timer= undefined;

startBtn.addEventListener('click',()=>{
    if(started){
        stopGame();
    } else{
        startGame();
    }
})

field.addEventListener('click',onFieldClick);

gameStopBtn.addEventListener('click',()=>{
    stopGame();
})

popUpRefresh.addEventListener('click',()=>{
    startGame();
    hidePopUp();
})

function startGame(){
    started=true;
    initGame();
    startGameTimer();
    playSound(bgSound);
}

function stopGame(){
    started=false;
    hideGameBtn();
    stopGameTimer();
    showPopUpWithText('Replay?');
    stopSound(bgSound);
    playSound(alertSound);
}

function finishGame(win){
    started=false;
    if(win){
        playSound(winSound);
    } else{
        playSound(bugSound);
    }
    stopSound(bgSound);
    hideGameBtn();
    stopGameTimer();
    showPopUpWithText(win?'YOU WON!':'YOU LOST!');
    popUpInputImg(win? 'img/santa_win.png' : 'img/santa_run.png');
}

function playSound(sound){
    sound.currentTime=0;
    sound.play();
}

function stopSound(sound){
    sound.pause();
}

function hideGameBtn(){
    gameStopBtn.style.visibility='hidden';
}




function startGameTimer(){
 let remainingTimeSec = GAME_DURATION_SEC;
 updateTimeSec(remainingTimeSec);
 timer = setInterval(()=>{
    if(remainingTimeSec<=0){
        clearInterval(timer);
        finishGame(score===GIFT_COUNT);
        return;
    }
    updateTimeSec(--remainingTimeSec);
 },1000);
}

function stopGameTimer(){
    clearInterval(timer);
}

function updateTimeSec(time){
    const minutes = Math.floor(time/60);
    const seconds = time%60;
    gameTimerTime.innerHTML=`${minutes}: ${seconds<10?`0${seconds}`:seconds}`;
}

function updateScoreBoard(){
    gameScoreCount.innerHTML=GIFT_COUNT-score;
}

function onFieldClick(event){
    if(!started){
        return;
    }
    const target= event.target;
    if(target.matches('.gift')){
        target.remove();
        score++;
        updateScoreBoard();
        if(score===GIFT_COUNT){
            finishGame(true);
        }
    } else if(target.matches('.bomb')){
        finishGame(false);
    }
}


function showPopUpWithText(text){
    popUpText.innerHTML=text;
    popUp.classList.remove('pop-up--hide');
}

function hidePopUp(){
    popUp.classList.add('pop-up--hide');
}

function popUpInputImg(imgPath){
    popUpImg.innerHTML=`<img src=${imgPath} alt="santa">`;
}

function initGame(){
    startSection.style.visibility='hidden';
    gameStopBtn.style.visibility='visible';
    score=0;
    field.innerHTML='';
    gameScoreCount.innerHTML= GIFT_COUNT;
    addItem('gift',GIFT_COUNT,'img/game_gift.png');
    addItem('bomb',BOMB_COUNT,'img/game_dynamite.png');
}

function addItem(className,count,imgPath){
    const x1=0;
    const y1=0;
    const x2=fieldRect.width-ITEM_SIZE;
    const y2=fieldRect.height-ITEM_SIZE;
    for(let i=0; i<count; i++){
        const item = document.createElement('img');
        item.setAttribute('class',className);
        item.setAttribute('src',imgPath);
        item.style.position='absolute';
        const x = randomNumber(x1,x2);
        const y = randomNumber(y1,y2);
        item.style.left=`${x}px`;
        item.style.top=`${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min,max){
    return Math.random()*(max-min)+min;
}
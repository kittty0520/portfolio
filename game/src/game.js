'use strict';
import { Field, ItemType } from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
    win:'win',
    lose:'lose',
    cancel:'cancel',
});


//builder pattern
export class GameBuilder{
    gameDuration(duration){
        this.gameDuration = duration;
        return this;
    }

    carrotCount(num){
        this.carrotCount = num;
        return this;
    }

    bugCount(num){
        this.bugCount = num;
        return this;
    }

    build(){
        return new Game(
            this.gameDuration,
            this.carrotCount,
            this.bugCount
        )
    }
}

class Game {
    constructor(gameDuration, carrotCount, bugCount){
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        
        this.gametimer= document.querySelector('.game__timer');
        this.gameScore= document.querySelector('.game__score');


        this.startBtn= document.querySelector('.game__button');
        this.startBtn.addEventListener('click',()=>{
            if(this.started){
                this.stop(Reason.cancel);
                sound.playAlert();
            } else{
                this.start();
            }
            
        });


        this.field = new Field(this.carrotCount,this.bugCount);
        this.field.setItemClickListener(item=>this.onItemClick(item));


        this.started= false;
        this.score = 0;
        this.timer = undefined;
    }

    setGameStopListener(onGameStop){
        this.onGameStop= onGameStop;
    }   

    start(){
        this.started=true;
        this.initGame();
        this.showStopBtn();
        this.showTimerAndCount();
        this.startGameTimer();
        sound.playBackground();
    }

    stop(reason){
        this.started=false;
        this.hideGameBtn();
        this.stopGameTimer();
        sound.stopBackground();
        this.onGameStop && this.onGameStop(reason);
    }
    
    initGame(){
        //벌레와 당근을 생성한 뒤 field에 추가해줌
        //console.log(fieldRect);
        this.score=0;
        this.updateScoreBoard(this.score);
        this.field.init();
    }   

    onItemClick=(item)=>{
        if(!this.started){
            return;
        }
        if(item===ItemType.carrot){
            this.score++;
            this.updateScoreBoard(this.score);

            if(this.score===this.carrotCount){
                this.stop(Reason.win);
            }
        } else {
            this.stop(Reason.lose);
        }
    }

    showStartBtn() {
        const icon = this.startBtn.querySelector('.fa-solid');
        icon.classList.remove('fa-stop');
        this.startBtn.style.visibility = 'visible';
    }
    
    showStopBtn() {
        const icon = this.startBtn.querySelector('.fa-solid');
        icon.classList.add('fa-stop');
        this.startBtn.style.visibility = 'visible';
    }
    
    hideGameBtn(){
        this.startBtn.style.visibility='hidden';
    }
    
    showTimerAndCount(){
        this.gametimer.style.visibility='visible';
        this.gameScore.style.visibility='visible';
    }
    
    startGameTimer(){
        let remainingTimeSec = this.gameDuration;
        this.updateTimeSec(remainingTimeSec);

        this.timer = setInterval(() => {
            if(remainingTimeSec<=0){
                clearInterval(this.timer);
                this.stop(this.score===this.carrotCount? Reason.win: Reason.lose);
                return;
            }
            this.updateTimeSec(--remainingTimeSec);
        }, 1000);
    }
    
    stopGameTimer(){
        clearInterval(this.timer);
    }
    
    updateTimeSec(time){
        const minutes = Math.floor(time/60);
        const seconds= time%60;
        this.gametimer.innerHTML=`${minutes} : ${seconds}`;
    }
    
    updateScoreBoard(newscore){
        this.gameScore.innerHTML=this.carrotCount-newscore;
    } 
}
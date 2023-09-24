import { Component } from '@angular/core';
import { Player } from '../player/player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
   playerTop:Player;
   playerBottom:Player;

   constructor(){
    this.playerTop = new Player();
    this.playerBottom = new Player();
   }
   

   onNewgame():void{
    //TODO: call service to restart
   }

   onMovement(top:boolean, idx:number):void{
    //TODO: call service to record movement
   }

   onBackStep():void{
    //TODO: call service to move 1 step backward
   }

   onRotate():void{
    //TODO: rotate player positions in board
   }
}

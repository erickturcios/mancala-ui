import { Component } from '@angular/core';
import { Player } from '../player/player';
import { GameService } from '../service/game.service';
import { GameSessionService } from '../service/game-session.service';
import { GameDto } from '../dto/game-dto';
import { ConfigurationDto } from '../dto/configuration-dto';
import { Movement } from '../dto/movement';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
   playerTop:Player;
   playerBottom:Player;
   configuration:ConfigurationDto;
   winner:number;
   winnerMsg:string="Player wins";
   NowinnerMsg:string="Tied game";

   constructor(
      private gameService: GameService,
      private sessionService: GameSessionService
    ){
      this.playerTop = new Player();
      this.playerBottom = new Player();
      this.configuration = new ConfigurationDto();
      this.winner = 0;
   }

   private initialize(){
    this.playerTop = new Player();
    this.playerBottom = new Player();
    this.configuration = new ConfigurationDto();
   }

   ngOnInit():void{
     //load previous game if any exists
     this.onMovement(0, -1);
   }

   onNewgame():void{
    let sessionId = this.sessionService.getLocalSessionId();
    this.gameService.createNewGame(sessionId).subscribe(
      dto => {
            this.fillGameInfo(dto);
      }
    );
   }

   onMovement(player:number, idx:number):void{
      let movement = new Movement();
      movement.gameSession = this.sessionService.getLocalSessionId();;
      movement.index = idx;
      movement.playerId = player;

      this.gameService.move(movement).subscribe(
        dto => {
              this.fillGameInfo(dto);
        }
      );
   }

   onBackStep():void{
    //TODO: call service to move 1 step backward
   }

   private fillGameInfo(dto: GameDto):void{
      this.initialize();
      this.configuration = dto.configuration;
      let rotate = this.configuration.autorotate && dto.playerToMoveNext == 2;
      this.sessionService.saveLocalSessionId(dto.configuration.gameSession);
      this.winner = dto.winner;
      if(this.winner >0){
        switch(this.winner){
          case 1:
            this.winnerMsg = (this.configuration.alias1 ?? 'Player 1') + ' wins!!!'
          break;
          case 2:
            this.winnerMsg = (this.configuration.alias2 ?? 'Player 2') + ' wins!!!'
          break;
          case 3:
            this.winnerMsg = this.NowinnerMsg;
          break;
        }
      }

      if(rotate){
        //player Top => Player 1
        this.playerTop.alias = this.configuration.alias1 ?? 'Player 1';
        this.playerTop.pits = dto.player01;
        this.playerTop.total = dto.totalPlayer1;
        this.playerTop.playerId = 1;

        //player Bottom => Player 2
        this.playerBottom.alias = this.configuration.alias2 ?? 'Player 2';
        this.playerBottom.pits = dto.player02;
        this.playerBottom.total = dto.totalPlayer2;
        this.playerBottom.playerId = 2;

        if(dto.playerToMoveNext == 1){
          this.playerTop.nextToMove = true;
          
        }else if(dto.playerToMoveNext == 2){
          this.playerBottom.nextToMove = true;
        }

      }else{
        
        //player Top => Player 2
        this.playerTop.alias = this.configuration.alias2 ?? 'Player 2';
        this.playerTop.pits = dto.player02;
        this.playerTop.total = dto.totalPlayer2;
        this.playerTop.playerId = 2;

        //player Bottom => Player 1
        this.playerBottom.alias = this.configuration.alias1 ?? 'Player 1';
        this.playerBottom.pits = dto.player01;
        this.playerBottom.total = dto.totalPlayer1;
        this.playerBottom.playerId = 1;
        
        if(dto.playerToMoveNext == 2){
          this.playerTop.nextToMove = true;
        }else if(dto.playerToMoveNext == 1){
          this.playerBottom.nextToMove = true;
        }

      }
      for(let i=0; i<6;i++){
        let topHasZeroStones = this.playerTop.pits[i] == 0;
        let bottomHasZeroStones = this.playerBottom.pits[i] == 0;
        switch(i){
          case 0:
            this.playerTop.disabled00 = topHasZeroStones || !this.playerTop.nextToMove;
            this.playerBottom.disabled00 = bottomHasZeroStones || !this.playerBottom.nextToMove;
          break;
          case 1:
            this.playerTop.disabled01 = topHasZeroStones || !this.playerTop.nextToMove;
            this.playerBottom.disabled01 = bottomHasZeroStones || !this.playerBottom.nextToMove;
          break;
          case 2:
            this.playerTop.disabled02 = topHasZeroStones || !this.playerTop.nextToMove;
            this.playerBottom.disabled02 = bottomHasZeroStones || !this.playerBottom.nextToMove;
          break;
          case 3:
            this.playerTop.disabled03 = topHasZeroStones || !this.playerTop.nextToMove;
            this.playerBottom.disabled03 = bottomHasZeroStones || !this.playerBottom.nextToMove;
          break;
          case 4:
            this.playerTop.disabled04 = topHasZeroStones || !this.playerTop.nextToMove;
            this.playerBottom.disabled04 = bottomHasZeroStones || !this.playerBottom.nextToMove;
          break;
          case 5:
            this.playerTop.disabled05 = topHasZeroStones || !this.playerTop.nextToMove;
            this.playerBottom.disabled05 = bottomHasZeroStones || !this.playerBottom.nextToMove;
          break;
        }
        
      }
      
   }
}

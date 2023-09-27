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

   constructor(
      private gameService: GameService,
      private sessionService: GameSessionService
    ){
      this.playerTop = new Player();
      this.playerBottom = new Player();
      this.configuration = new ConfigurationDto();
   }

   private initialize(){
    this.playerTop = new Player();
    this.playerBottom = new Player();
    this.configuration = new ConfigurationDto();
   }

   ngOnInit():void{
     this.onNewgame();
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
          
        }else{
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
        }else{
          this.playerBottom.nextToMove = true;
        }

      }
      
      this.playerTop.disabled = !this.playerTop.nextToMove;      
      this.playerBottom.disabled = !this.playerBottom.nextToMove;
      
   }
}

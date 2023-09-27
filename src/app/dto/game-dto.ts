import { ConfigurationDto } from "./configuration-dto";

export class GameDto{
    configuration!: ConfigurationDto;
    id!:number;
    gameSession!:string;
    player01!: number[];
    totalPlayer1!: number;
    player02!: number[];
    totalPlayer2!: number;
    createdOn!: Date;
    updatedOn?: Date;
    playerToMoveNext!:number;
    winner!:number;

}
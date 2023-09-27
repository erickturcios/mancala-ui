export class Player{
    public alias: String = 'Player';
    public pits: number[] = [0,0,0,0,0,0];
    public total: number = 0;
    public playerId:number = 0;
    public nextToMove = false;
    public disabled  = false;
}
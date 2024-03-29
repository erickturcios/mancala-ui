import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import { environment } from '../../environments/environment';
import { GameSessionService } from './game-session.service';
import { GameDto } from '../dto/game-dto';
import { Movement } from '../dto/movement';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient) { 

    }

  createNewGame(sessionId: string){
    let url = `${environment.apiURL}/game/${sessionId}`;
    return this.http.post<GameDto>(url,'')
          .pipe(
              catchError(
                this.handleError<GameDto>('createNewGame')
              )
            );
  }

  move(movement: Movement){
    let url = `${environment.apiURL}/game`;
    return this.http.put<GameDto>(url,movement)
          .pipe(
              catchError(
                this.handleError<GameDto>('move')
              )
            );
  }

  undoMovement(sessionId: string){
    let url = `${environment.apiURL}/game/undoMovement/${sessionId}`;
    return this.http.put<GameDto>(url,'')
          .pipe(
              catchError(
                this.handleError<GameDto>('undoMovement')
              )
            );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); // log to console
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

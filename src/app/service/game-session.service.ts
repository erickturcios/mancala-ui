import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameSessionService {

  constructor() { }

  
  getLocalSessionId():string{
    let id = sessionStorage.getItem(environment.sessionAtributeName) ?? 'none';
    return id;
  }

  saveLocalSessionId(sessionId: string):void{
    sessionStorage.setItem(environment.sessionAtributeName, sessionId);
  }
}

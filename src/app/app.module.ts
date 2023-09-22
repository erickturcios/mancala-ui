import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { GameComponent } from './game/game.component';
import { HistoryComponent } from './history/history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigurationComponent,
    GameComponent,
    HistoryComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: 'main', component: AboutComponent},
      {path: 'configuration', component: ConfigurationComponent},
      {path: 'history', component: HistoryComponent},
      {path: 'play', component: GameComponent},
      {path: '**', redirectTo: 'main'}, /*Not Found redirect*/
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

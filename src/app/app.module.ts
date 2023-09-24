import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { GameComponent } from './game/game.component';
import { HistoryComponent } from './history/history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigurationComponent,
    GameComponent,
    HistoryComponent,
    AboutComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: 'main', component: AboutComponent},
      {path: 'configuration', component: ConfigurationComponent},
      {path: 'play', component: GameComponent},
      {path: '**', redirectTo: 'main'}, /*Not Found redirect*/
    ]),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

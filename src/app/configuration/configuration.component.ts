import { Component } from '@angular/core';
import { AbstractControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertComponent } from '../alert/alert.component';
import { ConfigurationService } from '../service/configuration.service';
import { ConfigurationDto } from '../dto/configuration-dto';
import { GameSessionService } from '../service/game-session.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent {
  
  numericRange = [3,4,5,6,7,8];

  configurationForm:FormGroup = this.fb.group({
    numberOfStones: [''],
    stepBackAllowed: [false],
    autoRotate: [false],
    aliasPlayer1: [''],
    aliasPlayer2: [''],
  });


  constructor(
    private fb: FormBuilder,
    private configService: ConfigurationService,
    private sessionService: GameSessionService
    ) { 
    
  }

  ngOnInit(): void{
    this.reload();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.configurationForm.controls;
  }

  onSubmit():void{
    if (this.configurationForm.invalid) {
      return;
    }
    let sessionId = this.sessionService.getLocalSessionId();

    let dto = new ConfigurationDto();
    dto.alias1 = this.configurationForm.controls['aliasPlayer1'].value;
    dto.alias2 = this.configurationForm.controls['aliasPlayer2'].value;
    dto.autorotate = this.configurationForm.controls['autoRotate'].value;
    dto.gameSession = sessionId;
    dto.numberOfStones = this.configurationForm.controls['numberOfStones'].value;
    dto.stepBackAllowed = this.configurationForm.controls['stepBackAllowed'].value;
    this.configService.saveConfiguration(dto).subscribe(
      dto => {
            let sessionId = dto.gameSession ?? '';
            this.sessionService.saveLocalSessionId(sessionId);
            this.configurationForm = this.fb.group({
              numberOfStones: [dto.numberOfStones, Validators.required],
              stepBackAllowed: [dto.stepBackAllowed],
              autoRotate: [dto.autorotate],
              aliasPlayer1: [dto.alias1],
              aliasPlayer2: [dto.alias2],
            });
      }
    );
  }

  private reload(){
    let sessionId = this.sessionService.getLocalSessionId();
    this.configService.getOrCreateConfiguration(sessionId).subscribe(
      dto => {
            let sessionId = dto.gameSession ?? '';
            this.sessionService.saveLocalSessionId(sessionId);
            this.configurationForm = this.fb.group({
              numberOfStones: [dto.numberOfStones, Validators.required],
              stepBackAllowed: [dto.stepBackAllowed],
              autoRotate: [dto.autorotate],
              aliasPlayer1: [dto.alias1],
              aliasPlayer2: [dto.alias2],
            });
      }
    );
  }
  
  /*
  onReset(): void {
    this.configurationForm.reset();
  }*/
}

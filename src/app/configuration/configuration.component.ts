import { Component } from '@angular/core';
import { AbstractControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertComponent } from '../alert/alert.component';

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
    aliasPlayer1: ['PLayer 1'],
    aliasPlayer2: ['Player 2'],
  });


  constructor(private fb: FormBuilder) { 
    
  }

  ngOnInit(): void{
    this.configurationForm = this.fb.group({
      numberOfStones: ['', Validators.required],
      stepBackAllowed: [''],
      autoRotate: [''],
      aliasPlayer1: [''],
      aliasPlayer2: [''],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.configurationForm.controls;
  }

  onSubmit():void{
    console.warn(this.configurationForm.value);
    
    if (this.configurationForm.invalid) {
      return;
    }

    //TODO: add post request
  }

  
  onReset(): void {
    this.configurationForm.reset();
  }
}

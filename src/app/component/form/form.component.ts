import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Vehicle } from 'src/app/helpers/classes/Vehicle';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  @Output() onAddVehicle: EventEmitter<Vehicle> = new EventEmitter<Vehicle>();

  myForm!: FormGroup;
  name!: FormControl;
  model!: FormControl;
  manufacturer!: FormControl;
  cost_in_credits!: FormControl;

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.name = new FormControl('', Validators.required);
    this.model = new FormControl('', Validators.required);
    this.manufacturer = new FormControl('', Validators.required);
    this.cost_in_credits = new FormControl('', Validators.required);
  }

  createForm() {
    this.myForm = new FormGroup({
      name: this.name,
      model: this.model,
      manufacturer: this.manufacturer,
      cost_in_credits: this.cost_in_credits,
    });
  }

  onSubmit(name: string, model: string, manufacturer: string, cost_in_credits: number) {
    const newVehicle = new Vehicle(name, model, manufacturer, cost_in_credits);
    
    if (this.myForm.valid) {
      this.onAddVehicle.emit(newVehicle);
    }
    this.myForm.reset();
  }
}

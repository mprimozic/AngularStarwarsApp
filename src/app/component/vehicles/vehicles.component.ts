import { Component, Input } from '@angular/core';
import { Vehicle } from 'src/app/helpers/classes/Vehicle';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent {
  @Input() specieVehicles!: Vehicle[];
  @Input() specieName!: String;
}

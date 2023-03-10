import { Component, Input } from '@angular/core';
import { Starship } from 'src/app/helpers/classes/Starship';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css']
})
export class StarshipsComponent {
  @Input() starships!: Starship[];
  @Input() specieName!: String;
}

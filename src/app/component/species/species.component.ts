import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Specie } from 'src/app/helpers/classes/Specie';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnChanges {
  @Input() specie!: Specie;

  imagePath: string = '';
  


  ngOnChanges(changes: SimpleChanges): void {
    this.imagePath = '../../../assets/images/' + this.specie.name.toLowerCase() + '.jpeg';
  }


}

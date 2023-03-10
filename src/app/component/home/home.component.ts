import { Component } from '@angular/core';
import { SpeciesService } from '../../service/species.service';
import { Specie } from '../../helpers/classes/Specie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public species: Specie[] = [];
  public loading: boolean = false;

  constructor(private specieService: SpeciesService) {}

  ngOnInit() {
    this.loading = true;
    this.specieService.getSpecies('Human', 'Droid', 'Wookie').subscribe(data => {
      this.species.push(data[0]);
      if (this.species.length == 3) {
        this.loading = false;
      } 
    });
  }
}

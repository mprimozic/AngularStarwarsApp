import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { People } from 'src/app/helpers/classes/People';
import { Specie } from 'src/app/helpers/classes/Specie';
import { Starship } from 'src/app/helpers/classes/Starship';
import { Vehicle } from 'src/app/helpers/classes/Vehicle';
import { API_VEHICLES } from 'src/app/helpers/constants/swapiEndpoints';
import { SpeciesService } from 'src/app/service/species.service';

@Component({
  selector: 'app-specie-page',
  templateUrl: './specie-page.component.html',
  styleUrls: ['./specie-page.component.css']
})
export class SpeciePageComponent implements OnChanges {
  public specieName!: string;
  public specie!: Specie;
  public user!: People;
  public loading: boolean = true;
  public vehicles!: Vehicle[];
  public starships!: Starship[];

  constructor(private route:ActivatedRoute, private speciService:SpeciesService) {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.specieName = params['specieName'];
      this.speciService.getSpecies(this.specieName).subscribe(data => {
        this.specie = data[0];
        const userUrl = this.specie.people ? this.specie.people[0] : '';
        const specieVehicleUrl = this.getSpecieVehicleUrl(this.specieName);

        if (userUrl && specieVehicleUrl) {
          this.getUserAndSpecieVehiclesData(userUrl, specieVehicleUrl);
        } else if (userUrl) {
          this.getUserAndStarshipsData(userUrl);
        }

      });
    }) 
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  getUserAndSpecieVehiclesData(userUrl: string, specieVehicleUrl: string) {
    this.speciService.getUser(userUrl).subscribe(user => {
      this.user = user;          
    });
    this.speciService.getVehicle(specieVehicleUrl).subscribe(data => {
      this.vehicles = data;
      this.loading = false;
    })
  }

  getUserAndStarshipsData(userUrl: string) {
    this.speciService.getUser(userUrl).subscribe(user => {
      this.user = user;          
    });
    this.speciService.getStarships().subscribe(data => {
      this.starships = data;
      this.loading = false;
    })
  }

  getSpecieVehicleUrl(specieName: string): string {
    switch (specieName) {
      case 'Human':
        return API_VEHICLES;
      case 'Droid':
        return API_VEHICLES + '?search=droid';    
      default:
        return '';
    }
  }

  addVehicle(vehicle: Vehicle) {
    this.vehicles.push(vehicle);
  }
}

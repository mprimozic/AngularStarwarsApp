import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { People } from 'src/app/helpers/classes/People';
import { Specie } from 'src/app/helpers/classes/Specie';
import { Starship } from 'src/app/helpers/classes/Starship';
import { Vehicle } from 'src/app/helpers/classes/Vehicle';
import { STORAGE_KEY_DROID, STORAGE_KEY_HUMAN } from 'src/app/helpers/constants/storageKeys';
import { API_VEHICLES } from 'src/app/helpers/constants/swapiEndpoints';
import { SpeciesService } from 'src/app/service/species.service';

@Component({
  selector: 'app-specie-page',
  templateUrl: './specie-page.component.html',
  styleUrls: ['./specie-page.component.css']
})
export class SpeciePageComponent implements OnChanges, OnInit {
  public specieName!: string;
  public specie!: Specie;
  public user!: People;
  public loading: boolean = true;
  public vehicles!: Vehicle[];
  public starships!: Starship[];
  public specieVideo: string = '';

  constructor(private route:ActivatedRoute, private speciService:SpeciesService) {
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.specieName = params['specieName'];
      this.loading = true;
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
      this.getSpecieVideo(this.specieName);
    })
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  getUserAndSpecieVehiclesData(userUrl: string, specieVehicleUrl: string) {
    const vehiclesFromStorage: Array<Vehicle> = this.getDataFromStorage();
    this.speciService.getUser(userUrl).subscribe(user => {
      this.user = user;          
    });
    this.speciService.getVehicle(specieVehicleUrl).subscribe(data => {
      this.vehicles = [...data, ...vehiclesFromStorage];
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
      case 'human':
        return API_VEHICLES;
      case 'droid':
        return API_VEHICLES + '?search=droid';    
      default:
        return '';
    }
  }

  addVehicle(vehicle: Vehicle) {
    this.vehicles.push(vehicle);
    this.setDataToStorage(vehicle);
  }

  setDataToStorage(vehicle: Vehicle) {
    const vehiclesArray: Array<Vehicle> = [vehicle];

    switch (this.specieName) {
      case 'human':
        const dataFromHumanStorage = localStorage.getItem(STORAGE_KEY_HUMAN);
        if (dataFromHumanStorage != null) {
          const vehiclesFromStorage: Array<Vehicle> = JSON.parse(dataFromHumanStorage);
          vehiclesFromStorage.push(vehicle);
          localStorage.setItem(STORAGE_KEY_HUMAN, JSON.stringify(vehiclesFromStorage));
        } else {
          localStorage.setItem(STORAGE_KEY_HUMAN, JSON.stringify(vehiclesArray));
        }
        break;
      case 'droid':
        const dataFromDroidStorage = localStorage.getItem(STORAGE_KEY_DROID);
        if (dataFromDroidStorage != null) {
          const vehiclesFromStorage: Array<Vehicle> = JSON.parse(dataFromDroidStorage);
          vehiclesFromStorage.push(vehicle);
          localStorage.setItem(STORAGE_KEY_DROID, JSON.stringify(vehiclesFromStorage));
        } else {
          localStorage.setItem(STORAGE_KEY_DROID, JSON.stringify(vehiclesArray));
        }
        break;
    
      default:
        break;
    }
  }

  getDataFromStorage(): Array<Vehicle> {
    let vehiclesFromStorage: Array<Vehicle> = [];
    if(this.specieName === 'human'){
      const dataFromStorage = localStorage.getItem(STORAGE_KEY_HUMAN);
      if (dataFromStorage != null) {
        vehiclesFromStorage = JSON.parse(dataFromStorage);
      }
    } else if (this.specieName === 'droid') {
      const dataFromStorage = localStorage.getItem(STORAGE_KEY_DROID);
      if (dataFromStorage != null) {
        vehiclesFromStorage = JSON.parse(dataFromStorage);
      }
    }
    return vehiclesFromStorage;
  }

  deleteVehicles() {
    const vehiclesFromStorage: Array<Vehicle> = this.getDataFromStorage();
    let filterVehicles: Array<Vehicle> = [];;
    vehiclesFromStorage.map((vehicle => {
      filterVehicles = this.vehicles.filter(specieVehicle => {
        return (specieVehicle.name != vehicle.name);
      });
    }));
    this.vehicles = filterVehicles;
    
    this.removeVehiclesFromStorage();
  }

  removeVehiclesFromStorage() {
    switch (this.specieName) {
      case 'human':
        localStorage.removeItem(STORAGE_KEY_HUMAN);
        break;
      case 'droid':
        localStorage.removeItem(STORAGE_KEY_DROID);
        break;
    
      default:
        break;
    }
  }

  getSpecieVideo(specieName: string) {
    switch (specieName) {
      case 'human':
          this.specieVideo = 'dOSzCHmP1xM';
          break;
      case 'droid':
          this.specieVideo = 'buJjccK98FQ';
          break;       
      default:
          break;
  }
  }
}

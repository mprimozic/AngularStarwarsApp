import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from 'src/app/helpers/classes/Film';
import { People } from 'src/app/helpers/classes/People';
import { Specie } from 'src/app/helpers/classes/Specie';
import { Starship } from 'src/app/helpers/classes/Starship';
import { SpeciesService } from 'src/app/service/species.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit{
  public starshipName!: string;
  public starship!: Starship;
  public films: Film[] = [];
  public loading: boolean = true;
  public specieName!: string;
  public specie!: Specie;
  public user!: People;

  constructor(private route: ActivatedRoute, private specieService: SpeciesService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loading = true;
      this.starshipName = params['starshipName'].split('_').join(' ');
      this.specieService.getStarshipByName(this.starshipName).subscribe(data => {
        this.starship = data[0];        
        this.specieService.getFilms(this.starship.films).subscribe(data => {
          this.films.push(data);
          if (this.films.length == this.starship.films.length) {
            this.loading = false;
          }         
        })
      })
    })

    this.route.params.subscribe(params => {
      this.specieName = params['specieName'];
      this.specieService.getSpecies(this.specieName).subscribe(data => {
        this.specie = data[0];
        const userUrl = this.specie.people ? this.specie.people[0] : '';
        this.specieService.getUser(userUrl).subscribe(user => {
          this.user = user;          
        });
      })
    })
  }
}

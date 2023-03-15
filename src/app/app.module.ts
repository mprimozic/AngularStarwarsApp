import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { SpeciesComponent } from './component/species/species.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SpeciePageComponent } from './component/specie-page/specie-page.component';
import { LoaderComponent } from './component/loader/loader.component';
import { VehiclesComponent } from './component/vehicles/vehicles.component';
import { StarshipsComponent } from './component/starships/starships.component';
import { FormComponent } from './component/form/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { VideoComponent } from './component/video/video.component';
import { FilmsComponent } from './component/films/films.component';
import { RemoveSpacePipe } from './pipe/remove-space.pipe';
import { SafePipe } from './pipe/safe.pipe';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'specie/:specieName', component: SpeciePageComponent},
  {path: 'specie/:specieName/:starshipName', component: FilmsComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SpeciesComponent,
    NavbarComponent,
    SpeciePageComponent,
    LoaderComponent,
    VehiclesComponent,
    StarshipsComponent,
    FormComponent,
    VideoComponent,
    FilmsComponent,
    RemoveSpacePipe,
    SafePipe,
     ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

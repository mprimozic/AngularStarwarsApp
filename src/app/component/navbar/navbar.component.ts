import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnChanges {

  @Input() userName!: string;
  @Input() specieName!: string;

  imagePath: string = '';

  ngOnChanges() {
    this.imagePath = '../../../assets/images/' + this.specieName.toLowerCase() + '.jpeg';
  }
}

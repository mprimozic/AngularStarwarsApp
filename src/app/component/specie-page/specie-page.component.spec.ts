import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciePageComponent } from './specie-page.component';

describe('SpeciePageComponent', () => {
  let component: SpeciePageComponent;
  let fixture: ComponentFixture<SpeciePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeciePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeciePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

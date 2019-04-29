import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetMapComponent } from './lost-pets.component';

describe('LostPetsComponent', () => {
  let component: PetMapComponent;
  let fixture: ComponentFixture<PetMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

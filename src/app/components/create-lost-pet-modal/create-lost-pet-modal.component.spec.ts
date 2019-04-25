import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLostPetModalComponent } from './create-lost-pet-modal.component';

describe('CreateLostPetModalComponent', () => {
  let component: CreateLostPetModalComponent;
  let fixture: ComponentFixture<CreateLostPetModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLostPetModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLostPetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

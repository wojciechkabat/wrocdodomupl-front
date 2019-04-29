import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPetModalComponent } from './create-lost-pet-modal.component';

describe('CreateLostPetModalComponent', () => {
  let component: ReportPetModalComponent;
  let fixture: ComponentFixture<ReportPetModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPetModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetDetailsSidePanelComponent } from './lost-pet-side-panel.component';

describe('LostPetSidePanelComponent', () => {
  let component: PetDetailsSidePanelComponent;
  let fixture: ComponentFixture<PetDetailsSidePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetDetailsSidePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetDetailsSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

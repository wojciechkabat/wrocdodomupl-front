import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LostPetSidePanelComponent } from './lost-pet-side-panel.component';

describe('LostPetSidePanelComponent', () => {
  let component: LostPetSidePanelComponent;
  let fixture: ComponentFixture<LostPetSidePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostPetSidePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostPetSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

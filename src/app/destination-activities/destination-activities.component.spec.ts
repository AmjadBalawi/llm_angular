import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationActivitiesComponent } from './destination-activities.component';

describe('DestinationActivitiesComponent', () => {
  let component: DestinationActivitiesComponent;
  let fixture: ComponentFixture<DestinationActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationActivitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

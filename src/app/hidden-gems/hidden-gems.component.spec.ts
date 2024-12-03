import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiddenGemsComponent } from './hidden-gems.component';

describe('HiddenGemsComponent', () => {
  let component: HiddenGemsComponent;
  let fixture: ComponentFixture<HiddenGemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HiddenGemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiddenGemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalTipsComponent } from './cultural-tips.component';

describe('CulturalTipsComponent', () => {
  let component: CulturalTipsComponent;
  let fixture: ComponentFixture<CulturalTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CulturalTipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CulturalTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

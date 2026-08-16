import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedProjectsSectionComponent } from './featured-projects-section.component';

describe('FeaturedProjectsSectionComponent', () => {
  let component: FeaturedProjectsSectionComponent;
  let fixture: ComponentFixture<FeaturedProjectsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedProjectsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedProjectsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrsimulComponent } from './rrsimul.component';

describe('RrsimulComponent', () => {
  let component: RrsimulComponent;
  let fixture: ComponentFixture<RrsimulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrsimulComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RrsimulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

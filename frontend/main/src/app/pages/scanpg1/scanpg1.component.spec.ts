import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scanpg1Component } from './scanpg1.component';

describe('Scanpg1Component', () => {
  let component: Scanpg1Component;
  let fixture: ComponentFixture<Scanpg1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Scanpg1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Scanpg1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

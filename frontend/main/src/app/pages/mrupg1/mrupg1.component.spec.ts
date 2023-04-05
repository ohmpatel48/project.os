import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mrupg1Component } from './mrupg1.component';

describe('Mrupg1Component', () => {
  let component: Mrupg1Component;
  let fixture: ComponentFixture<Mrupg1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Mrupg1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mrupg1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

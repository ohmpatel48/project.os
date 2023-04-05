import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Marupg2Component } from './marupg2.component';

describe('Marupg2Component', () => {
  let component: Marupg2Component;
  let fixture: ComponentFixture<Marupg2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Marupg2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Marupg2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bankpg1Component } from './bankpg1.component';

describe('Bankpg1Component', () => {
  let component: Bankpg1Component;
  let fixture: ComponentFixture<Bankpg1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bankpg1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bankpg1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

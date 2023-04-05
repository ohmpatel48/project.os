import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bankpg2Component } from './bankpg2.component';

describe('Bankpg2Component', () => {
  let component: Bankpg2Component;
  let fixture: ComponentFixture<Bankpg2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bankpg2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bankpg2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

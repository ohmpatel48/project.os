import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scanpg2Component } from './scanpg2.component';

describe('Scanpg2Component', () => {
  let component: Scanpg2Component;
  let fixture: ComponentFixture<Scanpg2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Scanpg2Component]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Scanpg2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

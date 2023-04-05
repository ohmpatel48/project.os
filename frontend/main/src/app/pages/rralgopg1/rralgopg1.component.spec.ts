import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rralgopg1Component } from './rralgopg1.component';

describe('Rralgopg1Component', () => {
  let component: Rralgopg1Component;
  let fixture: ComponentFixture<Rralgopg1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Rralgopg1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rralgopg1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

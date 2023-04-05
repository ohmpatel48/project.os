import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rralgopg2Component } from './rralgopg2.component';

describe('Rralgopg2Component', () => {
  let component: Rralgopg2Component;
  let fixture: ComponentFixture<Rralgopg2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Rralgopg2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rralgopg2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

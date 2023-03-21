import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MruComponent } from './mru.component';

describe('MruComponent', () => {
  let component: MruComponent;
  let fixture: ComponentFixture<MruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MruComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriComponent } from './fri.component';


describe('FriComponent', () => {
  let component: FriComponent;
  let fixture: ComponentFixture<FriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

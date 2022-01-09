import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FroggerComponent } from './frogger.component';

describe('FroggerComponent', () => {
  let component: FroggerComponent;
  let fixture: ComponentFixture<FroggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FroggerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FroggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

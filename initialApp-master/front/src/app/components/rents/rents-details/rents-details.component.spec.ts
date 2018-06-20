import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentsDetailsComponent } from './rents-details.component';

describe('RentsDetailsComponent', () => {
  let component: RentsDetailsComponent;
  let fixture: ComponentFixture<RentsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

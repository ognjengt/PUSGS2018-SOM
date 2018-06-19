import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOfficeDetailComponent } from './branch-office-detail.component';

describe('BranchOfficeDetailComponent', () => {
  let component: BranchOfficeDetailComponent;
  let fixture: ComponentFixture<BranchOfficeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchOfficeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchOfficeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

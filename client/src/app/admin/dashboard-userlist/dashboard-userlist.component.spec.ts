import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserlistComponent } from './dashboard-userlist.component';

describe('DashboardUserlistComponent', () => {
  let component: DashboardUserlistComponent;
  let fixture: ComponentFixture<DashboardUserlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardUserlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardUserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

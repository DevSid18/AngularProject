import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataReportsComponent } from './data-reports.component';

describe('DataReportsComponent', () => {
  let component: DataReportsComponent;
  let fixture: ComponentFixture<DataReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataReportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

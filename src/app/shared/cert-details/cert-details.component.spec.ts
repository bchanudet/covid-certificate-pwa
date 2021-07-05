import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertDetailsComponent } from './cert-details.component';

describe('CertDetailsComponent', () => {
  let component: CertDetailsComponent;
  let fixture: ComponentFixture<CertDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

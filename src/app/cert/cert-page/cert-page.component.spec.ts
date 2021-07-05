import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertPageComponent } from './cert-page.component';

describe('CertPageComponent', () => {
  let component: CertPageComponent;
  let fixture: ComponentFixture<CertPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

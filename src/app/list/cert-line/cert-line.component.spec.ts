import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertLineComponent } from './cert-line.component';

describe('CertLineComponent', () => {
  let component: CertLineComponent;
  let fixture: ComponentFixture<CertLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

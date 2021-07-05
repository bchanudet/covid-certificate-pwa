import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartialObserver } from 'rxjs';
import { DCCertificate } from 'src/app/models/certificate';
import { CertificateService } from 'src/app/services/certificate.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {

  newcert?: DCCertificate;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private certSvc: CertificateService,
    private storeSvc: StorageService,
    private fb: FormBuilder
  ) {

    this.form = this.fb.group({
      firstname : ['', Validators.required],
      lastname: ['', Validators.required]
    });

  }

  public get firstname() { return this.form.get('firstname'); }
  public get lastname() { return this.form.get('lastname'); }

  ngOnInit(): void {
    this.route.params.subscribe(
      (newParams) => {
        this.newcert = this.certSvc.CreateFromQRCode(atob(newParams.qrcode));
      }
    )
  }

  onCancel(): void {
    this.router.navigate(['new', 'scan']);
  }

  onSubmit(): void {
    if(this.newcert === undefined){
      return;
    }

    this.newcert.firstname = this.form.value.firstname;
    this.newcert.lastname = this.form.value.lastname;

    this.storeSvc.AddCertificate(this.newcert);

    this.router.navigate(['/list']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';
import { CertificateService } from 'src/app/services/certificate.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit {

  private camera: any;
  allCameras: MediaDeviceInfo[] = [];

  allowedFormats: BarcodeFormat[] = [BarcodeFormat.QR_CODE];
  hasTorch: boolean = false;
  hasMultipleCameras: boolean = false;

  torchEnabled: boolean = false;

  notacert: boolean = false;
  displayMesg: 'permission-pending' | 'permission-denied' | 'camera-loading' | '' = 'permission-pending';

  displayTest: boolean = !environment.production;
  testCerts: {"label": string, "data": string}[] = environment.testCerts;

  public get selectedCamera(): MediaDeviceInfo{
    return this.camera;
  }
  public set selectedCamera(newCamera: MediaDeviceInfo){
    console.log("new camera selected", newCamera);
    this.camera = newCamera;
  }

  constructor(
    private router: Router,
    private certSvc: CertificateService
  ) { }

  ngOnInit(): void {

  }

  OnCamerasFound(cameras: MediaDeviceInfo[]){
    console.log("cams", cameras);
    if(cameras.length > 0) {
      this.displayMesg = '';
    }
    this.allCameras = cameras;
    this.hasMultipleCameras = cameras.length > 1;
  }

  OnTorchCompatible(yes: boolean){
    this.hasTorch = yes;
  }


  OnPermissionResponse(isAllowed : boolean){
    this.displayMesg = isAllowed ? 'camera-loading' : 'permission-denied';
  }

  OnCertificateFound(content: string){
    // Here we do a very quick check on the header to see if it's supposedly a DCC.
    // A more thorough check is done on the check component
    if(this.certSvc.IsValidQRCode(content)){
      this.router.navigate(['new', 'validate', btoa(content)]);
    }
    else{
      this.notacert = true;
    }
  }

  ToggleTorch(){
    this.torchEnabled = !this.torchEnabled;
  }

  SwitchCamera(){
    this.selectedCamera = this.allCameras[(this.allCameras.findIndex(v => v.deviceId === this.camera.deviceId) +1) % this.allCameras.length];
  }

  RetryPermissions(){
    document.location.reload();
  }

  Test(key: string){
    if(this.testCerts.length === 0){
      return;
    }

    let i = this.testCerts.findIndex((e) => e.label === key);
    if(i === -1){
      return;
    }

    this.OnCertificateFound(this.testCerts[i].data);
  }
}

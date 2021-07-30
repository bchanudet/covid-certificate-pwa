import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';
import { CertificateService } from 'src/app/services/certificate.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent {

  private cameraIndex = 0;
  allCameras: MediaDeviceInfo[] = [];

  allowedFormats: BarcodeFormat[] = [BarcodeFormat.QR_CODE];
  hasTorch = false;
  hasMultipleCameras = false;

  torchEnabled = false;

  notacert = false;
  displayMesg: 'permission-pending' | 'permission-denied' | 'camera-loading' | '' = 'permission-pending';

  displayTest = !environment.production;
  testCerts: {"label": string, "data": string}[] = environment.testCerts;

  public get selectedCamera(): MediaDeviceInfo{
    return this.allCameras[this.cameraIndex];
  }
  public set selectedCamera(newCamera: MediaDeviceInfo){
    console.log("new camera selected", newCamera);
    this.cameraIndex = this.allCameras.findIndex(v => v.deviceId === newCamera.deviceId);
  }

  constructor(
    private router: Router,
    private certSvc: CertificateService
  ) { }

  onCamerasFound(cameras: MediaDeviceInfo[]) : void{
    console.log("cams", cameras);
    if(cameras.length > 0) {
      this.displayMesg = '';
    }
    this.allCameras = cameras;
    this.hasMultipleCameras = cameras.length > 1;
  }

  onTorchCompatible(yes: boolean) : void{
    this.hasTorch = yes;
  }


  onPermissionResponse(isAllowed : boolean) : void{
    this.displayMesg = isAllowed ? 'camera-loading' : 'permission-denied';
  }

  onCertificateFound(content: string): void{
    // Here we do a very quick check on the header to see if it's supposedly a DCC.
    // A more thorough check is done on the check component
    if(this.certSvc.isValidQRCode(content)){
      void this.router.navigate(['new', 'validate', btoa(content)]);
    }
    else{
      this.notacert = true;
    }
  }

  toggleTorch(): void{
    this.torchEnabled = !this.torchEnabled;
  }

  switchCamera() : void{
    this.cameraIndex = (this.cameraIndex + 1 ) % this.allCameras.length;
    this.selectedCamera = this.allCameras[this.cameraIndex];
  }

  test(key: string): void{
    if(this.testCerts.length === 0){
      return;
    }

    const i = this.testCerts.findIndex((e) => e.label === key);
    if(i === -1){
      return;
    }

    this.onCertificateFound(this.testCerts[i].data);
  }
}

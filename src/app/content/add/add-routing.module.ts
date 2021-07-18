import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScanComponent } from './scan/scan.component';
import { CheckComponent } from './check/check.component';

const routes: Routes = [
  { path: 'scan', component: ScanComponent },
  { path: 'validate/:qrcode', component: CheckComponent},
  { path: '**', redirectTo:'scan'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoutingModule } from './content/add/add-routing.module';
import { CertRoutingModule } from './content/cert/cert-routing.module';
import { HomeRoutingModule } from './content/home/home-routing.module';
import { ListRoutingModule } from './content/list/list-routing.module';
import { SettingsRoutingModule } from './content/settings/settings-routing.module';

const routes: Routes = [
  {path:"", loadChildren : () => HomeRoutingModule, pathMatch: 'full'},
  {path:"new", loadChildren: () => AddRoutingModule},
  {path:"list", loadChildren: () => ListRoutingModule},
  {path:"cert", loadChildren: () => CertRoutingModule},
  {path:"settings", loadChildren: () => SettingsRoutingModule},
  {path: '**', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

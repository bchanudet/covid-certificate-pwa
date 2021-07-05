import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoutingModule } from './add/add-routing.module';
import { CertRoutingModule } from './cert/cert-routing.module';
import { HomeRoutingModule } from './home/home-routing.module';
import { ListRoutingModule } from './list/list-routing.module';

const routes: Routes = [
  {path:"", loadChildren : () => HomeRoutingModule, pathMatch: 'full'},
  {path:"new", loadChildren: () => AddRoutingModule},
  {path:"list", loadChildren: () => ListRoutingModule},
  {path:"cert", loadChildren: () => CertRoutingModule},
  {path: '**', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

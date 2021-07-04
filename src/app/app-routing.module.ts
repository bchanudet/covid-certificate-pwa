import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoutingModule } from './add/add-routing.module';

const routes: Routes = [
  {path:"new", loadChildren: () => AddRoutingModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

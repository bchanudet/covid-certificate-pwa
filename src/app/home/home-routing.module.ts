import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StraightToListGuard } from '../guards/straight-to-list.guard';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent, canActivate:[StraightToListGuard]},
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

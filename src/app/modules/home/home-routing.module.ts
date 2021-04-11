import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { HomeResolverService } from "./home-resolver.service";
const routes: Routes = [
  {
    path: '',
    resolve: {
      data: HomeResolverService
    },
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

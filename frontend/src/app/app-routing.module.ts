import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { HomeComponent } from './home/home.component';
import { AddItemComponent } from './add-item/add-item.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
   {path:'home', component:HomeComponent},
   {path:'admin', component: AdminViewComponent},
   {path:'add-item', component: AddItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

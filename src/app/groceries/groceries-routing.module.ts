import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroceryFamilyMemberPageComponent } from './pages/grocery-family-member-page.component';
import { GroceryFamilyPageComponent } from './pages/grocery-family-page.component';

export const routes: Routes = [
  { path: '', component: GroceryFamilyPageComponent },
  { path: ':id', component: GroceryFamilyMemberPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroceriesRoutingModule {}

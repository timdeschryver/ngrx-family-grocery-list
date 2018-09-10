import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatListModule,
  MatIconModule,
} from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { reducers } from './reducers';
import { GroceriesRoutingModule } from './groceries-routing.module';
import { GroceryFamilyPageComponent } from './pages/grocery-family-page.component';
import { GroceryFamilyMemberPageComponent } from './pages/grocery-family-member-page.component';
import { GroceryListComponent } from './components/grocery-list.component';
import { GroceryHeaderComponent } from './components/grocery-header.component';
import { GroceryInputComponent } from './components/grocery-input.component';
import { GroceryVisibilityComponent } from './components/grocery-visiblity.component';
import { RemoveCheckedOutGroceriesComponent } from './components/remove-checked-out-groceries.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatIconModule,
    GroceriesRoutingModule,
    StoreModule.forFeature('groceries', reducers),
  ],
  declarations: [
    GroceryFamilyMemberPageComponent,
    GroceryFamilyPageComponent,
    GroceryListComponent,
    GroceryHeaderComponent,
    GroceryInputComponent,
    GroceryVisibilityComponent,
    RemoveCheckedOutGroceriesComponent,
  ],
})
export class GroceriesModule {}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { GroceryViewModel, Grocery } from '../models';
import { FamilyMember } from '../../models';
import {
  checkOffGroceryPersonPage,
  addGrocery,
  removeCheckedOffGroceries,
} from '../reducers/groceries.reducer';
import {
  getActiveFamilyMember,
  getVisibleActiveFamilyMemberGroceries,
} from '../selectors/grocery-family-member-page.selectors';
import { toggleCheckedOffGroceries } from '../reducers/visibility.reducer';

@Component({
  selector: 'grocery-person-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
       <grocery-header [familyMember]="familyMember | async">
         <grocery-visibility (toggleCheckedOffGroceries)="toggleCheckedOffGroceries()"></grocery-visibility>
         <remove-checked-out-groceries [familyMember]="familyMember | async" (removeCheckedOffGroceries)="removeCheckedOffGroceries($event)"></remove-checked-out-groceries>
       </grocery-header>
       <mat-card-content>
        <grocery-list [groceries]="groceries | async" (checkOffGrocery)="checkOffGrocery($event)"></grocery-list>
        <grocery-input [familyMember]="familyMember | async" (addGrocery)="addGrocery($event)"></grocery-input>
      </mat-card-content>
      <mat-card-actions align='end'>
        <a mat-stroked-button routerLink="/">Home</a>
      </mat-card-actions>
    </mat-card>
  `,
})
export class GroceryFamilyMemberPageComponent implements OnInit {
  familyMember: Observable<FamilyMember>;
  groceries: Observable<GroceryViewModel[]>;

  constructor(public store: Store<{}>) {}

  ngOnInit() {
    this.familyMember = this.store.pipe(select(getActiveFamilyMember));
    this.groceries = this.store.pipe(
      select(getVisibleActiveFamilyMemberGroceries),
    );
  }

  checkOffGrocery(groceryId: string) {
    this.store.dispatch(checkOffGroceryPersonPage({ id: groceryId }));
  }

  addGrocery(grocery: Partial<Grocery>) {
    this.store.dispatch(addGrocery(grocery));
  }

  toggleCheckedOffGroceries() {
    this.store.dispatch(toggleCheckedOffGroceries());
  }

  removeCheckedOffGroceries(familyMemberId: string) {
    this.store.dispatch(removeCheckedOffGroceries({ familyMemberId }));
  }
}

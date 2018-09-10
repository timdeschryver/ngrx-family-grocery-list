import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FamilyMemberGroceryViewModel } from '../models';
import { checkOffGroceryFamilyPage } from '../reducers/groceries.reducer';
import { getFamilyMembersGroceries } from '../selectors/grocery-family-page.selectors';

@Component({
  selector: 'grocery-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <mat-card *ngFor="let familyMemberGrocery of familyMembersGroceries | async">
        <grocery-header [familyMember]="familyMemberGrocery.familyMember">
          <button mat-raised-button [routerLink]="[familyMemberGrocery.familyMember.id]">Open grocery list</button>
        </grocery-header>
        <mat-card-content>
          <grocery-list [groceries]="familyMemberGrocery.groceries" (checkOffGrocery)="checkOffGrocery($event)"></grocery-list>
        </mat-card-content>
      </mat-card>
      </div>
      <a mat-stroked-button routerLink="/">Home</a>
  `,
  styles: [
    `
      .page {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      mat-card {
        flex-basis: 40%;
        flex-grow: 0;
        margin-bottom: 5px;
      }
    `,
  ],
})
export class GroceryFamilyPageComponent implements OnInit {
  familyMembersGroceries: Observable<FamilyMemberGroceryViewModel[]>;

  constructor(public store: Store<{}>) {}

  ngOnInit() {
    this.familyMembersGroceries = this.store.pipe(
      select(getFamilyMembersGroceries),
    );
  }

  checkOffGrocery(groceryId: string) {
    this.dispatch(checkOffGroceryFamilyPage({ id: groceryId }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}

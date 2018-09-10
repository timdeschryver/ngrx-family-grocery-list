import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { GroceryViewModel } from '../models';

@Component({
  selector: 'grocery-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-nav-list *ngIf="groceries.length else noGroceries">
      <mat-list-item *ngFor="let grocery of groceries" (click)="checkOff(grocery)" [class.checked-off]="grocery.checkedOff">
        <button mat-icon-button>
            <mat-icon>done</mat-icon>
        </button>
        {{ grocery.description }}
      </mat-list-item>
    </mat-nav-list>

    <ng-template #noGroceries>
      <p>
        No groceries on the list
      </p> 
    </ng-template>
  `,
  styles: [
    `
      button {
        opacity: 0;
      }

      mat-list-item:not(.checked-off):hover button {
        opacity: 1;
      }

      .checked-off {
        text-decoration: line-through;
      }
    `,
  ],
})
export class GroceryListComponent {
  @Input()
  groceries: GroceryViewModel[];

  @Output()
  checkOffGrocery = new EventEmitter<string>();

  checkOff(grocery: GroceryViewModel) {
    this.checkOffGrocery.emit(grocery.id);
  }
}

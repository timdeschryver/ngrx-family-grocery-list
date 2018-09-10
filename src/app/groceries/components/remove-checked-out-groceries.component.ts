import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

import { FamilyMember } from '../../models';

@Component({
  selector: 'remove-checked-out-groceries',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button mat-raised-button (click)="remove()">Remove checked off groceries</button>
  `,
})
export class RemoveCheckedOutGroceriesComponent {
  @Input()
  familyMember: FamilyMember;

  @Output()
  removeCheckedOffGroceries = new EventEmitter<string>();

  remove() {
    this.removeCheckedOffGroceries.emit(this.familyMember.id);
  }
}

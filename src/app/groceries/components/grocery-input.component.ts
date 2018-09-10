import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { Grocery } from '../models';
import { FamilyMember } from '../../models';

@Component({
  selector: 'grocery-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-form-field appearance="fill" style="width: 100%">
      <mat-label>Add a new grocery</mat-label>
      <input matInput (keydown.enter)="onEnter($event)">
      <mat-hint><strong>Prefix with ! to mark its importance</strong> </mat-hint>
    </mat-form-field>
  `,
})
export class GroceryInputComponent {
  @Input()
  familyMember: FamilyMember;

  @Output()
  addGrocery = new EventEmitter<Partial<Grocery>>();

  onEnter(event: any) {
    this.addGrocery.emit({
      familyMemberId: this.familyMember.id,
      description: event.target.value,
    });
    event.target.value = '';
  }
}

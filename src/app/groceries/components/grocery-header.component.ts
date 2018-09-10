import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { FamilyMember } from '../../models';

@Component({
  selector: 'grocery-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card-header>
      <div mat-card-avatar>{{ familyMember.avatar }}</div>
      <mat-card-title><h3>{{ familyMember.name }}'s groceries</h3></mat-card-title>

      <ng-content></ng-content>
    </mat-card-header>
  `,
  styles: [
    `
      mat-card-header {
        font-size: 2em;
      }
    `,
  ],
})
export class GroceryHeaderComponent {
  @Input()
  familyMember: FamilyMember;
}

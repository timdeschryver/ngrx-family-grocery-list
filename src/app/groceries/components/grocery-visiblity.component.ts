import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'grocery-visibility',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button mat-raised-button (click)="toggle()">Toggle checked off groceries</button>
  `,
})
export class GroceryVisibilityComponent {
  @Output()
  toggleCheckedOffGroceries = new EventEmitter<void>();

  toggle() {
    this.toggleCheckedOffGroceries.emit();
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getFamilyMembers } from '../selectors/index.selectors';
import { FamilyDict } from '../models';

@Component({
  selector: 'home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Welcome to your family grocery list!</h1>

    <h2>Click on a family member to open their grocery list.</h2>
    <mat-nav-list>
      <a *ngFor="let member of familyMembers | async | keyvalue" 
        mat-list-item [routerLink]="['/groceries', member.key]"
      > 
        {{ member.value.avatar }} {{member.value.name}} 
      </a>
    </mat-nav-list>

    <a mat-stroked-button routerLink="/groceries" style="width: 100%">Open family grocery lists</a>
  `,
})
export class HomePageComponent implements OnInit {
  familyMembers: Observable<FamilyDict>;

  constructor(private store: Store<{}>) {}

  ngOnInit() {
    this.familyMembers = this.store.pipe(select(getFamilyMembers));
  }
}

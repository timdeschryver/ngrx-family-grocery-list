import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule, MatButtonModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { reducers, metaReducers } from './reducers';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './pages/home-page.component';
import { LocalStorageEffects } from './effects/localStorage.effects';

@NgModule({
  declarations: [AppComponent, HomePageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      initialState: {
        family: {
          familyMembers: {
            mom: { id: 'mom', name: 'Charlotte', avatar: '👩' },
            dad: { id: 'dad', name: 'Bob', avatar: '👨' },
            son: { id: 'son', name: 'Logan', avatar: '👦' },
            daughter: { id: 'daughter', name: 'Emily', avatar: '👧' },
          },
        },
      },
    }),
    EffectsModule.forRoot([LocalStorageEffects]),
    StoreDevtoolsModule.instrument({
      name: 'Family grocery list',
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

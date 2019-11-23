import 'firebase/firestore';

import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as firebase from 'firebase';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ServerCardComponent } from './components/server-card/server-card.component';
import { ServerDetailComponent } from './components/server-detail/server-detail.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatIconModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    ServerDetailComponent,
    ServerCardComponent,
    ToolbarComponent,
    PageNotFoundComponent
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule {}

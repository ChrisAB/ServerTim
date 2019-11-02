import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {HomeComponent} from './components/home/home.component';
import {ServerDetailComponent} from './components/server-detail/server-detail.component';

const firebaseConfig = {
  apiKey: 'AIzaSyCNcECRIogf_IuPDB0Ahd6-Sk45qECaJhE',
  authDomain: 'servertim-a62cc.firebaseapp.com',
  databaseURL: 'https://servertim-a62cc.firebaseio.com',
  projectId: 'servertim-a62cc',
  storageBucket: 'servertim-a62cc.appspot.com',
  messagingSenderId: '644356148014',
  appId: '1:644356148014:web:62f7816d02e14fa32f08bf',
  measurementId: 'G-10WC23H3QR'
};

@NgModule({
  imports: [
    BrowserModule, AppRoutingModule, BrowserAnimationsModule,
    ReactiveFormsModule, AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule, MatButtonModule, MatProgressSpinnerModule
  ],
  declarations:
      [AppComponent, HomeComponent, DashboardComponent, ServerDetailComponent],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Server } from './server.model';

@Injectable({ providedIn: 'root' })
export class ServerService {
  servers$: Observable<any[]>;

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    this.servers$ = auth.user$.pipe(
      switchMap(user =>
        this.afs
          .collection<Server>('servers', ref =>
            ref.where('userUid', '==', user.uid)
          )
          .valueChanges()
      )
    );
  }

  getServers(): Observable<Server[]> {
    return this.servers$;
  }
}

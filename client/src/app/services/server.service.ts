import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
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
      ),
      catchError(err => of([]))
    );
  }

  addServerToUser(userData, serverData) {
    let uid = this.afs.createId();
    const serverRef: AngularFirestoreDocument<Server> = this.afs.doc(
      `servers/${uid}`
    );
    const data = {
      uid: uid,
      userUid: userData.uid,
      address: serverData.ip,
      name: serverData.name
    };
    
    return serverRef.set(data, { merge: true });
  }

  getServers(): Observable<Server[]> {
    return this.servers$;
  }
}

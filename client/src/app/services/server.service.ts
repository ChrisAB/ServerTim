import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, mergeMap, take } from 'rxjs/operators';
import { Server } from './server.model';
import { FileService } from './file.service';

@Injectable({ providedIn: 'root' })
export class ServerService {
  userServers$: Observable<any[]>;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private fileService: FileService
  ) {
    this.userServers$ = auth.user$.pipe(
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
    const serverUid = this.afs.createId();
    const serverRef: AngularFirestoreDocument<Server> = this.afs.doc(
      `servers/${serverUid}`
    );
    const data = {
      uid: serverUid,
      userUid: userData.uid,
      address: serverData.ip,
      displayName: serverData.name
    };

    return serverRef.set(data, { merge: true });
  }

  getServer(serverUid: string) {
    if (serverUid) {
      return this.afs.doc<Server>(`servers/${serverUid}`).valueChanges();
    } else {
      return of(null);
    }
  }

  deleteServer(serverUid) {
    this.fileService
      .getServerFiles(serverUid)
      .pipe(
        take(1),
        mergeMap(files => files.map(file => file.uid))
      )
      .subscribe(fileUid => {
        this.fileService.deleteFile(fileUid);
      });

    const serverRef: AngularFirestoreDocument<Server> = this.afs.doc(
      `servers/${serverUid}`
    );
    serverRef.delete();
  }
}

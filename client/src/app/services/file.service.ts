import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { switchMap, catchError } from 'rxjs/operators';
import { File } from './file.model';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  userFiles$: Observable<any[]>;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private serverService: ServerService
  ) {
    this.userFiles$ = this.auth.user$.pipe(
      switchMap(user =>
        this.afs
          .collection<File>('files', ref =>
            ref.where('userUid', '==', user.uid)
          )
          .valueChanges()
      ),
      catchError(err => of([]))
    );
  }

  addFileToServer(userData, serverUid, fileData) {
    const fileUid = this.afs.createId();
    const fileRef: AngularFirestoreDocument<File> = this.afs.doc(
      `files/${fileUid}`
    );
    const data = {
      uid: fileUid,
      userUid: userData.uid,
      serverUid,
      name: fileData.name,
      downloadUrl: fileData.downloadUrl
    };

    return fileRef.set(data, { merge: true });
  }

  getAllFiles(): Observable<File[]> {
    return this.userFiles$;
  }

  getServerFiles(serverUid: string): Observable<File[]> {
    return this.serverService.getServer(serverUid).pipe(
      switchMap(server =>
        this.afs
          .collection<File>('files', ref =>
            ref.where('serverUid', '==', server.uid)
          )
          .valueChanges()
      ),
      catchError(err => of([]))
    );
  }

  deleteFile(fileUid) {
    const fileRef: AngularFirestoreDocument<File> = this.afs.doc(
      `files/${fileUid}`
    );
    fileRef.delete();
  }
}

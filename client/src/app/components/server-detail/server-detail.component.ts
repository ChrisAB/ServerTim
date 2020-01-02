import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, concat } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Server } from 'src/app/services/server.model';
import { switchMap, map, finalize, filter, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-server-detail',
  templateUrl: './server-detail.component.html',
  styleUrls: ['./server-detail.component.css']
})
export class ServerDetailComponent implements OnInit, OnDestroy {
  private serverUid: string;
  private routeSubscription: Subscription;
  title$: Observable<string>;
  server$: Observable<Server>;
  private ref;
  private task;
  private uploadProgress;
  private downloadUrl: Observable<string | null>;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private auth: AuthService,
    private fileService: FileService
  ) {
    this.server$ = this.auth.user$.pipe(
      switchMap(user =>
        this.afs.doc<Server>('servers/' + this.serverUid).valueChanges()
      )
    );
    this.title$ = this.server$.pipe(
      map(server => `${server.displayName}@${server.address}`)
    );
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.serverUid = params.id;
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  upload(event) {
    const fileId = this.afs.createId();
    this.ref = this.afStorage.ref(fileId);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadUrl = this.ref.getDownloadURL();
          this.downloadUrl
            .pipe(
              filter(url => url !== null),
              take(1)
            )
            .subscribe(url => {
              this.auth.user$
                .pipe(
                  filter(userData => userData !== null),
                  take(1)
                )
                .subscribe(userData => {
                  this.fileService.addFileToServer(userData, this.serverUid, {
                    name: event.target.files[0].name,
                    downloadUrl: url
                  });
                });
            });
        })
      )
      .subscribe();
  }
}

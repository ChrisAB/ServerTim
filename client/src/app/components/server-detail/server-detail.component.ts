import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Server } from 'src/app/services/server.model';
import { switchMap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { ServerService } from 'src/app/services/server.service';

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

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private auth: AuthService
  ) {
    this.server$ = auth.user$.pipe(
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
}

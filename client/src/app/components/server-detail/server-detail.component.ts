import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, concat, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Server, ServerUsage } from 'src/app/services/server.model';
import { switchMap, map, finalize, filter, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileService } from 'src/app/services/file.service';
import * as CanvasJS from 'src/assets/canvasjs.min';

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
  private serverFiles$: Observable<any[]>;
  private selectedFile;
  fileSelected: boolean;
  private newUrl: string;
  private serverUsage: [ServerUsage];

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
    this.fileSelected = false;
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.serverUid = params.id;
      this.serverFiles$ = this.fileService.getServerFiles(this.serverUid);
    });
    this.getServerUsageData().then(data => setTimeout(() => {
      this.prepareChartData(data);
    }, 1000));
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  async getServerUsageData() {
    const snapshot = await this.afs.firestore.collection('servers').doc(`${this.serverUid}`).collection('serverUsage').get();
    return snapshot.docs.map(doc => doc.data());
  }

  prepareChartData(data) {
    let CPUData = [];
    let GPUData = [];
    let DiskData = [];
    for(let i=0;i<data.length;i++) {
      CPUData.push({y: data[i].CPU});
      GPUData.push({y: data[i].GPU});
      DiskData.push({y: data[i].GPU});
    }
    this.displayChart(CPUData, "CPUchartContainer", "CPU Usage");
    this.displayChart(GPUData, "GPUchartContainer", "GPU Usage");
    this.displayChart(DiskData, "DiskchartContainer", "Disk Usage");
  }

  displayChart(chartDataPoints, chartId, chartTitle) {
    let chart = new CanvasJS.Chart(chartId , {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: chartTitle
      },
      data: [
      {
        type: "line",                
        dataPoints: chartDataPoints
      }]
    });
      
    chart.render();
  }

  selectFile(event) {
    this.selectedFile = event.target.files[0];
    this.fileSelected = true;
    this.uploadProgress = of(null);
    this.downloadUrl = of(null);
  }

  uploadFile() {
    this.newUrl = '';
    const fileId = this.afs.createId();
    this.ref = this.afStorage.ref(fileId);
    this.task = this.ref.put(this.selectedFile);
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
              this.newUrl = url;
              this.auth.user$
                .pipe(
                  filter(userData => userData !== null),
                  take(1)
                )
                .subscribe(userData => {
                  this.fileService.addFileToServer(userData, this.serverUid, {
                    name: this.selectedFile.name,
                    downloadUrl: url
                  });
                });
            });
        })
      )
      .subscribe();
  }

  deleteFile(uid: string) {
    this.fileService.deleteFile(uid);
  }
}

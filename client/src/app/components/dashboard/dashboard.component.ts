import { Component, OnInit, Inject } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { AuthService } from '../../services/auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

export interface DialogData {
  ip: string;
  name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'Dashboard';
  ip: string;
  name: string;

  constructor(
    private auth: AuthService,
    private serverService: ServerService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  addServer() {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, ip: this.ip}
    });
    dialogRef.afterClosed().subscribe(serverData => {
      this.auth.user$.subscribe(userData => this.serverService.addServerToUser(userData, serverData));
    });
  }
}

@Component({
  selector: 'add-server',
  templateUrl: 'add-server.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
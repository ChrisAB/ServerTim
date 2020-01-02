import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddServerDialogComponent } from '../add-server-dialog/add-server-dialog.component';

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
    const dialogRef = this.dialog.open(AddServerDialogComponent, {
      width: '400px',
      data: { name: this.name, ip: this.ip }
    });
    dialogRef.afterClosed().subscribe(serverData => {
      this.auth.user$.subscribe(userData =>
        this.serverService.addServerToUser(userData, serverData)
      );
    });
  }
}

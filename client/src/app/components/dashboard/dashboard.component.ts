import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'Dashboard';

  constructor(
    private auth: AuthService,
    private serverService: ServerService
  ) {}

  ngOnInit() {
    this.serverService.getServers().subscribe(servers => {
      console.log(servers);
    });
  }
}

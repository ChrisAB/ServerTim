import { Component, OnInit, Input } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { TooltipPosition } from '@angular/material/tooltip';
@Component({
  selector: 'app-server-card',
  templateUrl: './server-card.component.html',
  styleUrls: ['./server-card.component.css']
})
export class ServerCardComponent implements OnInit {
  @Input() address: string;
  @Input() displayName: string;
  @Input() uid: string;
  constructor(private serverService: ServerService) {}

  ngOnInit() {}

  deleteServer() {
    this.serverService.deleteServer(this.uid);
  }
}

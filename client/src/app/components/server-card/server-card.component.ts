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
  usageCPU: number;
  usageGPU: number;
  usageDisk: number;
  isOnline: Boolean;
  constructor(private serverService: ServerService) {}

  ngOnInit() {
    this.serverService.getServerUsage(this.uid).subscribe(serverUsage => {
      this.usageCPU = serverUsage.CPU.toFixed(2);
      this.usageGPU = serverUsage.GPU.toFixed(2);
      this.usageDisk = serverUsage.Disk.toFixed(2);
      this.isOnline = serverUsage.Running;
      });
  }

  deleteServer() {
    this.serverService.deleteServer(this.uid);
  }
}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server-card',
  templateUrl: './server-card.component.html',
  styleUrls: ['./server-card.component.css']
})
export class ServerCardComponent implements OnInit {
  @Input() address: string;
  @Input() displayName: string;
  @Input() uid: string;
  constructor() {}

  ngOnInit() {}
}

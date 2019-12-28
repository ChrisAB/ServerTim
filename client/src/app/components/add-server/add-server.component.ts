import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ServerService } from '../../services/server.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-server',
  templateUrl: './add-server.component.html',
  styleUrls: ['./add-server.component.css']
})

export class AddServerComponent implements OnInit {
  title = 'AddServer';
  name: String;
  animal: String;
  
  constructor(
    public dialogRef: MatDialogRef<AddServerComponent>) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  ip: string;
  name: string;
}

@Component({
  selector: 'app-add-server-dialog',
  templateUrl: './add-server-dialog.component.html',
  styleUrls: ['./add-server-dialog.component.css']
})
export class AddServerDialogComponent {
  title = 'AddServer';
  name: string;
  animal: string;

  constructor(
    public dialogRef: MatDialogRef<AddServerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

import { Component, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html'
})
export class DeleteComponent {

  constructor(private dialogRef: MatDialogRef<DeleteComponent>) { }

  onDelete = () => this.dialogRef.close(true);

  @HostListener('window:keyup', ['$event'])
  action(event: KeyboardEvent) {
    if(event.key === 'Enter') {
      this.onDelete();
    }
  }

}

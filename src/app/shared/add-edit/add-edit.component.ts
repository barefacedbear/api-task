import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientService } from 'src/app/core/services/http-client.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  private _httpClient: HttpClientService) {}

  form: FormGroup;

  ngOnInit(): void {
    this.createForm();
    if(this.data.type.includes('Update')) {
      this.form.patchValue({ ...this.data });
    }
  }

  private createForm() {
    this.form = this.fb.group({ name: [''], age: [''], gender: [''], phone: [''] });
  }

  action() {
    let message = 'Successfully';
    if(this.data.type.includes('Add')) {
      this._httpClient.createUser(this.form.value).subscribe(() => message = `Added ${message}`);
    } else {
      this._httpClient.updateUser(this.form.value, this.data._id).subscribe(() => message = `Updated ${message}`);
    }
    this.dialogRef.close(message);
  }
}

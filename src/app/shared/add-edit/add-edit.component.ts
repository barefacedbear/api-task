import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientService } from 'src/app/core/services/http-client.service';
import { CustomErrorStateMatcher } from 'src/app/core/validators/error-state-matcher';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html'
})
export class AddEditComponent implements OnInit {

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  private _httpClient: HttpClientService) {}

  form: FormGroup;
  matcher = new CustomErrorStateMatcher();

  ngOnInit(): void {
    this.createForm();
    if(this.data.type.includes('Update')) {
      console.log('a');
      this.form.patchValue({ ...this.data.info });
    }
  }

  private createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required], age: ['', [Validators.required, Validators.min(10), Validators.max(60), Validators.pattern('^[0-9]*$')]],
      gender: ['', Validators.required], phone: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]]
    });
  }

  get Age() {
    return this.form.get('age');
  }

  get Phone() {
    return this.form.get('phone');
  }

  checkPhoneValue(event) {
    if (this.Phone.errors?.maxlength) {
      this.form.patchValue({ phone: event.target.value });
    }
  }

  action() {
    let message = 'Successfully';
    if(this.data.type.includes('Add')) {
      this._httpClient.createUser(this.form.value).subscribe(() => message = `Added ${message}`);
    } else {
      this._httpClient.updateUser(this.form.value, this.data.info._id).subscribe(() => message = `Updated ${message}`);
    }
    this.dialogRef.close(message);
  }
}

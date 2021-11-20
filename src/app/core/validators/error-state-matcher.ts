import { FormControl } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class CustomErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null): boolean {
        const invalidCtrl = !!(control.touched && control.invalid);
        return invalidCtrl;
    }
}

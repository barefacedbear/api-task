import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterEvent, NavigationStart } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { NotificationService } from './core/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(router: Router, matDialog: MatDialog, snackBar: MatSnackBar, _notificationService: NotificationService) {
    router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationStart),
      tap(() => matDialog.closeAll())
    ).subscribe();
    _notificationService.notification$.subscribe(response => snackBar.open(response.message, response.action, {
      panelClass: [ 'toastr-bg', response.panelClass ]
    }));
  }
}

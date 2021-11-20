import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user.model';
import { HttpClientService } from 'src/app/core/services/http-client.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AddEditComponent } from 'src/app/shared/add-edit/add-edit.component';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<User>;
  columnsToDisplay: string[] = ['name', 'age', 'gender', 'phone', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private _httpClient: HttpClientService, private _notificationService: NotificationService) { }

  ngOnInit() {
    this.getTableData();
  }

  ngOnDestroy() {
    this._notificationService.notification$.next();
  }

  private getTableData() {
    this._httpClient.getAllUsers().subscribe(response => {
      this.dataSource = new MatTableDataSource<User>(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog(data: User, title: string) {
    this.dialog.open(AddEditComponent, {
      width: '350px', data: { info: data, type: `${title} User` }, disableClose: true
    }).afterClosed().subscribe(response => {
      if (response !== false) {
        this.getTableData();
        this._notificationService.notification$.next({ message: response, action: 'SUCCESS', panelClass: 'success' });
      }
    });
  }

  delete(id: string) {
    this.dialog.open(DeleteComponent, { width: '350px', disableClose: true }).
      afterClosed().subscribe(response => {
        if (response === true) {
          this._httpClient.deleteUser(id).subscribe(() => {
            this.getTableData();
            this._notificationService.notification$.next({ message: 'Deleted Successfully', action: 'INFO', panelClass: 'info' });
          });
        }
      });
  }
}

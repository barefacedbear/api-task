import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user.model';
import { HttpClientService } from 'src/app/core/services/http-client.service';
import { AddEditComponent } from 'src/app/shared/add-edit/add-edit.component';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  dataSource: MatTableDataSource<User>;
  columnsToDisplay: string[] = ['name', 'age', 'gender', 'phone', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private _httpClient: HttpClientService) { }

  ngOnInit() {
    this.getTableData();
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
      if (response) {
        alert(response);
        this.getTableData();
      }
    });
  }

  delete(id: string) {
    this.dialog.open(DeleteComponent, { width: '350px', disableClose: true }).
      afterClosed().subscribe(response => {
        if (response) {
          this._httpClient.deleteUser(id).subscribe(() => {
            alert(response);
            this.getTableData();
          });
        }
      });
  }
}

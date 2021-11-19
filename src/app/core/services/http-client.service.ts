import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) { }

  private readonly URL = environment.api;

  createUser(data: User) {
    return this.http.post<User>(this.URL, data);
  }

  getAllUsers() {
    return this.http.get<User[]>(this.URL);
  }

  getUser(id: string) {
    return this.http.get<User>(`${this.URL}/${id}`);
  }

  updateUser(data: User, id: string) {
    return this.http.put<User>(`${this.URL}/${id}`, data);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.URL}/${id}`);
  }
}

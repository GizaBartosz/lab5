import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private api = 'http://localhost:8080/api/brands';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.api);
  }

  getById(id: string): Observable<Brand> {
    return this.http.get<Brand>(`${this.api}/${id}`);
  }

  create(b: Omit<Brand, 'id'>): Observable<Brand> {
    return this.http.post<Brand>(this.api, b);
  }

  update(id: string, b: Partial<Brand>): Observable<Brand> {
    return this.http.put<Brand>(`${this.api}/${id}`, b);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}

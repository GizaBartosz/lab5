import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Model } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class ModelService {

  private apiRoot = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getByBrand(brandId: string): Observable<Model[]> {
    return this.http.get<Model[]>(`${this.apiRoot}/brands/${brandId}/models`);
  }

  getById(brandId: string, modelId: string): Observable<Model> {
    return this.http.get<Model>(`${this.apiRoot}/models/${modelId}`);
  }

  create(
    brandId: string,
    m: { name: string | null; year: number | null }
  ): Observable<Model> {
    const body = {
      name: m.name,
      year: m.year,
    };
    return this.http.post<Model>(`${this.apiRoot}/brands/${brandId}/models`, body);
  }

  update(
    brandId: string,
    modelId: string,
    m: { name?: string | null; year?: number | null }
  ): Observable<Model> {
    const body = {
      name: m.name,
      year: m.year,
    };
    return this.http.put<Model>(`${this.apiRoot}/models/${modelId}`, body);
  }

  delete(brandId: string, modelId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiRoot}/models/${modelId}`);
  }
}

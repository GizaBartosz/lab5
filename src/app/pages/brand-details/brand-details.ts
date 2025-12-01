import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, RouterLink } from '@angular/router';
import { BrandService } from '../../services/brand';
import { ModelService } from '../../services/model';
import { Brand } from '../../models/brand';
import { Model } from '../../models/model';
import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-brand-details',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './brand-details.html',
})
export class BrandDetails {

  brandId!: string;

  brand$!: Observable<Brand>;
  models$!: Observable<Model[]>;

  constructor(
    private route: ActivatedRoute,
    private brandService: BrandService,
    private modelService: ModelService,
    private router: Router
  ) {}

  ngOnInit() {
    const brandId$ = this.route.paramMap.pipe(
      map(params => params.get('brandId')!)
    );

    this.brand$ = brandId$.pipe(
      switchMap(id => {
        this.brandId = id;
        return this.brandService.getById(id);
      })
    );

    this.models$ = brandId$.pipe(
      switchMap(brandId => this.buildModelsStream(brandId))
    );
  }

  private buildModelsStream(brandId: string): Observable<Model[]> {
    return this.modelService.getByBrand(brandId).pipe(
      switchMap(list => {
        if (!list || list.length === 0) {
          return of([]);
        }
        return forkJoin(
          list.map(m => this.modelService.getById(brandId, m.id))
        );
      })
    );
  }

  remove(modelId: string) {
    this.modelService.delete(this.brandId, modelId).subscribe({
      next: () => {
        this.models$ = this.buildModelsStream(this.brandId);
      },
      error: err => console.error('Błąd przy usuwaniu modelu', err),
    });
  }
  
  addModel() {
    this.router.navigate(['/brands', this.brandId, 'models', 'new']);
  }

  edit(m: Model) {
    this.router.navigate(['/brands', this.brandId, 'models', m.id, 'edit']);
  }

  details(m: Model) {
    this.router.navigate(['/brands', this.brandId, 'models', m.id]);
  }
}

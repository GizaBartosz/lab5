import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, RouterLink } from '@angular/router';
import { ModelService } from '../../services/model';
import { Model } from '../../models/model';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-model-details',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './model-details.html',
})
export class ModelDetails {

  brandId!: string;
  modelId!: string;

  model$!: Observable<Model>;

  constructor(
    private route: ActivatedRoute,
    private modelService: ModelService,
    private router: Router
  ) {}

  ngOnInit() {
    this.model$ = this.route.paramMap.pipe(
      map(params => {
        this.brandId = params.get('brandId')!;
        this.modelId = params.get('modelId')!;
        return { brandId: this.brandId, modelId: this.modelId };
      }),
      switchMap(({ brandId, modelId }) =>
        this.modelService.getById(brandId, modelId)
      )
    );
  }


  backToBrand() {
    this.router.navigate(['/brands', this.brandId]);
  }
}

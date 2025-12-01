import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ModelService } from '../../services/model';
import { Model } from '../../models/model';

@Component({
  selector: 'app-model-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './model-details.html',
})
export class ModelDetails {

  brandId!: string;
  modelId!: string;
  model?: Model;

  constructor(
    private route: ActivatedRoute,
    private modelService: ModelService
  ) {}

  ngOnInit() {
    this.brandId = this.route.snapshot.paramMap.get('brandId')!;
    this.modelId = this.route.snapshot.paramMap.get('modelId')!;
    this.load();
  }

  load() {
    this.modelService.getById(this.brandId, this.modelId).subscribe(m => this.model = m);
  }
}

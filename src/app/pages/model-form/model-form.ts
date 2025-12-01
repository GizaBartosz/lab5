import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ModelService } from '../../services/model';
import { Model } from '../../models/model';

@Component({
  selector: 'app-model-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './model-form.html',
})
export class ModelForm {

  brandId!: string;
  modelId?: string;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private modelService: ModelService
  ) {
    this.form = this.fb.group({
      name: [''],
      year: [''],
    });
  }

  ngOnInit() {
    this.brandId = this.route.snapshot.paramMap.get('brandId')!;
    this.modelId = this.route.snapshot.paramMap.get('modelId') ?? undefined;
    if (this.modelId) {
      this.modelService.getById(this.brandId, this.modelId).subscribe(m => {
        this.form.patchValue(m);
      });
    }
  }
  save() {
  if (!this.modelId) {
    this.modelService.create(this.brandId, this.form.value).subscribe(() =>
      this.router.navigate(['/brands', this.brandId])
    );
  } else {
    this.modelService.update(this.brandId, this.modelId, this.form.value).subscribe(() =>
      this.router.navigate(['/brands', this.brandId])
    );
  }
  }

}

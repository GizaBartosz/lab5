import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BrandService } from '../../services/brand';
import { Brand } from '../../models/brand';

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './brand-form.html',
})
export class BrandForm {

  form!: FormGroup;

  brandId?: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private brandService: BrandService
  ) {
    this.form = this.fb.group({
      name: ['']
    });
  }

  ngOnInit() {
    this.brandId = this.route.snapshot.paramMap.get('brandId') ?? undefined;

    if (this.brandId) {
      this.brandService.getById(this.brandId).subscribe(b => {
        this.form.patchValue(b);
      });
    }
  }

  save() {
    const payload = this.form.value as Omit<Brand, 'id'>;
    if (!this.brandId) {
      this.brandService.create(payload).subscribe(() =>
        this.router.navigate(['/brands'])
      );
    } else {
      this.brandService.update(this.brandId, payload).subscribe(() =>
        this.router.navigate(['/brands'])
      );
    }
  }
}

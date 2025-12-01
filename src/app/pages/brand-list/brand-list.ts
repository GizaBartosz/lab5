import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { BrandService } from '../../services/brand';
import { Brand } from '../../models/brand';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './brand-list.html',
  styleUrl: './brand-list.css',
})
export class BrandList {
  brands$: Observable<Brand[]>;
  brands: Brand[] = [];


  constructor(
    private brandService: BrandService,
    private router: Router
  ) {
    this.brands$ = this.brandService.getAll();
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.brandService.getAll().subscribe((b) => (this.brands = b));
  }

  add() {
    this.router.navigate(['/brands/new']);
  }

  edit(b: Brand) {
    this.router.navigate(['/brands', b.id, 'edit']);
  }

  details(b: Brand) {
    this.router.navigate(['/brands', b.id]);
  }

  remove(b: Brand) {
    if (!confirm(`Usuń markę "${b.name}"?`)) {
      return;
    }
    this.brandService.delete(b.id).subscribe({
      next: () => this.load(),
      error: err => console.error('Błąd przy usuwaniu marki', err),
    });
  }
}

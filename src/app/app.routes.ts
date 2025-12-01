import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'brands', pathMatch: 'full' },

  {
    path: 'brands',
    loadComponent: () =>
      import('./pages/brand-list/brand-list').then(m => m.BrandList)
  },

  {
    path: 'brands/new',
    loadComponent: () =>
      import('./pages/brand-form/brand-form').then(m => m.BrandForm)
  },

  {
    path: 'brands/:brandId/edit',
    loadComponent: () =>
      import('./pages/brand-form/brand-form').then(m => m.BrandForm)
  },

    {
    path: 'brands/:brandId/delete',
    loadComponent: () =>
      import('./pages/brand-list/brand-list').then(m => m.BrandList)
  },

  {
    path: 'brands/:brandId',
    loadComponent: () =>
      import('./pages/brand-details/brand-details').then(m => m.BrandDetails)
  },

  {
    path: 'brands/:brandId/models/new',
    loadComponent: () =>
      import('./pages/model-form/model-form').then(m => m.ModelForm)
  },

  {
    path: 'brands/:brandId/models/:modelId/edit',
    loadComponent: () =>
      import('./pages/model-form/model-form').then(m => m.ModelForm)
  },

    {
    path: 'brands/:brandId/models/:modelId/delete',
    loadComponent: () =>
      import('./pages/model-form/model-form').then(m => m.ModelForm)
  },


  {
    path: 'brands/:brandId/models/:modelId',
    loadComponent: () =>
      import('./pages/model-details/model-details').then(m => m.ModelDetails)
  }
];

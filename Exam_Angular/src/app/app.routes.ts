import { Routes } from '@angular/router';
import { AccueilComponent } from './composants/accueil/accueil.component';
import { CatalogueComponent } from './composants/catalogue/catalogue.component';
import { PanierComponent } from './composants/panier/panier.component';

export const routes: Routes = [
    { path: '', component: AccueilComponent },
    { path: 'catalogue', component: CatalogueComponent },
    { path: 'panier', component: PanierComponent },
    { path: '**', redirectTo: '' }
];

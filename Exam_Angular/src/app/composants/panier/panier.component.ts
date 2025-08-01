import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PanierService } from '../../services/panier.service';
import { PanierItem } from '../../models/article.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent implements OnInit {
  panierItems$: Observable<PanierItem[]>;

  constructor(private panierService: PanierService) {
    this.panierItems$ = this.panierService.panier$;
  }

  ngOnInit(): void { }

  updateQuantity(articleId: number, quantity: number): void {
    this.panierService.updateQuantity(articleId, quantity);
  }

  removeFromPanier(articleId: number): void {
    this.panierService.removeFromPanier(articleId);
  }

  clearPanier(): void {
    this.panierService.clearPanier();
  }

  getPanierTotal(): number {
    return this.panierService.getPanierTotal();
  }

  getTotalItems(): number {
    return this.panierService.getPanierItemsCount();
  }

  getDiscountedPrice(article: any): number {
    if (!article || typeof article.fullPrice !== 'number') {
      return 0;
    }
    return article.fullPrice * (1 - (article.discountPercent || 0));
  }

  getItemTotal(item: PanierItem): number {
    if (!item || !item.article || typeof item.article.fullPrice !== 'number') {
      return 0;
    }
    const price = item.article.discountPercent > 0
      ? this.getDiscountedPrice(item.article)
      : item.article.fullPrice;
    return price * item.quantity;
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/panier.service';
import { CartItem } from '../../models/article.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent implements OnInit {
  panierItems$: Observable<CartItem[]>;

  constructor(private cartService: CartService) {
    this.panierItems$ = this.cartService.panier$;
  }

  ngOnInit(): void { }

  updateQuantity(articleId: number, quantity: number): void {
    this.cartService.updateQuantity(articleId, quantity);
  }

  removeFromPanier(articleId: number): void {
    this.cartService.removeFromPanier(articleId);
  }

  clearPanier(): void {
    this.cartService.clearPanier();
  }

  getPanierTotal(): number {
    return this.cartService.getPanierTotal();
  }

  getTotalItems(): number {
    return this.cartService.getPanierItemsCount();
  }

  getDiscountedPrice(article: any): number {
    if (!article || typeof article.fullPrice !== 'number') {
      return 0;
    }
    return article.fullPrice * (1 - (article.discountPercent || 0));
  }

  getItemTotal(item: CartItem): number {
    if (!item || !item.article || typeof item.article.fullPrice !== 'number') {
      return 0;
    }
    const price = item.article.discountPercent > 0
      ? this.getDiscountedPrice(item.article)
      : item.article.fullPrice;
    return price * item.quantity;
  }
}

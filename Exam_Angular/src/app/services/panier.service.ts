import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article, CartItem } from '../models/article.interface';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private panierItems: CartItem[] = [];
    private panierSubject = new BehaviorSubject<CartItem[]>([]);
    public panier$ = this.panierSubject.asObservable();

    constructor() { }

    addToPanier(article: Article, quantity: number = 1): void {
        if (!article || !article.id) {
            console.error('Invalid article data provided to addToPanier');
            return;
        }

        const existingItem = this.panierItems.find(item => item.article?.id === article.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.panierItems.push({ article, quantity });
        }

        this.panierSubject.next([...this.panierItems]);
    }

    removeFromPanier(articleId: number): void {
        this.panierItems = this.panierItems.filter(item => item.article?.id !== articleId);
        this.panierSubject.next([...this.panierItems]);
    }

    updateQuantity(articleId: number, quantity: number): void {
        const item = this.panierItems.find(item => item.article?.id === articleId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromPanier(articleId);
            } else {
                item.quantity = quantity;
                this.panierSubject.next([...this.panierItems]);
            }
        }
    }

    getPanierTotal(): number {
        return this.panierItems.reduce((total, item) => {
            if (!item.article || typeof item.article.fullPrice !== 'number') {
                return total;
            }
            const discountedPrice = item.article.fullPrice * (1 - (item.article.discountPercent || 0));
            return total + (discountedPrice * item.quantity);
        }, 0);
    }

    getPanierItemsCount(): number {
        return this.panierItems.reduce((count, item) => count + item.quantity, 0);
    }

    clearPanier(): void {
        this.panierItems = [];
        this.panierSubject.next([]);
    }
}

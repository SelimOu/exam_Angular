import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../../models/article.interface';
import { PanierService } from '../../services/panier.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {
  @Input() article!: Article;

  constructor(private panierService: PanierService) { }

  getDiscountedPrice(): number {
    if (!this.article) return 0;
    return this.article.fullPrice * (1 - this.article.discountPercent);
  }

  addToPanier(): void {
    if (this.article && this.article.id) {
      this.panierService.addToPanier(this.article);
    } else {
      console.error('Article data is missing or invalid');
    }
  }
}

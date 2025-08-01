import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.interface';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit {
  articlesEnPromo: Article[] = [];
  loading = true;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getAll().subscribe(articles => {
      this.articlesEnPromo = articles.filter(article => article.discountPercent > 0);
      this.loading = false;
    });
  }

  getPrixPromo(article: Article): number {
    return article.fullPrice * (1 - article.discountPercent);
  }

  getPourcentagePromo(discountPercent: number): number {
    return Math.round(discountPercent * 100);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.interface';
import { ArticlesComponent } from '../articles/articles.component';


@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ArticlesComponent],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css'
})
export class CatalogueComponent implements OnInit {
  articles: Article[] = [];
  categories: string[] = [];
  filterForm: FormGroup;
  filteredArticles: Article[] = [];

  constructor(
    private articleService: ArticleService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      category: [''],
      maxPrice: [1000],
      onlyPromotions: [false]
    });
  }
  loading: boolean = true;
  ngOnInit(): void {
    this.articleService.getAll().subscribe(articles => {
      this.articles = articles;
      this.categories = [...new Set(articles.map(article => article.category))];
      this.filteredArticles = articles;
      this.loading = false;
    });


    this.filterForm.valueChanges.subscribe(filters => {
      this.filteredArticles = this.applyFilters(this.articles, filters);
    });
  }

  private applyFilters(articles: Article[], filters: any): Article[] {
    return articles.filter(article => {
      if (filters.category && article.category !== filters.category) {
        return false;
      }

      const effectivePrice = article.fullPrice * (1 - article.discountPercent);
      if (effectivePrice > filters.maxPrice) {
        return false;
      }

      if (filters.onlyPromotions && article.discountPercent === 0) {
        return false;
      }

      return true;
    });
  }
}

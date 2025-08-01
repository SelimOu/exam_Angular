import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PanierService } from '../../services/panier.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PanierItem } from '../../models/article.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  panierItemsCount$: Observable<number>;

  constructor(private panierService: PanierService) {
    this.panierItemsCount$ = this.panierService.panier$.pipe(
      map((items: PanierItem[]) => items.reduce((count: number, item: PanierItem) => count + item.quantity, 0))
    );
  }

  ngOnInit(): void { }
}

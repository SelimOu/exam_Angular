import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/panier.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from '../../models/article.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  panierItemsCount$: Observable<number>;

  constructor(private cartService: CartService) {
    this.panierItemsCount$ = this.cartService.panier$.pipe(
      map((items: CartItem[]) => items.reduce((count: number, item: CartItem) => count + item.quantity, 0))
    );
  }

  ngOnInit(): void { }
}

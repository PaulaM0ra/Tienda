import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ProductsI } from 'src/app/services/models/products.models';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: false,
})
export class ProductsPage implements OnInit {
  category: string | null = null;
  products$: Observable<ProductsI[]> = of([]);

  filteredProducts = [];

  constructor(
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {
    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.category = params.get('category');
        return this.category
          ? this.firebaseService.getCollectionChanges<ProductsI>(
              'products',
              'category',
              '==',
              this.category
            )
          : this.firebaseService.getCollectionChanges<ProductsI>('products');
      })
    );
  }

  ngOnInit() {}

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}

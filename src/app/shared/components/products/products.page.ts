import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Observable,
  of,
  switchMap,
  BehaviorSubject,
  combineLatest,
} from 'rxjs';
import { map } from 'rxjs/operators';
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
  filteredProducts$: Observable<ProductsI[]> = of([]);
  private searchTerm = new BehaviorSubject<string>('');

  constructor(
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {
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

    this.filteredProducts$ = combineLatest([
      this.products$,
      this.searchTerm,
    ]).pipe(
      map(([products, term]) =>
        products.filter((product) =>
          product.name.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  }

  filterProducts(event: any) {
    this.searchTerm.next(event.target.value);
  }

  addToCart(product: ProductsI) {
    this.cartService.addToCart(product);
  }
}

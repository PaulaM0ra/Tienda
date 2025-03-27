import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: false,
})
export class ProductsPage implements OnInit {
  category: string | null = null;
  products = [
    {
      name: 'Laptop 1',
      image: 'assets/laptop1.png',
      category: 'laptops',
      price: 1500,
    },
    {
      name: 'Laptop 2',
      image: 'assets/laptop2.png',
      category: 'laptops',
      price: 1200,
    },
    {
      name: 'Phone 1',
      image: 'assets/phone1.png',
      category: 'phones',
      price: 800,
    },
    {
      name: 'Tablet 1',
      image: 'assets/tablet1.png',
      category: 'tablets',
      price: 600,
    },
  ];
  filteredProducts = [];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.category = params.get('category');
      this.filteredProducts = this.products.filter(
        (p) => p.category === this.category
      );
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert(`${product.name} agregado al carrito`);
  }
}

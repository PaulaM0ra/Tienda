import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  cartItemCount = 0;

  categories = [
    {
      name: 'Portátiles',
      image: 'assets/laptop.png',
      path: 'main/home/products/laptops',
    },
    {
      name: 'Celulares',
      image: 'assets/phone.png',
      path: 'main/home/products/phones',
    },
    {
      name: 'Tabletas',
      image: 'assets/tablet.png',
      path: 'main/home/products/tablets',
    },
    {
      name: 'Relojes',
      image: 'assets/watch.png',
      path: 'main/home/products/watches',
    },
  ];

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartItemCount().subscribe((count) => {
      this.cartItemCount = count;
    });
  }

  navigateToCategory(path: string) {
    this.router.navigate([path]);
  }
}

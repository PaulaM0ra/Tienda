import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, OnDestroy {
  cartItemCount = 0;
  bannerImages: string[] = [
    'assets/images/banner.webp',
    'assets/images/banner2.png',
    'assets/images/banner3.png',
  ];
  bannerImage: string = this.bannerImages[0]; 
  private bannerInterval: any;

  categories = [
    {
      name: 'Portátiles',
      image: 'assets/images/Portatil.webp',
      path: 'main/home/products/laptops',
    },
    {
      name: 'Celulares',
      image: 'assets/images/Phone.webp',
      path: 'main/home/products/phones',
    },
    {
      name: 'Tabletas',
      image: 'assets/images/Tablets.webp',
      path: 'main/home/products/tablets',
    },
    {
      name: 'Relojes',
      image: 'assets/images/Watch.webp',
      path: 'main/home/products/watches',
    },
  ];

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
   
    this.cartService.getCartItemCount().subscribe((count) => {
      this.cartItemCount = count;
    });


    this.startBannerRotation();
  }

  ngOnDestroy() {
    if (this.bannerInterval) {
      clearInterval(this.bannerInterval);
    }
  }

  startBannerRotation() {
    let index = 0;
    this.bannerInterval = setInterval(() => {
      index = (index + 1) % this.bannerImages.length;
      this.bannerImage = this.bannerImages[index];
    }, 5000); 
  }

  navigateToCategory(path: string) {
    this.router.navigate([path]);
  }
}

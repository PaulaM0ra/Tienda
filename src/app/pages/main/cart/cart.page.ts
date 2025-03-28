import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false,
})
export class CartPage implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCart();
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
    this.cartItems = this.cartService.getCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
  async checkout() {
    if (this.cartItems.length === 0) {
      this.presentAlert('Carrito vacío', 'Agrega productos antes de finalizar la compra.');
      return;
    }


    this.presentAlert('Compra exitosa', 'Gracias por tu compra.').then(() => {
      this.clearCart(); 
      this.router.navigate(['/main/home']); 
    });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}

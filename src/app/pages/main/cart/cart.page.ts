import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { getAuth } from 'firebase/auth';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false,
})
export class CartPage implements OnInit {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
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
      this.presentAlert(
        'Carrito vacío',
        'Agrega productos antes de finalizar la compra.'
      );
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user || !user.email) {
      console.error('No se encontró el email del usuario.');
      this.presentAlert('Error', 'No se pudo obtener tu correo electrónico.');
      return;
    }

    const emailParams = {
      email: user.email.trim(),
      cost: '$' + this.getTotalPrice().toFixed(2) + ' COP',
    };

    console.log('Enviando correo a:', emailParams.email);

    emailjs
      .send(
        'service_w17lcwr',
        'template_jmhej58',
        emailParams,
        'LhWrsaRearhidrwt9'
      )
      .then(() => {
        this.presentAlert(
          'Compra exitosa',
          'Gracias por tu compra. Revisa tu correo.'
        );
        this.clearCart();
        this.router.navigate(['/main/home']);
      })
      .catch((error) => {
        console.error('Error enviando el correo', error);
        this.presentAlert(
          'Error',
          'No se pudo enviar el correo de confirmación.'
        );
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

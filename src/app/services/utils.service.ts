import { Injectable, inject } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);

  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' });
  }

  async presentToast(
    message: string,
    color: 'success' | 'warning' | 'danger' = 'success'
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top',
      color,
    });
    toast.present();
  }
}

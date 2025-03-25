import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { UtilsService } from 'src/app/services/utils.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: false,
})
export class ForgotPasswordPage {
  form = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] })
  });

  constructor(
    private auth: Auth,
    private utilsSvc: UtilsService,
    private loadingCtrl: LoadingController,
    private router: Router

  ) {}

  goBack() {
    this.router.navigate(['/auth']);
  }

  async resetPassword() {
    if (this.form.valid) {
      const loading = await this.loadingCtrl.create({ message: 'Enviando correo...' });
      await loading.present();

      try {
        await sendPasswordResetEmail(this.auth, this.form.value.email);
        await this.utilsSvc.presentToast('Correo de recuperación enviado', 'success');
      } catch (error) {
        await this.utilsSvc.presentToast('Error al enviar el correo', 'danger');
      } finally {
        await loading.dismiss();
      }
    }
  }
}

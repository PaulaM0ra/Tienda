import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { LoadingController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: false,
})
export class AuthPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  constructor(
    private auth: Auth,
    private loadingCtrl: LoadingController,
    private utilsSvc: UtilsService
  ) {}

  ngOnInit() {}

  async submit() {
    if (this.form.valid) {
      const loading = await this.loadingCtrl.create({ message: 'Cargando...' });
      await loading.present();

      const { email, password } = this.form.value;

      try {
        const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
        console.log('Usuario autenticado:', userCredential.user);
        await this.utilsSvc.presentToast('Inicio de sesión exitoso', 'success'); // ✅ Corrección aquí
      } catch (error) {
        console.error('Error en la autenticación:', error.message);
        await this.utilsSvc.presentToast('Correo o contraseña incorrectos', 'danger'); // ✅ Corrección aquí
      } finally {
        await loading.dismiss();
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}

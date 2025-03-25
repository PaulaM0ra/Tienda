import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { LoadingController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router'; // ✅ Importar Router

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
    private utilsSvc: UtilsService,
    private router: Router // ✅ Inyectar Router
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
        await this.utilsSvc.presentToast('Inicio de sesión exitoso', 'success');

        // ✅ Redirigir al usuario a la página Home
        this.router.navigate(['/main/home']);
      } catch (error) {
        console.error('Error en la autenticación:', error.message);
        await this.utilsSvc.presentToast('Correo o contraseña incorrectos', 'danger');
      } finally {
        await loading.dismiss();
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}

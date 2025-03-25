import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { LoadingController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: false,
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  constructor(
    private auth: Auth,
    private loadingCtrl: LoadingController,
    private utilsSvc: UtilsService,
    private router: Router
  ) {}

  ngOnInit() {}
  goBack() {
    this.router.navigate(['/auth']); 
  }
  async submit() {
    if (this.form.valid) {
      const loading = await this.loadingCtrl.create({ message: 'Registrando...' });
      await loading.present();

      const { name, email, password } = this.form.value;

      try {
        const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

        await updateProfile(userCredential.user, { displayName: name });
        console.log('Usuario registrado:', userCredential.user);
        await this.utilsSvc.presentToast('Registro exitoso', 'success');
      } catch (error: any) {
        console.error('Error en el registro:', error.message);
        await this.utilsSvc.presentToast('Error en el registro: ' + error.message, 'danger');
      } finally {
        await loading.dismiss();
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}

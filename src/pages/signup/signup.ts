import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(public navCtrl: NavController,
             public menu: MenuController,
             public navParams: NavParams,
             public formBuilder: FormBuilder) {

              this.formGroup = this.formBuilder.group({
                nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
                email: ['', [Validators.email]],
                tipoCliente: ['', [Validators.required]],
                idLegal: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
                senha: ['', [Validators.required]],
                logradouro: ['', [Validators.required]],
                numero: ['', []],
                complemento: ['', []],
                bairro: ['', [Validators.required]],
                cep: ['', [Validators.required]],
                telefone1: ['', []],
                estadoId: ['', [Validators.required]],
                cidadeId: ['', [Validators.required]]
              });

  }

  signupUser(){
    console.log('Enviou o form')
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave(){
    this.menu.swipeEnable(true);
  }

}

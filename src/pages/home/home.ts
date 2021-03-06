import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credenciais: CredenciaisDTO = {
    email: "",
    senha: ""
  }
    
  
  constructor(public navCtrl: NavController, 
              public menu: MenuController,
              public auth: AuthService,
              public storage: StorageService) {

  }

  login(){
    // Empilha uma tela sobre a outra - botão de voltar
    //this.navCtrl.push('CategoriasPage');

    this.auth.authenticate(this.credenciais)
            .subscribe(response =>{
              this.auth.successfulLogin(response.headers.get('Authorization'));
              this.navCtrl.setRoot('CategoriasPage');
            },
            error => {});
  }

  signUp(){
    this.navCtrl.push('SignupPage');
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave(){
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter(){
    this.auth.refreshToken()
             .subscribe(response => {
               this.auth.successfulLogin(response.headers.get('Authorization'));
               this.navCtrl.setRoot('CategoriasPage');
             },
             error => {});
  }

  

}

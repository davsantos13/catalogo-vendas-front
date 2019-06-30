import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';


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
    
  
  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  login(){
    // Empilha uma tela sobre a outra - botão de voltar
    //this.navCtrl.push('CategoriasPage');
    // Coloca a classe independente
    console.log(this.credenciais);
    this.navCtrl.setRoot('CategoriasPage');
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

}

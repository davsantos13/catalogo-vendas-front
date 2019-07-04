import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../services/domain/cliente.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { updateDate } from 'ionic-angular/umd/util/datetime-util';
import { CidadeService } from '../../services/domain/cidade.service';
import { text } from '@angular/core/src/render3/instructions';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(public navCtrl: NavController,
             public menu: MenuController,
             public navParams: NavParams,
             public formBuilder: FormBuilder,
             public cidadeService: CidadeService,
             public estadoService: EstadoService,
             public clienteService: ClienteService,
             public alertCtrl: AlertController) {

              this.formGroup = this.formBuilder.group({
                nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
                email: ['joaquim@gmail.com', [Validators.email]],
                tipoCliente: ['1', [Validators.required]],
                idLegal: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
                senha: ['123', [Validators.required]],
                logradouro: ['Rua Via', [Validators.required]],
                numero: ['25', []],
                complemento: ['Apto 3', []],
                bairro: ['Copacabana', [Validators.required]],
                cep: ['10828333', [Validators.required]],
                telefone1: ['977261827', []],
                estadoId: [null, [Validators.required]],
                cidadeId: [null, [Validators.required]]
              });

  }

  signupUser(){
    this.clienteService.insert(this.formGroup.value)
                       .subscribe(response => {
                         this.insertOk();
                       }, error => {});
  }

  insertOk(){
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.setRoot('HomePage');
          }
        }
      ]
    });
    alert.present();
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave(){
    this.menu.swipeEnable(true);
  }

  ionViewDidLoad(){
    this.estadoService.findAll()
              .subscribe(response => {
                this.estados = response;
                this.formGroup.controls.estadoId.setValue(this.estados[0].id);
                this.updateCidades();
              }, 
              error => {});
  }

  updateCidades(){
    let estadoId = this.formGroup.value.estadoId;
    this.cidadeService.findAllCidades(estadoId)
              .subscribe(response => {
                this.cidades = response;
                this.formGroup.controls.cidadeId.setValue(null);
              }, 
              error => {});
  }

}

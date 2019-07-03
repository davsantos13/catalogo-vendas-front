import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../services/domain/cliente.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { updateDate } from 'ionic-angular/umd/util/datetime-util';
import { CidadeService } from '../../services/domain/cidade.service';

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
             public estadoService: EstadoService) {

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

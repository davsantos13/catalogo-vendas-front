import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtodetail',
  templateUrl: 'produtodetail.html',
})
export class ProdutodetailPage {

  item: ProdutoDTO;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let id = this.navParams.get('id');
    this.produtoService.findById(id)
              .subscribe(response => {
                  this.item = response;
                  this.getImageIfExist();
              },
              error => {});

  }

  getImageIfExist(){
    this.produtoService.getImageFromBucket(this.item.id)
                      .subscribe(response => {
                          this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
                      },
                      error => {});
  }

}

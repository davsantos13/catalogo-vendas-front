import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public produdoService: ProdutoService,
               public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let categoriaId = this.navParams.get('cat');
    let loader = this.presentLoading();
    this.produdoService.findByCategoria(categoriaId)
          .subscribe(response => {
            this.items = response['content'];
            loader.dismiss();
            this.loadImageUrls();
          }, 
          error => {
            loader.dismiss();
          }
          );
  }

  loadImageUrls(){
    for(var i = 0; i < this.items.length; i++){
      let item = this.items[i];
      this.produdoService.getSmallImageFromBucket(item.id)
                .subscribe(response => {
                    item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`
                }, error => {});
    }
  }

  showDetail(produtoId: string){
    this.navCtrl.push('ProdutodetailPage', {id: produtoId});
  }

  presentLoading(){
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });

    loader.present();
    return loader;
  }

}
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

  //Iniciando lista de produtos vazia, para poder concatenarmos com as próximas páginas
  items: ProdutoDTO[] = [];
  page: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public produdoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let categoriaId = this.navParams.get('cat');
    let loader = this.presentLoading();
    this.produdoService.findByCategoria(categoriaId, this.page, 10)
      .subscribe(response => {
        let start = this.items.length;
        //concatenando os novos produtos com os que já estavam na lista
        this.items = this.items.concat(response['content']);
        let end = this.items.length;
        loader.dismiss();
        this.loadImageUrls(start, end);
      },
        error => {
          loader.dismiss();
        }
      );
  }

  loadImageUrls(start: number, end: number) {
    for (var i = start; i < end; i++) {
      let item = this.items[i];
      this.produdoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`
        }, error => { });
    }
  }

  showDetail(produtoId: string) {
    this.navCtrl.push('ProdutodetailPage', { id: produtoId });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });

    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    // Após 1 segundo, o refresher é desativado com o .complete()
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll){
    this.page++;
    this.loadData();

    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }

}
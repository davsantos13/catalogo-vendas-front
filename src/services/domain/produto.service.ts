import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class ProdutoService{

    constructor(public http: HttpClient){

    }

    findByCategoria(categoriaId: string, page: number = 0, linesPerPage: number = 24){
      return this.http.get(`${API_CONFIG.baseUrl}/produtos?categorias=${categoriaId}&page=${page}&linesPerPage=${linesPerPage}`);
    }

    getSmallImageFromBucket(produtoId: string): Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/prod${produtoId}-small.jpg`;
        return this.http.get(url, {responseType: 'blob'});
    }

    findById(produtoId: string){
      return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produtoId}`);
    }

    getImageFromBucket(produtoId: string): Observable<any>{
      let url = `${API_CONFIG.bucketBaseUrl}/prod${produtoId}.jpg`;
      return this.http.get(url, {responseType : 'blob'});
    }
}
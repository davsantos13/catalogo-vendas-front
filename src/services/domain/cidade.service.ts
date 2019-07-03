import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CidadeDTO } from "../../models/cidade.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class CidadeService {

    constructor(public http: HttpClient){

    }

    findAllCidades(estadoId: string): Observable<CidadeDTO[]>{
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estadoId}/cidades`);
    }
}
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ResponseType } from "@angular/http";
import { ImageUtilService } from "../image-util.service";

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient,
        public storage: StorageService,
        public imageUtilService: ImageUtilService) {
    }

    findByEmail(email: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cliente${id}.jpg`
        return this.http.get(url, { responseType: 'blob' });
    }

    insert(clienteDTO: ClienteDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/clientes`,
            clienteDTO, {
                observe: 'response',
                responseType: 'text'
            });
    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    uploadPicture(picture) {
        let imageBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData: FormData = new FormData();
        formData.set('file', imageBlob, 'file.png');

        return this.http.post(`${API_CONFIG.baseUrl}/clientes/picture`,
            formData, {
                observe: 'response',
                responseType: 'text'
            });
    }
}
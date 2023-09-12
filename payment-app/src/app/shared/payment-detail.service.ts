import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentDetail } from './Interfaces';


@Injectable({
    providedIn: 'root'
})
export class PaymentDetailService {
    apiUrl: string = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    getPaymentDetailList$(): Observable<PaymentDetail[]> {
        return this.http.get<PaymentDetail[]>(`${this.apiUrl}/PaymentDetail`);
    }
}

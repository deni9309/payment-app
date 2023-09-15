import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreatePaymentDetail, PaymentDetail } from './Interfaces';


@Injectable({
    providedIn: 'root'
})
export class PaymentDetailService {
    apiUrl: string = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    getPaymentDetailList$(): Observable<PaymentDetail[]> {
        return this.http.get<PaymentDetail[]>(`${this.apiUrl}/payment-detail`);
    }

    addPaymentDetail$(data: CreatePaymentDetail): Observable<PaymentDetail> {
        return this.http.post<PaymentDetail>(`${this.apiUrl}/payment-detail`, { ...data })
    }
}

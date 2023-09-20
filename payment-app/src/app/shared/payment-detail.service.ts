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

    editPaymentDetail$(id: string, data: PaymentDetail): Observable<PaymentDetail> {
        return this.http.put<PaymentDetail>(`${this.apiUrl}/payment-detail/${id}`, { ...data });
    }

    deletePaymentDetail$(paymentId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/payment-detail/${paymentId}`);
    }
}

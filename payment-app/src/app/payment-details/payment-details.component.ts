import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { BehaviorSubject, combineLatest, mergeMap, withLatestFrom } from 'rxjs';
import { PaymentDetail } from '../shared/Interfaces'

@Component({
    selector: 'app-payment-details',
    templateUrl: './payment-details.component.html',
    styleUrls: [ './payment-details.component.scss' ]
})
export class PaymentDetailsComponent implements OnInit {
    paymentList: PaymentDetail[] = [];

    refetchPaymentList$$ = new BehaviorSubject(undefined);

    constructor(private paymentService: PaymentDetailService) { }

    ngOnInit(): void {
        combineLatest([
            this.refetchPaymentList$$.pipe(
                mergeMap(() => this.paymentService.getPaymentDetailList$())
            )
        ]).subscribe({
            next: ([ paymentList ]) => {
                this.paymentList = paymentList;
            },
            error: err => {
                console.error(err.error.message);
            }
        })
    }

    refetch(): void {
        this.refetchPaymentList$$.next(undefined);
        console.log('just reloaded list');

    }

    refetchOnFormSubmit(value: any) {
        this.refetchPaymentList$$.next(undefined);
        console.log('new item added via form');

    }

}

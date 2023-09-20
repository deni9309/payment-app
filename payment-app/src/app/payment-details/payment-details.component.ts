import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { BehaviorSubject, combineLatest, mergeMap, withLatestFrom } from 'rxjs';
import { PaymentDetail } from '../shared/Interfaces'
import { Router } from '@angular/router';

@Component({
    selector: 'app-payment-details',
    templateUrl: './payment-details.component.html',
    styleUrls: [ './payment-details.component.scss' ]
})
export class PaymentDetailsComponent implements OnInit {
    paymentList: PaymentDetail[] = [];
    selectedListItem: PaymentDetail | undefined = undefined;

    refetchPaymentList$$ = new BehaviorSubject(undefined);

    constructor(private paymentService: PaymentDetailService, private router: Router) { }

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

    paymentListTrackBy(index: number, paymentDetail: PaymentDetail) {
        return paymentDetail.paymentDetailId;
    }

    refetch(): void {
        this.refetchPaymentList$$.next(undefined);
        console.log('just reloaded list');

    }

    refetchOnFormSubmit(value: any) {
        this.refetchPaymentList$$.next(undefined);
    }

    paymentDetailDeleteHandler(paymentId: string) {
        this.paymentService.deletePaymentDetail$(paymentId).subscribe({
            next: () => {
                this.refetch();
            },
            error: err => {
                console.error(err.error.message);
                this.router.navigate([ '/error' ])
            }
        })
    }

    populateForm(selectedRecord: PaymentDetail) {
        this.selectedListItem = selectedRecord;
    }

}

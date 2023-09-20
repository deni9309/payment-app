import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, combineLatest, mergeMap } from 'rxjs';

import { PaymentDetailService } from '../shared/payment-detail.service';
import { PaymentDetail } from '../shared/Interfaces'

@Component({
    selector: 'app-payment-details',
    templateUrl: './payment-details.component.html',
    styleUrls: [ './payment-details.component.scss' ]
})
export class PaymentDetailsComponent implements OnInit {
    paymentList: PaymentDetail[] = [];
    selectedListItem: PaymentDetail | undefined = undefined;

    refetchPaymentList$$ = new BehaviorSubject(undefined);

    constructor(
        private paymentService: PaymentDetailService,
        private router: Router,
        private toastr: ToastrService) { }

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
        if (confirm('Are you sure you want to delete this payment detail?')) {
            this.paymentService.deletePaymentDetail$(paymentId).subscribe({
                next: () => {
                    this.refetch();
                    this.toastr.error('Deleted successfully.', 'Delete payment detail');
                },
                error: err => {
                    console.error(err.error.message);
                    this.router.navigate([ '/error' ]);
                }
            })
        }
    }

    populateForm(selectedRecord: PaymentDetail) {
        this.selectedListItem = selectedRecord;
    }

}

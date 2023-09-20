import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CreatePaymentDetail, PaymentDetail } from 'src/app/shared/Interfaces';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
    selector: 'app-payment-detail-form',
    templateUrl: './payment-detail-form.component.html',
    styleUrls: [ './payment-detail-form.component.scss' ]
})
export class PaymentDetailFormComponent implements OnChanges {
    @ViewChild('formData') formData!: NgForm;
    formSubmitted: boolean = false;
    isEditMode: boolean = false;

    @Input() itemToEdit: PaymentDetail | undefined;
    @Output() paymentFormSubmittedEvent = new EventEmitter<any>();

    constructor(
        private paymentService: PaymentDetailService,
        private toastr: ToastrService,
        private router: Router
    ) { }

    ngOnChanges(): void {
        if (this.itemToEdit !== undefined) {
            this.isEditMode = true;
            setTimeout(() => {
                this.populateForm(this.itemToEdit!);
            })
        }
    }

    formSubmitHandler(form: NgForm) {
        this.formSubmitted = true;
        if (form.invalid) return;

        const { cardOwnerName, cardNumber, expirationDate, securityCode } = form.value;
        const data: CreatePaymentDetail = { cardOwnerName, cardNumber, expirationDate, securityCode }

        this.paymentService.addPaymentDetail$(data).subscribe({
            next: () => {
                this.onFormSubmitEventEmitter();
                form.reset();
                this.formSubmitted = false;
            },
            error: err => {
                console.error(err.error.message);
                this.router.navigate([ '/error' ]);
            },
            complete: () => {
                this.toastr.success('Inserted successfully.', 'Payment detail register');
            }
        })
    }

    populateForm(item: PaymentDetail) {
        this.formData.form.patchValue({
            cardOwnerName: item.cardOwnerName,
            cardNumber: item.cardNumber,
            expirationDate: item.expirationDate,
            securityCode: item.securityCode,
        });
    }

    formEditSubmitHandler(form: NgForm) {
        this.formSubmitted = true;
        if (form.invalid) return;

        const { cardOwnerName, cardNumber, expirationDate, securityCode } = form.value;
        const id: string = this.itemToEdit!.paymentDetailId

        this.paymentService.editPaymentDetail$(id, {
            paymentDetailId: id,
            cardOwnerName,
            cardNumber,
            expirationDate,
            securityCode
        } as PaymentDetail).subscribe({
            next: () => {
                this.onFormSubmitEventEmitter();
                form.reset();
                this.formSubmitted = false;
                this.isEditMode = false;
            },
            error: err => {
                console.error(err.error.message);
                this.router.navigate([ '/error' ]);
            },
            complete: () => {
                this.toastr.info('Updated successfully.', 'Payment detail edit');
            }
        })
    }

    onFormSubmitEventEmitter() {
        this.paymentFormSubmittedEvent.emit(undefined);
    }
}

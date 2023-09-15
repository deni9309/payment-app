import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CreatePaymentDetail, PaymentDetail } from 'src/app/shared/Interfaces';
import { PaymentDetailModel } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
    selector: 'app-payment-detail-form',
    templateUrl: './payment-detail-form.component.html',
    styleUrls: [ './payment-detail-form.component.scss' ]
})
export class PaymentDetailFormComponent {
    @ViewChild('formData') formData!: NgForm;

    @Output() paymentFormSubmittedEvent = new EventEmitter<any>();

    constructor(private paymentService: PaymentDetailService) { }

    formSubmitHandler(form: NgForm) {
        if (form.invalid) return;

        const { cardOwnerName, cardNumber, expirationDate, securityCode } = form.value;
        const data: CreatePaymentDetail = { cardOwnerName, cardNumber, expirationDate, securityCode }
       
        this.paymentService.addPaymentDetail$(data).subscribe({
            next: (p) => {
                console.log(p);
                this.onFormSubmitEventEmitter();
            }
        })
    }

    onFormSubmitEventEmitter() {
        this.paymentFormSubmittedEvent.emit(undefined);
    }
}

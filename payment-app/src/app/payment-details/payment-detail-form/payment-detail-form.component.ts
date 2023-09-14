import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentDetail } from 'src/app/shared/Interfaces';
import { PaymentDetailModel } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
    selector: 'app-payment-detail-form',
    templateUrl: './payment-detail-form.component.html',
    styleUrls: [ './payment-detail-form.component.scss' ]
})
export class PaymentDetailFormComponent {
    @ViewChild('formData') formData!: NgForm;

    constructor(private paymentService: PaymentDetailService) { }

    formSubmitHandler(form: NgForm) {
        if (form.invalid) return;

        const { cardOwnerName, cardNumber, expirationDate, securityCode } = form.value;
    }
}

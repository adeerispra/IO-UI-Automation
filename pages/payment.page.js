export class PaymentPage{
    constructor(page){  
        this.page = page;
        this.paymentMethod = page.locator('[data-test="payment-method"]');
        this.buttonCheckPayment = page.locator('[data-test="finish"]');
        this.inputCardNumber = page.locator('[data-test="credit_card_number"]');
        this.inputExpirationDate = page.locator('[data-test="expiration_date"]');
        this.inputCVV = page.locator('[data-test="cvv"]');
        this.inputCardHolderName = page.locator('[data-test="card_holder_name"]');
        this.messagepaymentSuccess = page.locator('[data-test="payment-success-message"]');
    }

    async choosePaymentMethod(paymentMethod){
        await this.paymentMethod.selectOption(paymentMethod);
    }

    async fillPaymentDetails(creditCardNumber, expirationDate, cvv, cardHolderName){ {
        await this.inputCardNumber.fill(creditCardNumber);
        await this.inputExpirationDate.fill(expirationDate);
        await this.inputCVV.fill(cvv);
        await this.inputCardHolderName.fill(cardHolderName);
    }
    }

    async checkPaymentFinish(){
        await this.buttonCheckPayment.click();
    }
}
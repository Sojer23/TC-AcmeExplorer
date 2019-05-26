import { Component, OnInit, NgZone } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { AplicationService } from 'src/app/services/aplication.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent extends TranslatableComponent implements OnInit {


  public payPalConfig?: IPayPalConfig;

  constructor(private translateService: TranslateService,
    private route: ActivatedRoute, 
    private applicationService: AplicationService,
    private router: Router,
    private ngZone: NgZone) {
    super(translateService);
  }

  ngOnInit() {
    this.initConfig();
  }

  initConfig() {
    const total = this.route.snapshot.queryParams['total'];
    const applicationId = this.route.snapshot.queryParams['applicationId'];

    //const total = '23';

    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'AQCaC14S-IBRFnUrG3XqleFtwpxQ9Bc0l3PEA2Nb9Z7S7uyQS6GyLiRwxZ_iUYy7bRj_U5S18AzAmxV7',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: total,
          },
          /*items: [{
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
                currency_code: 'EUR',
                value: total,
            },
        }]*/
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        alert("Pago realizado con éxito");
        this.applicationService.payApplication(applicationId).then( application =>{
          this.ngZone.run(() => this.router.navigate(['/applications'])).then();
          console.log(application);
        });
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);

      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: () => {
        console.log('onClick');
      },
    };
  }

}

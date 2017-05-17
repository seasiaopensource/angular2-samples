export const htmlTemplate = `
<footer class="page-footer">
    <div class="container">
        <div class="row content-container">
            <div class="col m2 s12">
                <a routerLink="" class="brand-logo"><img src="/app/images/logo-standard.png"></a>
            </div>
            <div class="col m5 s12">
                <ul class="left">
                    <li *ngFor="let menu of footerMenus"><a class="white-text transparent" href="{{menu.fields.uri}}" routerLinkActive="active"> {{menu.fields.title}} </a></li>
                </ul>
            </div>
            <div class="col m5 s12">
                <!-- <ul class="social">
                    <li class="right">
                        <a target="_blank" href="https://www.instagram.com/chase_center/" routerLinkActive="active"><i class="fa fa-instagram"></i></a>
                    </li>
                    <li class="right">
                        <a target="_blank" href="https://www.facebook.com/chasecenter" routerLinkActive="active"><i class="fa fa-facebook"></i></a>
                    </li>
                    <li class="right">
                        <a target="_blank" href="https://twitter.com/chasecenter" routerLinkActive="active"><i class="fa fa-twitter"></i></a>
                    </li> 
                </ul>-->
                <div class="subscribe-btn-home">
                <a class="waves-effect waves-light btn sub_btn"  (click)="subscribeForm.reset()"  href="#subscribe_news">Subscribe</a>
                    <div id="subscribe_news" class="modal">
                <div class="modal-content">         
                    <form (ngSubmit)="onSubmit(subscribeForm)" class="col s12" name="subscribeForm" #subscribeForm="ngForm">
                        <div class="row">
                                <div class="input-field col s12">
                                    <input required placeholder="First Name" ngModel  name="first_name" id="contact_fields_first_name" type="text" class="validate">
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <input required placeholder="Last Name" ngModel  name="last_name" id="contact_fields_last_name" type="text" class="validate">
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <input required placeholder="Your Email" ngModel name="email" id="contact_fields_email" type="text" class="validate">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col s12 modal-footer">
                                   <!-- <a href="#!" class="modal-action modal-close waves-effect waves-light btn blue">Subscribe</a>-->
                                    <button class="waves-effect waves-light btn blue" type="submit">Subscribe</button>
                                </div>
                            </div>
                    </form>
                </div>

            </div>
            <div id="subscribe_thanks" class="modal">
                <div class="modal-content"> 
                <p>THANKS</p>        
                </div>
            </div>             
            </div>
            </div>
            <!-- Modal Structure -->

            <!-- Modal Structure -->
          

        </div>
    </div>
</footer>
`;


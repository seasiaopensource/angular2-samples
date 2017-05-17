export const htmlTemplate = `
<div class="container contact" *ngIf="contactInfo!=undefined">
  <section>
      <div>
          <img class="responsive-img" *ngIf="contactInfo.fields.hero!=undefined" src="{{contactInfo.fields.hero.fields.file.url}}">
      </div>
  </section>
  <section>
    <div class="content-container">
      <h3>Contact</h3>
    </div>
    <div class="content-container white">
      <div class="row">
        <div class="col s12 m6 contact-form">
          <h2>Ask a question</h2>
          <form (ngSubmit)="onSubmit(contactForm)" class="col s12" name="contactForm" id="contactForm" #contactForm="ngForm">
            <div class="row">
              <div class="input-field col s12">
                <input required id="c_first_name" type="text" [(ngModel)]="contactForm.c_first_name" name="c_first_name" class="validate" placeholder="First Name">
               <!-- <label for="c_first_name">First Name</label>-->
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input required id="c_last_name" [(ngModel)]="contactForm.c_last_name" name="c_last_name" type="text" class="validate" placeholder="Last Name">
                <!--<label for="c_last_name">Last Name</label>-->
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input required id="c_email" type="email" [(ngModel)]="contactForm.c_email" name="c_email" class="validate" placeholder="Email">
                <!--<label for="c_email">Email</label>-->
              </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                  <textarea required id="c_message" [(ngModel)]="contactForm.c_message" name="c_message" class="materialize-textarea" placeholder="Your Message"></textarea>
                  <!--<label for="c_message">Message</label>-->
                </div>
            </div>
            <div class="row">
              <button type="submit" class="waves-effect waves-blue btn white lighten-5 blue-text text-darken-4">Submit</button>
              <input type="button" value="Reset"  (click)="contactForm.reset()" class="waves-effect waves-blue btn white lighten-5 blue-text text-darken-4">
            </div>
          </form>
        </div>
        <div class="col s12 m5 address right">

          <div class="heading">ADDRESS</div>
          <div [innerHTML]=contactInfo.fields.address></div>


          <div class="heading">PHONE</div>
          <div class="tel">{{contactInfo.fields.phone}}</div>

<!--
          <div class="heading">EMAIL</div>
          <div><a href="mailto:{{contactInfo.fields.email}}">{{contactInfo.fields.email}}</a></div>
-->
          <div class="contact-social">
            <a href="https://www.facebook.com/chasecenter" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a>
            <a href="https://twitter.com/chasecenter" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a>
          </div>
          </div>
      </div>
      <div class="row">
          <div class="col s12 loc-outer">
              <img class="responsive-img" *ngIf="contactInfo.fields.map!=undefined" src="{{contactInfo.fields.map.fields.file.url}}">
              <div class="locIcon"><a href="#"> <img src="/app/images/location-icon.png"/></a></div>
          </div>
      </div>
    </div>
  </section>
</div>
`;

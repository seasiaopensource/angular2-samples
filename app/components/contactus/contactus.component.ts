import { Component, OnInit } from '@angular/core';
import { ContentfulService } from 'app/services/contentful/contentful.service';
import { Config } from 'app/config';
import { Converter } from 'showdown';
import { NgForm } from '@angular/forms';
import { htmlTemplate } from 'app/components/contactus/contactus.component.html';
declare var jQuery: any;

// declare var jQuery: any;


@Component({
  selector: 'contactus-component',
  template: htmlTemplate,
  providers: [ContentfulService]
})

/**
 * Class to handle Contactus Component functions
 */
export class ContactusComponent implements OnInit {

  public contactInfo: any;
  private _responseLoaded: boolean;

  constructor(private contentfulService: ContentfulService ) {
    console.log('Contactus Component');
  }

  ngOnInit() {
    // get data acc to categories
    this.getPage();
  }

  getPage() {
    let vm = this;
    let converter = new Converter();
    this.contentfulService.getContentType(Config.CONTACTUS, Config.CONTACTUS)
      .then((data: any) => {
          data[0].fields.address = converter.makeHtml(data[0].fields.address);
          vm.contactInfo = data[0];
          vm._responseLoaded =  true;
      });
  }

  onSubmit(f: NgForm) {
    console.log('Test Form');
    console.log(NgForm);
    try {
      this.contentfulService.sendContactSubscription(f);
    } catch (e) {
        console.log(e);
    }
    // code to be merged in success response
    jQuery('.contact-form').html('<h2>Thank you for contacting us</h2><p>We will respond to you in the order in which your request was received</p>');
  }

}

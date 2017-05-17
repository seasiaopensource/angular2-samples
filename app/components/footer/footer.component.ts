import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ContentfulService } from 'app/services/contentful/contentful.service';
import { Config } from 'app/config';
import { NgForm } from '@angular/forms';
import { htmlTemplate } from 'app/components/footer/footer.component.html';
declare var jQuery: any;

@Component({
  selector: 'footer-component',
  template: htmlTemplate,
  providers: [ContentfulService]
})
/**
 * Class to handle footer Component functions
 * @property  footerMenus;
 */
export class FooterComponent implements OnInit, AfterViewChecked {
    public footerMenus: any;
    public contact_fields: any;

    /**
     * Call Constructor Function
     * @param contentfulService
     */
    constructor(private contentfulService: ContentfulService) {
    }

    /**
     * Call Function on Initialization
     **/
    ngOnInit() {
        this.readFooterMenu();
    }

    ngAfterViewChecked() {
        jQuery('.modal').modal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                in_duration: 300, // Transition in duration
                out_duration: 200, // Transition out duration
               // starting_top: '4%', // Starting top style attribute
               // ending_top: '20%', // Ending top style attribute
               ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                    console.log(modal, trigger);
                  // alert('Ready');
                   console.log(modal, trigger);
                },
                complete: function() {
                    // alert('Closed');
                    // jQuery('#subscribe_news').modal('close');
                    // jQuery('#subscribe_thanks').modal('close');
                } // Callback for Modal close
            }
        );
    }

    /**
     * Function to call footer-menu
     */
    readFooterMenu() {
        let vm = this;
        vm.contentfulService.getMenuData(Config.MENU, 'footer-menu', 'menuItems').then(function(data: any[]){
            vm.footerMenus = data;
        });
    }

    onSubmit(f: NgForm) {
      console.log(f.value);
      try {
          this.contentfulService.sendNewsSubscription(f.value);
      } catch (e) {
          console.log(e);
      }
      if (NgForm !== null) {
          jQuery('#subscribe_news').modal('close');
          jQuery('#subscribe_thanks').modal('open');
      }
      // code to be merged in success response
        // jQuery('#subscribe_news').model('close');

    }
}

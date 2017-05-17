import { Component, OnInit } from '@angular/core';
import { ContentfulService } from 'app/services/contentful/contentful.service';
import { Config } from 'app/config';
import { Converter } from 'showdown';
import { htmlTemplate } from 'app/components/tickets/tickets.component.html';


@Component({
  selector: 'tickets',
  template: htmlTemplate,
  providers: [ContentfulService]
})

/**
 * Class to handle Ticket Component functions
 */
export class TicketsComponent implements OnInit {

  public content: any;

  constructor(private contentfulService: ContentfulService ) {
    console.log('Tickets Component');
  }

  ngOnInit() {
    // get data acc to categories
    this.getPage();
  }

  getPage() {
    let vm = this;
    let converter = new Converter();
    this.contentfulService.getContentType(Config.PAGE, Config.TICKETS)
      .then((data: any) => {
          console.log(data);
          data[0].fields.content = converter.makeHtml(data[0].fields.content);
          vm.content = data[0];
      });
    }
}

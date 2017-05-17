import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ContentfulService } from 'app/services/contentful/contentful.service';
import { ActivatedRoute } from '@angular/router';
import { Config } from 'app/config';
import { Converter } from 'showdown';
import { htmlTemplate } from 'app/components/team/team.component.html';

declare var jQuery: any;


@Component({
  selector: 'team',
  template: htmlTemplate,
  providers: [ContentfulService]
})

/**
 * Class to handle Team Component functions
 */
export class TeamComponent implements OnInit, AfterViewChecked {

  private _responseLoaded: boolean;
  public members: any;
  public pageHero: any;
  public contentService= [];

  /**
   * Call Constructor Function
   */
  constructor(private contentfulService: ContentfulService, private route: ActivatedRoute) {
    this._responseLoaded = false;
  }

  // trigger jquery effect after data is loaded
  ngAfterViewChecked() {
  }
  // Initialize Functions
  ngOnInit() {
    this.fetchTeamPage();

  }

  // Fetch team page data
    fetchTeamPage() {
        let converter = new Converter();
        this.contentfulService.getContentTypeFieldsSearch({'content_type': Config.TEAMPAGE})
            .then((data: any[]) => {

                for ( let i in data ) {
                    if (data[i].fields != null) {

                        if (data[i].fields.hero != null) {
                            this.pageHero = data[i].fields.hero;
                        }

                        if (data[i].fields.membersItems.length > 0) {

                            for (let j in data[i].fields.membersItems) {
                                if (data[i].fields.membersItems[j].fields.id != null) {
                                    let contentSec = data[i].fields.membersItems[j];
                                    this.contentfulService.getContentType(Config.TEAMSECTION, contentSec.fields.id)
                                        .then((res: any) => {
                                            console.log(res);
                                            for (let k in res[0].fields.members) {
                                                if (res[0].fields.members[k] != null) {
                                                    res[0].fields.members[k].fields.bio = converter.makeHtml(res[0].fields.members[k].fields.bio);
                                                }
                                            }
                                            this.contentService[j] = res;
                                        });

                                }
                            }

                        }
                    }
                }
                console.log(this.contentService);
                this._responseLoaded = true;
            });
    }
}

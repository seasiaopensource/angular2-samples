import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ContentfulService } from 'app/services/contentful/contentful.service';
import { ActivatedRoute } from '@angular/router';
import { Config } from 'app/config';
import { Converter } from 'showdown';
import { htmlTemplate } from 'app/components/vision/vision.component.html';
// import {Observable} from 'rxjs/Rx';

declare var jQuery: any;

@Component({
    selector: 'vision-component',
    template: htmlTemplate,
    providers: [ContentfulService]
})

/**
 * Class to handle Vision Component functions
 */
export class VisionComponent implements OnInit, AfterViewChecked  {

   public subMenus: any;
   public contentService= [];
   private _responseLoaded: boolean;

   public pageHero: any;
   public stats: any;
   public _responseStats: boolean;
   public quoteone: any;
   public quotetwo: any;


   /**
   * Call Constructor Function
   */
    constructor(private contentfulService: ContentfulService, private route: ActivatedRoute) {
       this._responseLoaded = false;
       this._responseStats =  false;
    }



    ngOnInit() {

      this.readPage();
      this.fetchRetailStats();

    }
    // trigger jquery effect after data is loaded
    ngAfterViewChecked  () {

    }

    /**
   * Function to call Menu submenu
   */
    readSubMenu() {
        let vm = this;
        vm.contentfulService.getMenuData(Config.MENUITEM, 'vision', 'children')
              .then(function (data: any[]) {
                vm.subMenus = data;
                vm._responseLoaded =  true;
        });
    }
    // Fetch page Data
    readPage() {
        let converter = new Converter();
        this.contentfulService.getPage(Config.VISION).then((data: any[]) => {
            console.log('visionData', [data]);

            for ( let i in data ) {

                if (data[i].fields != null) {

                    if (data[i].fields.hero != null) {
                        this.pageHero = data[i].fields.hero;
                    }
                    if (data[i].fields.quoteone != null) {
                        this.quoteone = data[i].fields.quoteone;
                    }
                    if (data[i].fields.quotetwo != null) {
                        this.quotetwo = data[i].fields.quotetwo;
                    }


                    if (data[i].fields.contentSections.length > 0) {

                        for (let j in data[i].fields.contentSections) {
                            if (data[i].fields.contentSections[j].fields.id != null) {
                                let contentSec = data[i].fields.contentSections[j];
                                this.contentfulService.getContentType(Config.SECTIONCONTENT, contentSec.fields.id)
                                    .then((res: any) => {
                                        for (let k in res[0].fields.items) {
                                            if (res[0].fields.items[k] != null) {
                                                res[0].fields.items[k].fields.content = converter.makeHtml(res[0].fields.items[k].fields.content);
                                            }
                                        }
                                        this.contentService[j] = res;
                                    });

                            }
                        }

                    }
                }
            }
            this._responseLoaded = true;
        });
    }

    fetchRetailStats() {
        this.contentfulService.getContentType(Config.STATISTICS, 'vision').then((data: any[]) => {
            this.stats = data[0]['fields'].stats;
            this._responseStats = true;
        });
    }

}

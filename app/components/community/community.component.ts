import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ContentfulService } from 'app/services/contentful/contentful.service';
import { Config } from 'app/config';
import { Converter } from 'showdown';
import { htmlTemplate } from 'app/components/community/community.component.html';

@Component({
    selector: 'community-component',
    template: htmlTemplate,
    providers: [ContentfulService]
})

/**
 * Class to handle Community Component functions
 */
export class CommunityComponent implements OnInit, AfterViewChecked {

    private _responseLoaded: boolean;
    public pageHero: any;
    public communityOne: any;
    public communityTwo: any;
    public communityThree: any;
    public CommunityTitleOne: any;
    public CommunityTitleTwo: any;
    public CommunityTitleThree: any;
    public content: any;
    public media: any;
    public communityOneleadImage: any;

    private converter: any;

    /**
     * Call Constructor Function
     */
    constructor(private contentfulService: ContentfulService) {
        console.log('community Component');
        this._responseLoaded = false;
        this.converter = new Converter();

    }

    ngOnInit() {
        // get data acc to categories
        this.readPage();
        this.getComminityData();
    }

    // trigger jquery effect after data is loaded
    ngAfterViewChecked() {
        if (this._responseLoaded === true) {
            this._responseLoaded = false;
        }
    }

    // Fetch page Data
    getComminityData() {
        let vm = this;
        this.contentfulService.getPageDetails(Config.SECTIONCONTENT).then((data: any[]) => {
            console.log(['SECTIONCONTENT' , data]);
            for (let i in data ) {
              if (data[i].fields.id != null ) {
                for (let k in data[i].fields.items ) {
                  if (data[i].fields.items[k] !== null) {
                    data[i].fields.items[k].fields.content = vm.converter.makeHtml(data[i].fields.items[k].fields.content);
                  }
                }
                if (data[i].fields.id === 'community-one' ) {
                    vm.CommunityTitleOne = data[i].fields.sectionName;
                    vm.communityOne = data[i].fields.items;
                }
                if (data[i].fields.id === 'community-two' ) {
                    vm.CommunityTitleTwo = data[i].fields.sectionName;
                    vm.communityTwo = data[i].fields.items;
                }
                if (data[i].fields.id === 'community-three' ) {
                    vm.CommunityTitleThree = data[i].fields.sectionName;
                    vm.communityThree = data[i].fields.items;
                }
              }
            }
        });
    }

    readPage() {
        let vm = this;
        vm.contentfulService.getPage(Config.COMMUNITY).then(function(data: any[]) {
            console.log(data);
            vm.pageHero = data[0].fields.hero;
            data[0].fields.content = vm.converter.makeHtml(data[0].fields.content);
            vm.content = data[0];
            vm._responseLoaded =  true;
        });
    }
}

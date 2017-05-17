import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ContentfulService } from 'app/services/contentful/contentful.service';
import { ActivatedRoute } from '@angular/router';
import { Config } from 'app/config';
import { Converter } from 'showdown';
import { htmlTemplate } from 'app/components/home/home.component.html';


declare var jQuery: any;

@Component({
    selector: 'home',
    template: htmlTemplate,
    providers: [ContentfulService]
})

/**
 * Class to handle Home Component functions
 */



export class HomeComponent implements OnInit  {

    public HomePageHero: any;
    public HomePageIntroMedia: any;

    public homePageLiveMedia: any;

    public HomePageHighlightedArticle: any;
    public HomePageQuote: any;
    public responseData = [];

    public responseTwitterData: any;
    public responsefacebookData: any;
    public responseinstagramData: any;
    public pageHero: any;

    public promoteArticles: any;
    public randomArticles: any;

    public socialPosts: any;
    public socialCount: any;

    public socialitemsPerPage: any;
    public offset: any;

    @ViewChild('homePageLiveMediaContainer') homePageLiveMediaContainer: ElementRef;
    /**
     * Call Constructor Function
     */
    constructor(private contentfulService: ContentfulService, private route: ActivatedRoute) {
        this.socialitemsPerPage = 6;
        this.offset = 0;
    }
    ngAfterContentInit() {
        jQuery('.parallax').parallax();
    }
    ngOnInit() {
      let vm = this;
      this.getPageData();
      this.getSocialUrl(this.offset);
      this.getRedomArticles();
      this.getPromoteArticles();
      jQuery( window ).resize(function() {
        vm.refreshMasonry(false);
      });      
      jQuery('.modal-close').on('click', function() {
        jQuery('.e2e-iframe-trusted-src').html(vm.homePageLiveMedia.liveMediaContent);
      });
    }
    
    // fetch next records on page change
    getLoadMoreSocial(newoffset) {
        this.offset = newoffset + this.socialitemsPerPage;
        if (this.socialCount >= 0) {
            this.getSocialUrl(this.offset);
        }
    }

    getPageData() {
        let vm = this;
        let converter = new Converter();
        vm.contentfulService.getPageDetails(Config.HOMEPAGE).then(function(data: any[]) {
            // console.log('data show', data);
            for (let i in data ) {
                if (data[i].fields.hero != null || data[i].fields.highlightedArticle != null || data[i].fields.quote != null) {

                    vm.pageHero = data[i].fields.hero;
                    vm.HomePageHighlightedArticle = data[i].fields.highlightedArticle;
                    // Run the content through conversion
                    vm.HomePageHighlightedArticle.fields.summary = converter.makeHtml(vm.HomePageHighlightedArticle.fields.summary);
                    vm.HomePageQuote = data[i].fields.quote;
                    vm.HomePageIntroMedia  = data[i].fields.introMedia;
                    vm.homePageLiveMedia = {};
                    // vm.homePageLiveMedia.title = data[i].fields.liveMediaTitle;
                    vm.homePageLiveMedia.title = converter.makeHtml(data[i].fields.liveMedia);
                    // console.log(['Home Page Title' , vm.homePageLiveMedia.title]);
                    // Running foul of ng2's content filtering - todo: refactor to use a pipe
                    vm.homePageLiveMedia.liveMediaContent = data[i].fields.liveMediaContent;
                    vm.homePageLiveMediaContainer.nativeElement.innerHTML = vm.homePageLiveMedia.liveMediaContent;
                    // console.log('live feed', data[i].fields.liveMediaContent);
                    vm.contentfulService.getContentValue(vm.HomePageHighlightedArticle.fields.author.sys.id)
                        .then(function(responseEntry: any) {
                        vm.HomePageHighlightedArticle.authorName = responseEntry.fields.name;
                    });
                    vm.contentfulService.getContentValue(vm.HomePageHighlightedArticle.fields.category.sys.id)
                        .then(function(responseEntry: any) {
                        vm.HomePageHighlightedArticle.categoryName = responseEntry.fields.title;
                    });
                }
            }
        });

    }

    getPromoteArticles() {
        let vm = this;
        let converter = new Converter();
        vm.contentfulService.getContentTypeFieldsSearch({'content_type': Config.ARTICLE, 'fields.promote': true, 'limit': 1, 'order': '-sys.updatedAt'})
            .then(function(responseEntry: any) {
            for (let i in responseEntry ) {
              if (responseEntry[i].fields.summary != null) {
                responseEntry[i].fields.summary = converter.makeHtml(responseEntry[i].fields.summary);
              }
            }
            vm.promoteArticles = responseEntry;
        });
    }

    getRedomArticles() {
        let vm = this;
        let converter = new Converter();
        vm.contentfulService.getContentTypeFieldsSearch({'content_type': Config.ARTICLE, 'fields.promote': false, 'limit': 2, 'order': '-sys.updatedAt'})
        .then(function(responseEntry: any) {
            for (let i in responseEntry ) {
              if (responseEntry[i].fields.summary != null) {
                responseEntry[i].fields.summary = converter.makeHtml(responseEntry[i].fields.summary);
              }
            }
            vm.randomArticles = responseEntry;
        });

    }


    startMasonry() {
      if (this.socialPosts != null) {
      } else {
        this.socialPosts = jQuery('.social-posts').masonry({
          itemSelector: '.post',
          columnWidth: 315
        });
      }
    }

    refreshMasonry(reload: boolean) {
      let vm = this;
      if (jQuery(window).width() < 960) {
        if (vm.socialPosts != null) {
          vm.socialPosts.masonry('destroy');
          vm.socialPosts = null;
        }
      } else {
        this.startMasonry();
        setTimeout(function() {
          if (reload) {
            vm.socialPosts.masonry('reloadItems');
          }
          vm.socialPosts.masonry('layout');
        }, 1000);
      }
    }

    getSocialUrl(offset) {
        let vm = this;
        vm.contentfulService.getContentTypeFieldsSearch({'content_type': Config.SOCIALPOST, skip: offset, limit: this.socialitemsPerPage, 'order': '-sys.updatedAt' }).then(function(data: any[]) {
            for (let i of data) {
                if (i.fields.url != null) {

                    vm.contentfulService.getSocialData(i.fields.url).subscribe((response) => {

                        vm.responseData.push(response);

                        /*
                        if (response.provider_name === 'Twitter') {

                            vm.responseTwitterData = response;
                            vm.responseTwitterData.social_url = i.fields.url;
                        }
                        if (response.provider_name === 'Facebook') {

                            vm.responsefacebookData = response;
                            vm.responsefacebookData.social_url = i.fields.url;
                        }
                        if (response.provider_name === 'Instagram') {

                            vm.responseinstagramData = response;
                            vm.responseinstagramData.social_url = i.fields.url;
                        }
                        */
                    }, (error) => {
                    });
                }
            }
            vm.socialCount = vm.contentfulService.totalCount;
            vm.refreshMasonry(true);
        });

    }

}

export const htmlTemplate = `
<!--Body-->
<div class="home container">
    <section>
        <div class="modal-outer">
              <div class="header-image-container">
                  <img class="responsive-img z-depth-5" *ngIf="HomePageIntroMedia!=undefined" src="{{HomePageIntroMedia.fields.file.url}}">
              </div>
              <div class="live-modal home-modal center">
                  <a *ngIf="homePageLiveMedia!=undefined" href="#modal1">
                  <h1><img src="/app/images/icon.png" alt="Image"/></h1>
                      <div class="col l8 white-text" [innerHTML]=homePageLiveMedia.title></div>
                      <h2><img src="/app/images/play-btn.png" alt="Image"/></h2>
                  </a>
                <div id="modal1" class="modal">
                  <div class="modal-content e2e-iframe-trusted-src" #homePageLiveMediaContainer>
                  </div>
                  <div class="modal-footer">
                    <a href="javascript:void(0)" class=" modal-action modal-close waves-effect waves-green btn-flat">Close</a>
                  </div>
                </div>
              </div>
        </div>
    </section>

    <section *ngFor="let promoteArticle of promoteArticles">
        <div class="content-container article-summary">
            <div class="row card hoverable cl-vision">
                <div class="card-content col m6 s12">
                    <div class="category blue-text">{{promoteArticle.fields.category.fields.title}}</div>
                    <div class="card-title">{{promoteArticle.fields.title}}</div>
                    <div class="byline">{{promoteArticle.fields.author.fields.name}} {{promoteArticle.fields.publishedDate | date}}</div>
                    <p class="content" [innerHTML]=promoteArticle.fields.summary></p>
                    <a class="waves-effect waves-blue btn grey lighten-5 blue-text text-darken-4" routerLink="article/{{promoteArticle.fields.id}}" target="_blank">Read More</a>
                </div>
                <div class="col m6 s12">
                  <img *ngIf="promoteArticle.fields.leadImage != undefined" class="responsive-img" src="{{promoteArticle.fields.leadImage.fields.file.url}}">
                </div>
            </div>
        </div>
    </section>
    <!-- call quotes component -->
    <quotes-component [quotes]="HomePageQuote"></quotes-component>
    <!-- quotes component ends-->
    <section class="team-profile">
        <div class="content-container article-summary">
            <div class="row">
                <div *ngFor="let randomArticle of randomArticles" class="col m6 s12 col-summary">
                    <div class="card hoverable">
                        <a *ngIf="randomArticle.fields.externalSource !=undefined" href="{{randomArticle.fields.externalSource}}" target="_blank">
                          <img *ngIf="randomArticle.fields.leadImage != undefined" class="responsive-img" src="{{randomArticle.fields.leadImage.fields.file.url}}">
                        </a>
                        <a *ngIf="randomArticle.fields.externalSource ==undefined" routerLink="article/{{randomArticle.fields.id}}">
                          <img *ngIf="randomArticle.fields.leadImage != undefined" class="responsive-img" src="{{randomArticle.fields.leadImage.fields.file.url}}">
                        </a>
                        <div class="row">
                            <div class="card-content col m12 s12">
                                <div class="category blue-text" *ngIf="randomArticle.fields.category!=undefined">{{randomArticle.fields.category.fields.title}}</div>
                                <div class="card-title">{{randomArticle.fields.title}}</div>
                                <div class="byline" *ngIf="randomArticle.fields.author!=undefined">{{randomArticle.fields.author.fields.name}} {{randomArticle.fields.publishedDate | date}}</div>
                                <p class="content" *ngIf="randomArticle.fields.summary!=undefined" [innerHTML]=randomArticle.fields.summary></p>
                                <a *ngIf="randomArticle.fields.externalSource !=undefined" class="waves-effect waves-blue btn grey lighten-5 blue-text text-darken-4" href="{{randomArticle.fields.externalSource}}" target="_blank">Read More</a>
                                <a *ngIf="randomArticle.fields.externalSource ==undefined" class="waves-effect waves-blue btn grey lighten-5 blue-text text-darken-4" routerLink="article/{{randomArticle.fields.id}}" target="_blank">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="insta-section">
        <div class="content-container article-summary">
            <div class="social-posts"> 
                <div class="post" *ngFor="let socialData of responseData" [ngSwitch]="socialData.provider_name">
                    <template [ngSwitchCase]="'Instagram'">
                        <div class="instagram col m6 s12">
                            <div class="card hoverable col instaIn">
                                <a href="{{socialData.social_url}}" target="_blank"><img class="responsive-img" src="{{socialData.thumbnail_url}}"></a>
                                <div class="Insta-icon"><img src="/app/images/insta-icon.jpg" alt="Image"/></div>                         
                            </div>
                        </div>
                    </template>
                    
                    <template [ngSwitchCase]="'Twitter'">
                        <div class="twitter col m3 s12">
                         <div class="card hoverable col instaIn">
                            <a href="{{socialData.social_url}}" target="_blank">
                            <div class="blue-insta">
                                {{socialData.description}}
                            </div>
                            <div class="insta-user">
                                <h4><i class="fa fa-twitter"></i> {{socialData.title}}</h4> 
                            </div>
                            </a>
                         </div>
                        </div>
                    </template>
                    
                    <template [ngSwitchCase]="'Facebook'">
                        <div class="facebook col m3 s12">
                         <div class="card hoverable col instaIn">
                            <a href="{{socialData.social_url}}" target="_blank">
                            <div class="red-insta">
                                {{socialData.description}}
                            </div>
                            <div class="insta-user">
                                <h4><i class="fa fa-facebook"></i> {{socialData.title}}</h4> 
                            </div>
                            </a>
                         </div>                 
                        </div>
                    </template>
                    
                </div>                 
            </div>
            <div *ngIf="socialCount != 0" class="error" class="btn-load center-align"><a (click)="getLoadMoreSocial(offset)" href="javascript:void(0)">Load More</a></div><!-- BTn Load ENds -->
        </div>
        
    </section>

    <!-- Body -->
</div>`;

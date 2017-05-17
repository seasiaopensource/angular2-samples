export const htmlTemplate = `
<div class="home container article-bg artiDetailOuter">
    <section class="article-main" *ngIf="article!=undefined">
        <div class="content-container article-summary">

            <div class="article-user-detail">
                <div class="row">
                    <div class="artidetail-lt">
                        <div class="row valign-wrapper" *ngIf="article.fields.author!=undefined">
                            <div class="left valign user-detail">
                                <!--<img class="circle responsive-img" src="https://placehold.it/32x32">-->
                                <span>{{article.fields.author.fields.name}}</span>
                            </div>
                            <div class="left article-block valign">
                                <span><i class="fa fa-clock-o" aria-hidden="true"></i>
                                {{article.fields.publishedDate | date}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="text-right artidetail-rt">
                        <div class="valign-wrapper">
                            <!--
                            <div class="left article-block valign">
                                <span><i class="fa fa-heart" aria-hidden="true"></i>
                                24</span>
                            </div>
                            <div class="left article-block valign">
                                    <span><i class="fa fa-commenting" aria-hidden="true"></i>
                                    3</span>
                            </div>
                            <div class="left article-block-btn valign">
                                <ul id="share-social" class="dropdown-content">
                                    <li><a href="#!">one<span class="badge">1</span></a></li>
                                    <li><a href="#!">two<span class="new badge">1</span></a></li>
                                    <li><a href="#!">three</a></li>
                                </ul>
                                <a class="btn dropdown-button" href="javascript:void(0)" data-activates="share-social">Share <i class="fa fa-angle-down" aria-hidden="true"></i>
                                </a>
                            </div>
                            -->
                        </div>

                    </div>
                </div>
            </div><!-- Article User Detail Ends -->

            <div class="article-content">
                <div class="row center-align"><span class="new badge grey" data-badge-caption="Vision"></span></div>
                <h1>{{article.fields.title}}</h1>
                <div class="row center-align"><span class="read-label"> <span><i class="fa fa-clock-o" aria-hidden="true"></i>4 min read</span></span></div>

                <section class="highlight-text">
                    <div class="row">
                        <div class="col m12">
                            <div [innerHTML]=article.fields.content></div>
                        </div>
                        <div *ngIf="article.fields.highlight1!=undefined" class="col l3">
                            <h4>Highlight </h4>
                            <p>{{article.fields.highlight1}}</p>
                            <h4>Highlight </h4>
                            <p>{{article.fields.highlight2}}</p>
                        </div>
                    </div>
                </section>
                <!-- Go to www.addthis.com/dashboard to customize your tools -->
                <div class="addthis_inline_share_toolbox"></div>
            </div><!-- Article Content Ends -->

        </div>
    </section>
</div>
`;

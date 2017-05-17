export const htmlTemplate = `
<div class="container community">
    <hero-component [heroContent]="pageHero"></hero-component>

    <section>
      <div class="white">
        <div class="content-container">
            <div class="row">
                <div class="col s12"><h3>{{CommunityTitleOne}}</h3></div>
            </div>
            <div class="row communityOuter">
                <div class="col s12 m6">
                    <div class="innerText" *ngFor="let communityOneData of communityOne" [innerHTML]=communityOneData.fields.content></div>
                </div>
                <div class="col s12 m4 offset-m2">
                    <div *ngFor="let communityOneDaata of communityOne">
                        <div *ngIf="communityOneDaata.fields.leadImage!=undefined">
                            <img class="responsive-img z-depth-0" src="{{communityOneDaata.fields.leadImage.fields.file.url}}">
                            <!--<h6>Caption</h6>-->
                        </div>
                    </div>
                </div>
            </div>
        </div><!-- Content Container Ends -->
      </div>
    </section>

    <section>
      <div class="white">
        <div class="content-container">
            <div class="row">
                <div class="col s12"><h3>{{CommunityTitleTwo}}</h3></div>
            </div>
            <div class="row communityOuter">
                <div class="col s12 m6">
                    <div class="innerText" *ngFor="let communityTwoData of communityTwo" [innerHTML]=communityTwoData.fields.content></div>
                </div>
                <div class="col s12 m4 offset-m2">
                    <div *ngFor="let communityTwoDaata of communityTwo">
                        <div *ngIf="communityTwoDaata.fields.leadImage!=undefined">
                            <img class="responsive-img z-depth-0" src="{{communityTwoDaata.fields.leadImage.fields.file.url}}">
                        </div>
                    </div>
                </div>
            </div>
        </div><!-- Content Container Ends -->
      </div>
    </section>

    <section>
      <div class="white">
        <div class="content-container">
            <div class="row">
                <div class="col s12"><h3>{{CommunityTitleThree}}</h3></div>
            </div>
            <div class="row communityOuter">
                <div class="col s12 m6">
                    <div class="innerText" *ngFor="let communityThreeData of communityThree" [innerHTML]=communityThreeData.fields.content></div>
                </div>
                <div class="col s12 m4 offset-m2">
                    <div *ngFor="let communityThreeDaata of communityThree">
                        <div *ngIf="communityThreeDaata.fields.leadImage!=undefined">
                            <img class="responsive-img z-depth-0" src="{{communityThreeDaata.fields.leadImage.fields.file.url}}">
                        </div>
                    </div>
                </div>
            </div>
        </div><!-- Content Container Ends -->
      </div>
    </section>

  <!--
    <section class="story-sec">
        <div class="content-container">
            <div class="row">
                <div class="col s12 m12">
                    <ul class="collection">
                        <li class="collection-item avatar">
                            <img class="circle" src="https://placehold.it/126x126">
                            <span class="profile">Profile</span>
                            <span class="title">Personal Interest Story</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi feugiat molestie ex quis finibus. Quisque tincidunt dolor ut convallis lobortis. Proin ullamcorper eros ac ultrices imperdiet. Vivamus eros nibh, dictum sed venenatis vitae, ornare eget magna. Etiam mattis, felis eu interdum posuere, justo neque dictum sapien, eu luctus neque nulla non ante.
                            </p>
                            <a href="#!" class="read-btn">Read More</a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </section>
-->

    <section>
      <div class="white">
        <div class="content-container">
            <div class="row">
                <div class="col s12"><h3>Community-related FAQs</h3></div>
            </div>
            <div class="row communityOuter" *ngIf="content!=undefined">
                <div class="col s12 m6" [innerHTML]=content.fields.content>
                </div>
                <div class="col s12 m4 offset-m2">
                    <img class="responsive-img" *ngFor="let imageMedia of content.fields.media" src="{{imageMedia.fields.file.url}}">
                </div>
            </div>
        </div><!-- Content Container Ends -->
      </div>
    </section>

</div><!-- Container Ends -->
`;

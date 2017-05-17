/**
 * Created by vivek on 28/12/16.
 */
import { NgModule }      from '@angular/core';
import { RoutingModule } from 'app/routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { Ng2PaginationModule } from 'ng2-pagination';
import { HomeComponent }  from 'app/components/home/home.component';
import { HeaderComponent }  from 'app/components/header/header.component';
import { FooterComponent }  from 'app/components/footer/footer.component';
import { VisionComponent }  from 'app/components/vision/vision.component';
import { ContactusComponent }  from 'app/components/contactus/contactus.component';
import { CommunityComponent }  from 'app/components/community/community.component';
import { TeamComponent }  from 'app/components/team/team.component';
import { TicketsComponent }  from 'app/components/tickets/tickets.component';
import { RetailComponent } from 'app/components/retail/retail.component';
import { ArticleDetailComponent } from 'app/components/articledetail/articledetail.component';
import { AppComponent }  from 'app/components/app/app.component';
import { SliderComponent } from 'app/components/slider/slider.component';
import { NewsComponent } from 'app/components/news/news.component';
import { StatisticsComponent } from 'app/components/statistics/statistics.component';
import { HeroComponent } from 'app/components/hero/hero.component';
import { QuotesComponent } from 'app/components/quotes/quotes.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';


@NgModule({
    imports:      [ BrowserModule, RoutingModule, HttpModule, JsonpModule, Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]), FormsModule, Ng2PaginationModule ],
    declarations: [ HomeComponent, HeaderComponent, FooterComponent, VisionComponent,
        ContactusComponent, TeamComponent, TicketsComponent, CommunityComponent,
        RetailComponent, ArticleDetailComponent, SliderComponent, HeroComponent,
        NewsComponent, StatisticsComponent, QuotesComponent, AppComponent ],

    bootstrap:    [ AppComponent ]
})
export class ComponentsModule { }

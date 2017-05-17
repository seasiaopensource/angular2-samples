/**
 * Created by root on 28/12/16.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }  from 'app/components/home/home.component';
import { VisionComponent }  from 'app/components/vision/vision.component';
import { ContactusComponent }  from 'app/components/contactus/contactus.component';
import { CommunityComponent }  from 'app/components/community/community.component';
import { TeamComponent }  from 'app/components/team/team.component';
import { TicketsComponent }  from 'app/components/tickets/tickets.component';
import { RetailComponent } from 'app/components/retail/retail.component';
import { ArticleDetailComponent } from 'app/components/articledetail/articledetail.component';
import { NewsComponent } from 'app/components/news/news.component';
import { MetaModule } from 'ng2-meta';

const routes: Routes = [
    { path: 'vision',  component: VisionComponent, data: {
            meta: {
                title: 'Vision | Chase Center',
                description: 'Vision | Chase Center'
            }
        }
    },
    { path: 'contact',  component: ContactusComponent, data: {
            meta: {
                title: 'Contact Us | Chase Center',
                description: 'Contact Us | Chase Center'
            }
        }
    },
    { path: '',  component: HomeComponent, data: {
            meta: {
                title: 'Home | Chase Center',
                description: 'Home | Chase Center'
            }
        }
    },
    { path: 'team',  component: TeamComponent, data: {
            meta: {
                title: 'Team | Chase Center',
                description: 'Team | Chase Center'
            }
        }
    },
    { path: 'tickets',  component: TicketsComponent, data: {
            meta: {
                title: 'Tickets | Chase Center',
                description: 'Tickets | Chase Center'
            }
        }
    },
    { path: 'community',  component: CommunityComponent, data: {
            meta: {
                title: 'Community | Chase Center',
                description: 'Community | Chase Center'
            }
        }
    },
    { path: 'retail',  component: RetailComponent, data: {
            meta: {
                title: 'Retail | Chase Center',
                description: 'Retail | Chase Center'
            }
        }
    },
    { path: 'article/:id', component: ArticleDetailComponent, data: {
            meta: {
                title: 'Article | Chase Center',
                description: 'Article | Chase Center'
            }
        }
    },
    { path: 'news', component: NewsComponent, data: {
            meta: {
                title: 'News | Chase Center',
                description: 'News | Chase Center'
            }
        }
    },

];

@NgModule({
    imports: [ RouterModule.forRoot(routes) , MetaModule.forRoot()],
    exports: [ RouterModule ]
})
export class RoutingModule {}

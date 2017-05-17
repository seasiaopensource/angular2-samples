import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ContentfulService } from 'app/services/contentful/contentful.service';
import { ActivatedRoute } from '@angular/router';
import { Config } from 'app/config';
import { Converter } from 'showdown';
import { htmlTemplate } from 'app/components/articledetail/articledetail.component.html';
import { MetaService } from 'ng2-meta';

@Component({
    selector: 'article-detail-component',
    template: htmlTemplate,
    providers: [ContentfulService]
})

export class ArticleDetailComponent implements OnInit, AfterViewChecked {

    public sub: any;
    public mode: any;
    public article: any;
    public content: any;

    /**
     * Call Constructor Function
     */
    constructor(private contentfulService: ContentfulService, private route: ActivatedRoute, private metaService: MetaService ) {
      //  this._responseLoaded = false;

        console.log(this.route.params);
        this.sub = this.route
            .params
            .subscribe(params => {
                // Récupération des valeurs de l'URL
                this.mode = params['id']; // --> Name must match wanted paramter
            });
         console.log(this.mode);
    }
    ngOnInit() {

        this.articleDetail();
    }

    ngAfterViewChecked() {

    }

    articleDetail() {
        let converter = new Converter();
        this.contentfulService.getContentType(Config.ARTICLE, this.mode)
            .then((data: any[]) => {
                data[0].fields.content = converter.makeHtml(data[0].fields.content);
               this.article = data[0];
                this.metaService.setTitle(this.article.fields.title);
                this.metaService.setTag('og:description', this.article.fields.summary);
        });

    }

}

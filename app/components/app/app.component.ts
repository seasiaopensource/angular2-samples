// import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { MetaService } from 'ng2-meta';

declare var jQuery: any;
declare var ga: Function;

@Component({
  selector: 'my-app',
  templateUrl: 'app/components/app/app.component.html'
})

/**
 * Class to handle home Component functions
 */
@Injectable()

export class AppComponent implements OnInit  {

    public imageURL: any;
    public product: any;

   /* constructor(public angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {
        angulartics2GoogleAnalytics.setUsername('UA-13088066-10');
       // angulartics2GoogleAnalytics.pageTrack('http://localhost:9012');
        console.log(angulartics2GoogleAnalytics);
    }*/
    constructor(public router: Router , private metaService: MetaService) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                ga('set', 'page', event.urlAfterRedirects);
                ga('send', 'pageview');
            }
        });
    }

    ngAfterViewInit() {
        jQuery('.parallax').parallax();
    }

    ngOnInit() {
      /*  angulartics2GoogleAnalytics.pageTrack('http://localhost:9012');
        console.log(angulartics2GoogleAnalytics);*/
    }
}

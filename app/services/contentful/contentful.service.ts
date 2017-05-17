declare var contentful: any;

import { Injectable } from '@angular/core';
import { Config } from 'app/config';
import { Http, Jsonp } from '@angular/http';
import { URLSearchParams } from '@angular/http';

import 'rxjs/Rx';





@Injectable()
export class ContentfulService {
    private sdkClient: any;
    public totalCount: any;

    constructor(private http: Http, private _jsonp: Jsonp) {
      this.connect();
    }

    connect() {
        this.sdkClient = contentful.createClient({
          space: Config.SPACE_ID,
          accessToken: Config.ACCESS_TOKEN
        });
       // console.log(this.sdkClient);
    }

    getMenuData ( menutype: any, menuId: any, menufieldData: any) {
        return this.sdkClient.getEntries({'content_type': menutype, 'fields.id': menuId})
            .then((catresponse: any) => {
                let catArray: any[];
                for (let i in catresponse.items) {
                    if (catresponse.items[i].fields[menufieldData].length > 0) {
                        catArray = catresponse.items[i].fields[menufieldData];
                    }
                }
                return catArray;
            });
    }

    getContentType ( contentType: any, fieldId: any) {
        return this.sdkClient.getEntries({'content_type': contentType, 'fields.id': fieldId})
            .then((catresponse: any) => {
                return catresponse.items;
            });
    }

    getContentTypeFieldsSearch( searchField: any) {

        return this.sdkClient.getEntries( searchField )
            .then((catresponse: any) => {
                console.log(catresponse);

                this.totalCount = catresponse.total;
                return catresponse.items;
            });
    }

    getPageDetails(contentType: any) {

        return this.sdkClient.getEntries({'content_type': contentType})
            .then(function(catresponse: any){
                return catresponse.items;
            });

    }

    getPage(pageId: any, orderBy= 'sys.updatedAt') {

        return this.sdkClient.getEntries({'content_type': 'page', 'fields.id': pageId, 'order': orderBy })
            .then(function(catresponse: any){
                return catresponse.items;
            });

    }

    getContentValue(sysId: any) {
        return this.sdkClient.getEntry(sysId).then(function(response){
           return response;
        });
    }


    getSocialData(url: any) {
        let optionVlaue: any;
        // let url = "https://instagram.com/p/BBF6jNTO1Zy/';
        // let url = 'https://www.facebook.com/chasecenter/posts/1052701474839614/';
        // let url = 'https://twitter.com/Accenture/status/804449543114764288';
        let key = 'c2ca0544dc714dbf8e3dd2e1b5d3d081';
        let oEmbedHost = 'https://api.embedly.com/1/oembed';
        optionVlaue = this._jsonp
            .get(oEmbedHost + '?key=' + key + '&format=json&url=' + encodeURI(url) + '&callback=JSONP_CALLBACK')
            .map(res => res.json());

        return optionVlaue;
    }

    sendNewsSubscription(formData: any) {
      console.log('form values', [formData]);
      let data = new URLSearchParams();
      data.append('contact_fields[email]', formData['email']);
      data.append('contact_fields[first_name]', formData['first_name']);
      data.append('contact_fields[last_name]', formData['last_name']);
      console.log('sending values', [data]);
      return this.http.post('https://api.maropost.com/accounts/1009/forms/21/subscribe/f9e6b8208abd97af4cc8b4a103ae9aa84624978e', data)
            .subscribe();
    }

    sendContactSubscription(formData: any) {
      console.log('form values', [formData]);
      let data = new URLSearchParams();
      data.append('contact_fields[email]', formData['c_email']);
      data.append('contact_fields[first_name]', formData['c_first_name']);
      data.append('contact_fields[last_name]', formData['c_last_name']);
      data.append('custom_fields[chase_center_contact_inquiry]', formData['c_message']);
      console.log('form values staged', [data]);
      return this.http.post('https://api.maropost.com/accounts/1009/forms/24/subscribe/a7fc492c76d56bdd9e0818c20fe0340a32b62fba', data)
            .subscribe();
    }
}

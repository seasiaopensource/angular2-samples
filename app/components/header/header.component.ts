import { Component, OnInit } from '@angular/core';
import { ContentfulService } from 'app/services/contentful/contentful.service';
import { Config } from 'app/config';
import { htmlTemplate } from 'app/components/header/header.component.html';

declare var jQuery: any;

@Component({
    selector: 'header-component',
    template: htmlTemplate,
    providers: [ContentfulService]
})

/**
 * Class to handle header Component functions
 * @property  menus;
 */
export class HeaderComponent implements OnInit  {
    public menus: any;
    public sidemenus: any;

    /**
     * Call Constructor Function
     * @param contentfulService
     */
    constructor(private contentfulService: ContentfulService) {
    }

    ngAfterViewInit() {
        jQuery('.button-collapse').sideNav({closeOnClick: true});
        jQuery('.brand-logo').sideNav('hide');
        let toggles = document.querySelectorAll('.c-hamburger');
        for (let i = toggles.length - 1; i >= 0; i--) {
            let toggle = toggles[i];
            this.toggleHandler(toggle);
        };
    }

    /**
     * Handle Toggle Class
     * @param toggle
     */
    toggleHandler(toggle) {
        toggle.addEventListener( 'click', function(e) {
            e.preventDefault();
            (this.classList.contains('is-active') === true) ? this.classList.remove('is-active') : this.classList.add('is-active');
            jQuery('.menu-outer a,.brand-logo').click(function(){
                jQuery('.button-collapse').removeClass('is-active');
            });
            /*jQuery('.brand-logo').click(function(){
                jQuery('.menu-outer').css('transform','translateX(-100%)');
                jQuery('.drag-target').removeAttr('style');
                jQuery('.drag-target').css('left','0');
            });*/
            jQuery('.brand-logo').click(function(){
                jQuery('.button-collapse').sideNav('hide');
                jQuery('.button-collapse').removeClass('is-active');
            });

        });
    }

    /**
     * Call Function on Initialization
     **/
    ngOnInit() {
        this.readMainMenu();
        this.readSideMenu();
    }

    /**
     * Function to call main-menu
     */
    readMainMenu() {
        let vm = this;
        vm.contentfulService.getMenuData(Config.MENU, 'main-menu', 'menuItems').then(function(data: any[]){
            vm.menus = data;
        });
    }
    /**
     * Function to call side-menu
     */
    readSideMenu() {
        let vm = this;
        vm.contentfulService.getMenuData(Config.MENU, 'side-menu', 'menuItems').then(function(data: any[]){
            vm.sidemenus = data;
        });
    }
}


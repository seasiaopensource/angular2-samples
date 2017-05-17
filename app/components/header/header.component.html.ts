export const htmlTemplate = `
<header class="container">
    <div class="content-container">
        <ul class="side-nav">
            <li *ngFor="let menu of menus">
                <a routerLink="{{menu.fields.uri}}" routerLinkActive="active"> {{menu.fields.title}} </a></li>
        </ul>
        <a href="#" data-activates="slide-out" id="collapse_btn" class="button-collapse c-hamburger c-hamburger--htx">  <!--<span class="icon-bar"></span>
        <span class="icon-bar"></span>--> <span></span></a>

        <nav>
            <div class="nav-wrapper">
                <a routerLink="" class="brand-logo"><img src="/app/images/logo.png"></a>
                <div class="menu-outer" id="slide-out">
                    <div class="main-menu">
                        <ul id="nav-mobile" class="left">
                            <li *ngFor="let menu of menus">
                                <a routerLink="{{menu.fields.uri}}" routerLinkActive="active"> {{menu.fields.title}} </a></li>
                        </ul>
                    </div>
                    <div class="side-menu right">
                        <ul id="nav-side-social">
                            <li class="right">
                                <a target="_blank" href="https://www.instagram.com/chase_center/" routerLinkActive="active"><i class="fa fa-instagram"></i></a>
                            </li>
                            <li class="right">
                                <a target="_blank" href="https://www.facebook.com/chasecenter" routerLinkActive="active"><i class="fa fa-facebook"></i></a>
                            </li>
                            <li class="right">
                                <a target="_blank" href="https://twitter.com/chasecenter" routerLinkActive="active"><i class="fa fa-twitter"></i></a>
                            </li>
                        </ul>
                        <ul id="nav-side-mobile" class="right cf">
                            <li *ngFor="let menu of sidemenus">
                                <a routerLink="{{menu.fields.uri}}" routerLinkActive="active"> {{menu.fields.title}} </a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</header>
`;

export const htmlTemplate = `
<!-- Page Layout here -->
<div class="container">
    <hero-component [heroContent]="pageHero"></hero-component>
    <!-- call quotes component -->
    <quotes-component [quotes]="quoteone"></quotes-component>
    <!-- quotes component ends-->
    <section class="retail-main" *ngFor="let contentServiceMultiple of contentService; let i = index ">
        <slider-component *ngFor="let contentServiceSingle of contentServiceMultiple" [store]="contentServiceSingle" [responseCheck]="_responseLoaded"  [defaultLayout]="i"></slider-component>
    </section>
    <!-- call quotes component -->
    <quotes-component [quotes]="quotetwo"></quotes-component>
    <!-- quotes component ends-->
    <section class="retail-main">
        <statistics-component [statistics]="stats" [responseStats]="_responseStats"></statistics-component>
    </section>
</div>
`;

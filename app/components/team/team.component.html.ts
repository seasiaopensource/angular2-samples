export const htmlTemplate = `
<div class="container team">
    <hero-component [heroContent]="pageHero"></hero-component>
    <section class="team-slider container" *ngFor="let contentServiceMultiple of contentService; let i = index ">
        <slider-component *ngFor="let contentServiceSingle of contentServiceMultiple" [team]="contentServiceSingle" [responseTeam]="_responseLoaded" [defaultLayout]= "i"></slider-component>
    </section>
</div>
`;

export const htmlTemplate = `
<div class="container" *ngIf="content!=undefined">
<section>
    <div>
        <img class="responsive-img" *ngIf="content.fields.hero.fields.media!=undefined" src="{{content.fields.hero.fields.media[0].fields.file.url}}">
    </div>
</section>
  <section>
    <div class="content-container">
      <h3>Tickets</h3>
    </div>
    <div class="content-container white">
      <div class="tickets row">
        <div class="col l8" [innerHTML]=content.fields.content>
        </div>
        <div class="col l4" *ngIf="content.fields.media!=undefined">
          <img class="responsive-img" *ngFor="let imageMedia of content.fields.media" src="{{imageMedia.fields.file.url}}">
        </div>
      </div>
    </div>
  </section>
</div>
`;

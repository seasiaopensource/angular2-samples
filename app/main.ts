import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { HeaderModule } from './components/header/header.module';
import { ComponentsModule } from 'app/components/components.module';

// platformBrowserDynamic().bootstrapModule(HeaderModule);
platformBrowserDynamic().bootstrapModule(ComponentsModule);

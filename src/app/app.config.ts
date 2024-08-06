import {ApplicationConfig, inject, provideZoneChangeDetection} from '@angular/core';
import {
    provideRouter,
    RedirectCommand,
    Router,
    withComponentInputBinding,
    withNavigationErrorHandler
} from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes,
            withComponentInputBinding(),
            withNavigationErrorHandler((error) => {
                console.log(error)
                return new RedirectCommand(inject(Router).parseUrl(`/error`), {
                    state: {
                        error
                    }
                })
            }))
    ]
};

import { ApplicationConfig, provideBrowserGlobalErrorListeners, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloLink} from '@apollo/client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideApollo(() => {

      const httpLink = inject(HttpLink);


      const authLink = new ApolloLink((operation, forward) => {
        const token = localStorage.getItem('token');
        
        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
          }
        }));
        
        return forward(operation);
      });

      const link = ApolloLink.from([
        authLink,
        httpLink.create({ uri: 'http://localhost:4000/graphql' })
      ]);
      
      return {
        link: link,
        cache: new InMemoryCache(),
      };
    }),
  ],
};

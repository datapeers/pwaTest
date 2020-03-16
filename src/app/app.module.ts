import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { ToDoComponent } from './components/to-do/to-do.component';
import { PersistenceService } from './services/persistence.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

export function connect(persistenceService: PersistenceService) {
  return (): Promise<any> => {
    return persistenceService.connect();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    ToDoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: connect,
      deps: [PersistenceService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

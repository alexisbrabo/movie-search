import { Component } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule],
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Platform is ready.
    });
  }
}

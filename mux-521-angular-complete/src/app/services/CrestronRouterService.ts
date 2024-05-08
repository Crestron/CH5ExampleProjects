// This is a project specific service that subscribes to the MainPageVisibilityJoin and StartPageVisibilityJoin and manages the page routing.
// This would be replaced with your own service that manages the routing of your application in a more complex scenario.
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

// Declare the Crestron Communication Library
declare var CrComLib: CrComLib;

@Injectable({
  providedIn: 'root',
})
export class CrestronRouterService {
  // The mainPageVisibilitySubscription is used to hold a reference to the subscription of the MainPageVisibilityJoin.
  // This is used to unsubscribe from the subscription when the component is destroyed (as this is a service this won't be the case).
  mainPageVisibilitySubscription!: string;
  // The startPageVisibilitySubscription is used to hold a reference to the subscription of the StartPageVisibilityJoin.
  // This is used to unsubscribe from the subscription when the component is destroyed (as this is a service this won't be the case).
  startPageVisibilitySubscription!: string;

  // The constructor is used to inject the Router and NgZone services.
  constructor(private router: Router, private ngZone: NgZone) {

    // This ensures that a page will be displayed even if the control system is offline.
    // Navigate to the home page when the application starts.
    this.navigate('home');

     // Subscribe to the main page visibility join to listen for changes.
     this.mainPageVisibilitySubscription = CrComLib.subscribeState(
      'b',
      'MainPageVisibilityJoin',
      (state: boolean) => {
        // If the state is true, navigate to the main page.
        // We're not interested in the false state as the control system is only pulsing the join.
        if (state) {
          // Log the navigation to the console.
          console.log(
            'Info -> The control system has requested we navigate to the start page.'
          );
          // Navigate to the main page.
          this.navigate('main-page');
        }
      }
    );

    this.startPageVisibilitySubscription = CrComLib.subscribeState(
      'b',
      'StartPageVisibilityJoin',
      (state: boolean) => {
        // If the state is true, navigate to the start page.
        // We're not interested in the false state as the control system is only pulsing the join.
        if (state) {
          // Log the navigation to the console.
          console.log(
            'Info -> The control system has requested we navigate to the start page.'
          );
          // Navigate to the start page.
          this.navigate('home');
        }
      }
    );

  }

  // The navigate function is used to navigate to a specific route.
  public navigate(path: string) {
    // Use the ngZone to run the navigation inside of the Angular zone.
    this.ngZone.run(() =>
      // Navigate to the route.
      this.router.navigate([path], { skipLocationChange: true })
    );
  }
}

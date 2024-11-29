import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowRefService {
  private readonly platformId = inject(PLATFORM_ID);
  
  get nativeWindow(): Window | null {
    return isPlatformBrowser(this.platformId) ? window : null;
  }
}

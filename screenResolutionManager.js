"""
A pure javascript ScreenResoluzion Manager - Copyright (C) 2023 Fabio F.G. Buono
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License 
as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of 
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see https://www.gnu.org/licenses/
"""

class ScreenResolution {
    #mobileBreakpoint = 480;
    #tabletBreakpoint = 1024;
    #currentWidth = 0;
  
    constructor({ mobileBreakpoint = this.#mobileBreakpoint, tabletBreakpoint = this.#tabletBreakpoint } = {}) {
      if (typeof mobileBreakpoint !== "number" || typeof tabletBreakpoint !== "number") {
        throw new Error("Both breakpoints must be numbers");
      }
      this.#mobileBreakpoint = mobileBreakpoint;
      this.#tabletBreakpoint = tabletBreakpoint;
    }
  
    get deviceType() {
      try {
        const { innerWidth: currentWidth } = window;
        if (currentWidth <= this.#mobileBreakpoint) {
          return "mobile";
        } else if (currentWidth > this.#mobileBreakpoint && currentWidth <= this.#tabletBreakpoint) {
          return "tablet";
        } else {
          return "desktop";
        }
      } catch (error) {
        console.error(error);
        return "error";
      }
    }
  }

  class ScreenResolutionManager {
    constructor(options) {
      this.screenResolution = new ScreenResolution(options);
      this.listeners = [];
      this.redirectMapping = {};
    }
  
    subscribe(fn) {
      this.listeners.push(fn);
    }
  
    notifyListeners() {
      this.listeners.forEach(listener => listener(this.screenResolution.deviceType));
    }
  
    redirectTo(mapping) {
    this.redirectMapping = mapping;
    const deviceType = this.screenResolution.deviceType;
    if (!this.redirectMapping.hasOwnProperty(deviceType)) {
      console.error(`Invalid device type: ${deviceType}`);
      return;
    }
    const url = this.redirectMapping[deviceType];
    if (!url) {
      console.error(`No URL found for device type: ${deviceType}`);
      return;
    }
    window.location = url;
  }
  
    init() {
      this.screenResolution.handleResolutionChange();
      this.notifyListeners();
      window.addEventListener("resize", this.screenResolution.handleResolutionChange.bind(this.screenResolution));
      window.addEventListener("resize", this.notifyListeners.bind(this));
    }
  }

  const manager = new ScreenResolutionManager({
    mobileBreakpoint: 480,
    tabletBreakpoint: 1024
  });
  
  manager.subscribe(deviceType => {
    console.log(`Device type changed to: ${deviceType}`);
  });
  
  manager.redirectTo({
    mobile: "http://127.0.0.1:5500/mobile.html",
    tablet: "http://127.0.0.1:5500/layout1.html",
    desktop: "http://127.0.0.1:5500/layout1.html"
  });
  
  manager.init();

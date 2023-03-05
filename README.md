# JS-ScreenResolutionSystem
A pure JS screen resolution utility class


# How To Use:

```javascript
  const manager = new ScreenResolutionManager({
    mobileBreakpoint: 480,
    tabletBreakpoint: 1024
  });
  
  manager.subscribe(deviceType => {
    console.log(`Device type changed to: ${deviceType}`);
    /* Your code here */
  });
  
  manager.redirectTo({
    mobile: "http://127.0.0.1:5500/mobile.html",
    tablet: "http://127.0.0.1:5500/tablet.html",
    desktop: "http://127.0.0.1:5500/desktop.html"
  });
  
  manager.init();
```




# Motivation:

I was tired to use code like this:


```javascript
    if (screen.width <= 480) {
      window.location = "mobile.html";
    } else {
      window.location = "desktop.html";
    }
```

or like this:

```javascript
        window.onresize = function() {
            let targetUrl;
            if (screen.width <= 800) {
              targetUrl = "mobile.html";
            } 
            fetch(targetUrl)
              .then(response => {
                if (response.ok) {
                  window.location = targetUrl;
                } else {
                  console.error("La pagina di destinazione non è raggiungibile");
                }
              })
              .catch(error => {
                console.error("Errore durante la verifica della pagina di destinazione:", error);
              });
          };
```


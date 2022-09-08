/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-b5366f8b'], (function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "24349c9d12f61381b76dfeffeda59271.png",
    "revision": null
  }, {
    "url": "62f7ed54824aed760e3710043b9aa720.mp3",
    "revision": null
  }, {
    "url": "7ba4924e38e356bed552fe520cf62f31.png",
    "revision": null
  }, {
    "url": "8c419b4de58851aef73644b5c8dd889c.png",
    "revision": null
  }, {
    "url": "assets/images/desert.png",
    "revision": "784871ecfa5025a7d7c710af33def163"
  }, {
    "url": "assets/images/sprites/bush-1.png",
    "revision": "7e9931d56f02a8923a06276e8b290e90"
  }, {
    "url": "assets/images/sprites/cat-run-1.png",
    "revision": "0e4a0ffa4ee33e60dec4c764d32ece91"
  }, {
    "url": "assets/images/sprites/cat-run-2.png",
    "revision": "dd5be19839dc55cd41c10ca2f7a33c27"
  }, {
    "url": "assets/media/background-music.mp3",
    "revision": "1855e696af9939afa21a5399f36d98ce"
  }, {
    "url": "assets/media/jump-sound.mp3",
    "revision": "71e7aeda90677ca7976f05680c99d325"
  }, {
    "url": "assets/media/lose-sound.mp3",
    "revision": "6a5dd5f39eff790c3e8d112faea91f41"
  }, {
    "url": "assets/media/win-sound.mp3",
    "revision": "d5042f5fdc557f4bb8b32317b9e40779"
  }, {
    "url": "assets/svg/cat.svg",
    "revision": "2f2387ac251c80b1673053c741fff81d"
  }, {
    "url": "assets/svg/shield.svg",
    "revision": "25fcf407c7c6c6ec9ee35da3a3e98b92"
  }, {
    "url": "b9ae480e3e487e2a50ed7871253323f5.mp3",
    "revision": null
  }, {
    "url": "c2834945a5a8b6fa2aa6021304471db9.png",
    "revision": null
  }, {
    "url": "ff7ef99d8b851b6b58994b87b465eefe.mp3",
    "revision": null
  }], {});

}));

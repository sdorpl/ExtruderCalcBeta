// Copyright 2016 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { apver } from './ver.js';

(function() {
  'use strict';

  var app = {
    isLoading: true,
    spinner: document.querySelector('.loader'),
    container: document.querySelector('.mainhide'),
    darkTheme: document.getElementById('setDarkTheme'),
    lightTheme: document.getElementById('setLightTheme'),
    saveDialogButton: document.getElementById('showSaveDialog'),
    saveDialog: document.querySelector('.saveDialogContainer'),
    indexForm: document.getElementById('indexForm'),
    theme: showCookie("Theme"),
    version: apver()
  };
  alert(app.version);

  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/
  //Set dark
  document.getElementById('appver').innerHTML = app.version;
  if (!app.theme) {
    setCookie("Theme", "light", 3650);
  }

  if (app.theme == "dark") {
    darkTheme();
  }

  app.darkTheme.addEventListener('click', function() {
    setCookie("Theme", "dark", 3650);
    darkTheme();
  });

  //Set light
  app.lightTheme.addEventListener('click', function() {
    setCookie("Theme", "light", 3650);
    lightTheme();
  });

//  if (app.indexForm) {
//    //Obliczam
//    app.indexForm.addEventListener('change', function() {
//      var inputWymiar = document.getElementById('inputWymiar').value;
//      var inputSztuk = document.getElementById('inputSztuk').value;
//      var inputSpeed = document.getElementById('inputSpeed').value;
//      var inputPoIle = document.getElementById('inputPoIle').value;
//      app.Licz(inputWymiar, inputSztuk, inputSpeed, inputPoIle);
//    });
//    var inputName = document.getElementById('inputName').value;
//    var inputAdnot = document.getElementById('inputAdnot').value;
//    var showButton = document.getElementById('showSaveDialog');
//    var hideButton = document.getElementById('hideSaveDialog')
    //Show saveDialog
//    showButton.addEventListener('click', function() {
//      app.toggleSaveDialog(true);
//    });

    //Hide saveDialog
//    hideButton.addEventListener('click', function() {
//      app.toggleSaveDialog(false);
//    });


//    document.getElementById('saveInputBase').addEventListener('click', function() {
//      var inputWymiar = document.getElementById('inputWymiar').value;
//      var inputSztuk = document.getElementById('inputSztuk').value;
//    var inputSpeed = document.getElementById('inputSpeed').value;
//      var inputPoIle = document.getElementById('inputPoIle').value;
//      var inputName = document.getElementById('inputName').value;
//      var inputAdnot = document.getElementById('inputAdnot').value;
//      var data = new Date();
//      var licz = app.Licz(inputWymiar, inputSztuk, inputSpeed, inputPoIle);
//      saveItems(inputName, inputAdnot, inputWymiar, inputPoIle, inputSztuk, inputSpeed, data, licz);

//    });
//  }


  app.toggleSaveDialog = function(visible) {
    if (visible) {
      app.saveDialog.classList.add('saveDialogContainer--visible');
    } else {
      app.saveDialog.classList.remove('saveDialogContainer--visible');
    }
  };

  app.saveFormItems = function(name, ) {

  };


  // TODO add service worker code here
  //  if ('serviceWorker' in navigator) {
  //  navigator.serviceWorker
  //         .register('./service-worker.js')
  //       .then(function() { console.log('Service Worker Registered'); });
  //     if (app.isLoading) {
  //   app.spinner.setAttribute('hidden', true);
  // app.container.removeAttribute('hidden');
  //app.isLoading = false;
  //}
  //}


  let newWorker;

  function showUpdateBar() {
    let snackbar = document.getElementById('snackbar');
    snackbar.removeAttribute('hidden');
  }
  // The click event on the pop up notification
  document.getElementById('reload').addEventListener('click', function() {
    newWorker.postMessage({
      action: 'skipWaiting'
    });
  });

// Service Worker Initialize

if ('serviceWorker' in navigator) {
  //navigator.serviceWorker.register('/service-worker.js', { type: "module" })
  navigator.serviceWorker.register('/service-worker.js').then(reg => {
    reg.addEventListener('updatefound', () => {
      // A wild service worker has appeared in reg.installing!
      newWorker = reg.installing;
      newWorker.addEventListener('statechange', () => {
        // Has network.state changed?
        switch (newWorker.state) {
          case 'installed':
            if (navigator.serviceWorker.controller) {
              // new update available
              showUpdateBar();
            }
            // No update available
            break;
        }
      });
    });
  });
  let refreshing;
  navigator.serviceWorker.addEventListener('controllerchange', function() {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });
}


  if (app.isLoading) {
    app.spinner.setAttribute('hidden', true);
    app.container.removeAttribute('hidden');
    app.isLoading = false;
  }
})();

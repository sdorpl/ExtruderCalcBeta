//
  localforage.config({
      name: 'ExCalc Beta'
  });

// Zmienne

var indexCountForm = document.forms.indexCountForm;
var indexSaveCountForm = document.forms.indexSaveCountForm;
var saveDialog = document.querySelector('.saveDialogContainer');


  //Obliczam
  indexCountForm.addEventListener('change', function() {
    var inputWymiar = indexCountForm.inputWymiar.value;
    var inputSztuk = indexCountForm.inputSztuk.value;
    var inputSpeed = indexCountForm.inputSpeed.value;
    var inputPoIle = indexCountForm.inputPoIle.value;
    console.log (inputWymiar);
    licz(inputWymiar, inputSztuk, inputSpeed, inputPoIle);
  });
  var inputName = document.getElementById('inputName').value;
  var inputAdnot = document.getElementById('inputAdnot').value;
  var showButton = document.getElementById('showSaveDialog');
  var hideButton = document.getElementById('hideSaveDialog')
  //Show saveDialog
  showButton.addEventListener('click', function() {
    toggleSaveDialog(true);
  });

  //Hide saveDialog
  hideButton.addEventListener('click', function() {
    toggleSaveDialog(false);
  });


  document.getElementById('saveInputBase').addEventListener('click', function() {
    var inputWymiar = indexCountForm.inputWymiar.value;
    var inputSztuk = indexCountForm.inputSztuk.value;
    var inputSpeed = indexCountForm.inputSpeed.value;
    var inputPoIle = indexCountForm.inputPoIle.value;
    var inputName = indexSaveCountForm.inputName.value;
    var inputAdnot = indexSaveCountForm.inputAdnot.value;
    var data = new Date();
    var liczitems = licz(inputWymiar, inputSztuk, inputSpeed, inputPoIle);
    saveItems(inputName, inputAdnot, inputWymiar, inputPoIle, inputSztuk, inputSpeed, data, liczitems);
    window.location.reload();
  });


  toggleSaveDialog = function(visible) {
    if (visible) {
      saveDialog.classList.add('saveDialogContainer--visible');
    } else {
      saveDialog.classList.remove('saveDialogContainer--visible');
    }
  };

licz = function(wymiar, sztuk, speed, poile) {
  //Zmienne komunikatów
  var infoBox = document.getElementById('info');
  var wynikBox = document.getElementById('wynik_row');
  var wynikValue = document.getElementById('wynik');
  var kartonsBox = document.getElementById('kartony_row');
  var kartonsValue = document.getElementById('kartony');

  var wynikCzas = '';
  var wynikKartons = '';


  //Obliczam czas
  var czas = (wymiar / 1000) * (sztuk / speed) / 60;
  //Konwertuje czas do tablicy
  var czasArray = czas.toString().split('.');
  //Sprawdzam ilosc rekordow
  var czasIsArray = czasArray.length;
  //Wykonuje sprawdzenie czy tablica
  if (czasIsArray == 1) {
    var wynikCzas = czasArray[0] + ' Godzin 0 Minut';
  } else {
    var minuty = Math.decimal(czasArray[1].substr(0, 2) / 100 * 60, 0);
    var wynikCzas = czasArray[0] + ' Godzin ' + minuty.toString() + ' Minut';
  }

  //Obliczam kartony
  var kartons = sztuk / poile;
  //Konwertuje czas do tablicy
  var kartonsArray = kartons.toString().split('.');
  //Sprawdzam ilosc rekordow
  var kartonsIsArray = kartonsArray.length;
  //Wykonuje sprawdzenie czy tablica
  if (kartonsIsArray == 1) {
    var wynikKartons = kartonsArray[0] + '';
  } else {
    var sztuki = Math.decimal(parseFloat('0.' + kartonsArray[1]) * poile, 0);
    var wynikKartons = kartonsArray[0] + ' po ' + poile + ' sztuk i reszta ' + sztuki.toString() + ' sztuk';
  }

  //Jezeli wymiar i speed null
  if (!wymiar && !speed && !sztuk) {
    infoBox.innerHTML = "<strong>Uwaga!</strong> Wprowadź dane do formularza!";
  } else {
    infoBox.innerHTML = "<strong>Uwaga!</strong> Dane w formularzu niekompletne! Wypełnij pola oznaczone gwiazdką.";
    if (isNaN(czasArray[0]) || isNaN(kartons)) {
      wynikBox.setAttribute('hidden', true);
      infoBox.removeAttribute('hidden');
      infoBox.innerHTML = "<strong>Uwaga!</strong> Dane w formularzu niekompletne! Wypełnij pola oznaczone gwiazdką.";
    } else {
      infoBox.removeAttribute('hidden');
      infoBox.innerHTML = "<strong>Uwaga!</strong> Dane w formularzu niekompletne! Wypełnij pola oznaczone gwiazdką.";

      if (wynikCzas != 0 && wynikCzas != Infinity) {
        infoBox.setAttribute('hidden', true);
        wynikBox.removeAttribute('hidden');
        wynikValue.innerHTML = "Szacowany czas realizacji: <strong>" + wynikCzas + "</strong>";
      } else {
        wynikBox.setAttribute('hidden', true);
        infoBox.innerHTML = "<strong>Uwaga!</strong> Dane w formularzu niekompletne! Wypełnij pola oznaczone gwiazdką.";
      }

      if (wynikKartons != 0 && wynikKartons != Infinity) {
        infoBox.setAttribute('hidden', true);
        kartonsBox.removeAttribute('hidden');
        kartonsValue.innerHTML = "Ilość kartonów do zrobienia: : <strong>" + wynikKartons + "</strong>";
      } else {
        kartonsBox.setAttribute('hidden', true);
        infoBox.innerHTML = "<strong>Uwaga!</strong> Dane w formularzu niekompletne! Wypełnij pola oznaczone gwiazdką.";
      }

    }
  }
  var ret = {
    "kartony": wynikKartons,
    "czas": wynikCzas,
  };
  return ret;

};

// Zapisywanie CooCIE
setCookie = function(name, val, days, path, domain, secure) {
  if (navigator.cookieEnabled) { //czy ciasteczka sÄ… wÅ‚Ä…czone
    const cookieName = encodeURIComponent(name);
    const cookieVal = encodeURIComponent(val);
    let cookieText = cookieName + "=" + cookieVal;

    if (typeof days === "number") {
      const data = new Date();
      data.setTime(data.getTime() + (days * 24 * 60 * 60 * 1000));
      cookieText += "; expires=" + data.toGMTString();
    }

    if (path) {
      cookieText += "; path=" + path;
    }
    if (domain) {
      cookieText += "; domain=" + domain;
    }
    if (secure) {
      cookieText += "; secure";
    }

    document.cookie = cookieText;
  }
}

//Odczyt Coockie
showCookie = function(name) {
  if (document.cookie !== "") {
    const cookies = document.cookie.split(/; */);

    for (let i = 0; i < cookies.length; i++) {
      const cookieName = cookies[i].split("=")[0];
      const cookieVal = cookies[i].split("=")[1];
      if (cookieName === decodeURIComponent(name)) {
        return decodeURIComponent(cookieVal);
      }
    }
  }
}

Math.decimal = function(n, k) {
  var factor = Math.pow(10, k + 1);
  n = Math.round(Math.round(n * factor) / 10);
  return n / (factor / 10);
}

//CIemny motyw
darkTheme = function() {
  document.getElementById('setDarkTheme').setAttribute('hidden', true);
  document.getElementById('setLightTheme').removeAttribute('hidden');
  document.body.classList.add("dark");
  document.querySelector('.mainhide').classList.add("dark");
  document.querySelector('.navbar-custom').classList.add("dark");
  document.querySelector("meta[name=theme-color]").setAttribute("content", "#000000");

  //Zmienne
  var saveDialog = document.getElementsByClassName('saveDialogContent');
  var formClass = document.getElementsByClassName('form-control');

  if (saveDialog) {
    for (let i = 0; i < saveDialog.length; i++) {
      saveDialog[i].classList.add("dark");
    }
  }

  if (formClass) {
    for (let i = 0; i < formClass.length; i++) {
      formClass[i].classList.add("dark");
    }
  }

}

//Jasny motyw
lightTheme = function() {
  document.getElementById('setDarkTheme').removeAttribute('hidden');
  document.getElementById('setLightTheme').setAttribute('hidden', true);
  document.body.classList.remove("dark");
  document.querySelector('.mainhide').classList.remove("dark");
  document.querySelector('.navbar-custom').classList.remove("dark");
  document.querySelector('.saveDialogContent').classList.remove("dark");
  document.querySelector("meta[name=theme-color]").setAttribute("content", "#790005");
  var formClass = document.getElementsByClassName('form-control');
  if (formClass) {
    for (let i = 0; i < formClass.length; i++) {
      formClass[i].classList.remove("dark");
    }
  }
}

//
saveItems = function(nazwa, adnot, wymiar, poile, sztuk, predkosc, date, item) {
   var items = {
     "nazwa": nazwa,
     "adnotacja": adnot,
     "wymiar": wymiar,
     "poile": poile,
     "sztuk" : sztuk,
     "predkosc": predkosc,
     "data": date,
     item

   };

   localforage.setItem(nazwa, items).then(function (value) {
       // Do other things once the value has been saved.
       console.log(value);
   }).catch(function(err) {
       // This code runs if there were any errors
       console.log(err);
   });

  console.log(items);
}

makeDialog = function(content, name) {
  //Tworzę DialogContainer
  var dialogContainer = document.createElement('div');
  //Nazwa Class
  dialogContainer.className = 'saveDialogContainer';
  //ustalam miejsce dla Dialog
  var dialogFrame = document.getElementById('dialogT');
  //wstawiam dialogContainer do dialogFrame div
  dialogFrame.appendChild(dialogContainer);

  //Tworze
  //var znacznik2 = document.createElement('input');
  //znacznik2.setAttribute('type', 'text');
  //znacznik2.setAttribute('id', 'item'+newItemNameDigit);
  //znacznik2.setAttribute('placeholder', 'Produkt');
  //znacznik2.className = 'form-control';
  //var kontener2 = document.getElementById('item'+newItemNameDigit+'group');
  //kontener2.appendChild(znacznik2);
}

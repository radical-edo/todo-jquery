// definiujemy funkcje initHelpers

var initHelpers = function () {
  // do obiektu globalnego `window` dopisujemy kolejna propercje
  // `helpers`, ktora rowna sie pustemu obiektowi `{}`
  window.helpers = {};
  
  // do obiektu `helpers` dopisujemy propercje o nazwie `fetchFromDatabase`
  // ktora rowna sie funkcji o dwoch argumentach `dataName` - zakladamy, ze to string
  // oraz `defaultValue` jakas wartosc domyslna
  helpers.fetchFromDatabase = function (dataName, defaultValue) {
    // z `localStorage` pobieramy dane z klucza `dataName` 
    // i przypisujemy do zmiennej `data`
    var data = localStorage.getItem(dataName);
    // sprawdzamy czy `data` istnieje w bazie danych
    if (data) {
      // jezeli istnieje to parsujemy ja do obiektu JavaScriptowego
      return JSON.parse(data);
    } else {
      // w przeciwnym razie zwracamy podana wartosc domyslna `defaultValue`
      return defaultValue;
    }
  };
  
};

// wywolujey funkcje `initHelpers` operatorem wywoloania `()`
initHelpers();
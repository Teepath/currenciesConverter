(function() {
  'use strict';

  //check for support
  if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return;
  }

  

const idbPromise = idb.open('converter', 1, (upgradeDB)=>{
  let store= upgradeDB.createObjectStore('https://free.currencyconverterapi.com/api/v5/currencies', {
    keyPath: 'id'
  });
});



idbPromise.then((db)=>{
  let tx = db.transaction('store');
  let store = tx.objectStore('store');
  return store.getAll('results'); 
}).then((val)=>{
    for(key in val.results){
      console.log(val.result[key].id);
    }
});

  let fromCurrency = document.getElementById('fromCurrency').value;
  let toCurrency = document.getElementById('toCurrency').value;
  let amount= document.getElementById('amount').value;  
  let result = document.getElementById('result'); 


 fromCurrency = encodeURIComponent(fromCurrency);
  toCurrency = encodeURIComponent(toCurrency);
  const query = `${fromCurrency}_${toCurrency}`;


  const url ='https://free.currencyconverterapi.com/api/v5/convert?q=' + query + '&compact=ultra';


idbPromise.then((db)=>{
  let tx =db.transaction('store', 'readwrite');
  let store = tx.objectStore('store');
  store.put('url');

  return tx.complete;
}).then(()=>{
  console.log("transaction is successafully completed");
});



})();
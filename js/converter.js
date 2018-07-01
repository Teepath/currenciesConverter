"strict mode"



function convertCurrency(amount, fromCurrency, toCurrency, cb) {
  
  amount = document.getElementById('amount').value;
  fromCurrency = document.getElementById('fromCurrency').value;
  toCurrency = document.getElementById('toCurrency').value;

  fromCurrency = encodeURIComponent(fromCurrency);
  toCurrency = encodeURIComponent(toCurrency);
  const query = fromCurrency + '_' + toCurrency;

  const url = 'https://www.currencyconverterapi.com/api/v5/convert?q='
            + query ;

  fetch(url).then(res=>
      res.json()).then(data =>{
        let val = data[query];
        if (val) {
              let total = val * amount;
              cb(null, Math.round(total * 100) / 100);
            } else {
              let err = new Error("Value not found for " + query);
              console.log(err);
              cb(err);
            }



  let results  = data;
  let options="";
  for(let result of results){
    options +="<option>" + result[id] + "</option>";

  }

  fromCurrency.innerHTML = options;
  toCurrency.innerHTML = options;

      }).catch(e) {
            console.log("Parse error: ", e);
            cb(e);
          }.on('error', (e)=>{
        console.log("Got an error: ", e);
        cb(e);
  });
      
  

}



convertCurrency(10, 'USD', 'PHP', function(err, amount) {
  console.log(amount);
});

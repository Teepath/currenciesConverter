
'strict mode'

const https = require('https');

function convertCurrency(amount, fromCurrency, toCurrency, cb) {
  const apiKey = 'your-api-key-here';

  fromCurrency = encodeURIComponent(fromCurrency);
  toCurrency = encodeURIComponent(toCurrency);
  const query = fromCurrency + '_' + toCurrency;

  const url = 'https://www.currencyconverterapi.com/api/v5/convert?q='
            + query + '&compact=ultra&apiKey=' + apiKey;

  https.get(url, (res)=>{
      const body = '';

      res.on('data', (chunk) =>{
          body += chunk;
      });

      res.on('end', ()=>{
          try {
            let jsonObj = JSON.parse(body);

            let val = jsonObj[query];
            if (val) {
              let total = val * amount;
              cb(null, Math.round(total * 100) / 100);
            } else {
              let err = new Error("Value not found for " + query);
              console.log(err);
              cb(err);
            }
          } catch(e) {
            console.log("Parse error: ", e);
            cb(e);
          }
      });
  }).on('error', (e)=>{
        console.log("Got an error: ", e);
        cb(e);
  });
}


/*
convertCurrency(10, 'USD', 'PHP', function(err, amount) {
  console.log(amount);
});
*/
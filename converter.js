"strict mode"

const output = "";

function convertCurrency(amount, fromCurrency, toCurrency, cb) {
  
  amount = document.getElementById('amount').value;

 let dropdown = document.getElementById('fromCurrency');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'currencies';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;


let dropdownB = document.getElementById('toCurrency');
dropdownB.length = 0;

let defaultOptionB = document.createElement('option');
defaultOptionB.text = 'currencies';

dropdownB.add(defaultOptionB);
dropdownB.selectedIndex = 0; 

  fromCurrency = encodeURIComponent(fromCurrency);
  toCurrency = encodeURIComponent(toCurrency);
  const query = fromCurrency + '_' + toCurrency;

  //const url2 ="https://free.currencyconverterapi.com/api/v5/currencies";

  const url = 'https://free.currencyconverterapi.com/api/v5/currencies?q=';

  fetch(url)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

        response.json().then(function(data) {
        console.log(data.results);

        let options;

        for (let key in data.results) {
        //console.log(data.results[key].id);
    
          option = document.createElement('option');
          option.text = data.results[key].id ;
         // console.log( `${data.results[key].currencyName} ( ${data.results[key].currencySymbol})`);
          //option.value = data[i].countryname;

          dropdown.add(option);
}

    for (let key in data.results) {
        //console.log(data.results[key].id);
    
          option = document.createElement('option');
          option.text =  data.results[key].id;
         // console.log( `${data.results[key].currencyName} ( ${data.results[key].currencySymbol})`);
          //option.value = data[i].countryname;

          dropdownB.add(option);
}

      

      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
      /* res.json())
  .then(data =>{
      console.log(data);cc
        let val = data[query];
        if (val) {
              let total = val * amount;
              cb(null, Math.round(total * 100) / 100);
            } else {
              let err = new Error("Value not found for " + query);
              console.log(err);s
              cb(err);
            }

  let results  = data;
  let options="";
  for(let result of results){
    options +="<option>" + result[id] + "</option>";

  }

  fromCurrency.innerHTML = options;
  toCurrency.innerHTML = options;

      })

      .catch(e){
            console.log("Parse error: ", e);
            cb(e);
          }.on('error', (e)=>{
        console.log("Got an error: ", e);
        cb(e);
  });*/
 

}



convertCurrency();


//convertCurrency(10, 'USD', 'PHP', function(err, amount) {
 // console.log(amount);
//

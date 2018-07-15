"strict mode"


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
          option.text = data.results[key]['id'] ;
         

          dropdown.add(option);
}

   // for (let key in data.results) {
        //console.log(data.results[key].id);

        for( let key of Object.values(data.results)){

          let val = key.id.split(' ');
          val.sort((a,b)=>{

           if(a < b){
              return a.length.localeCompare(b.length);
            }
          });

          console.log(val.join(','));
    
          option = document.createElement('option');
       //   option.text =  data.results[key].id;
         // console.log( `${data.results[key].currencyName} ( ${data.results[key].currencySymbol})`);
          //option.

          option.text = val;

          dropdownB.add(option);
}

      

      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
   
 

}



convertCurrency();




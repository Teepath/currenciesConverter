
function changeCurrencies(){


  let fromCurrency = document.getElementById('fromCurrency').value;
	let toCurrency = document.getElementById('toCurrency').value;
	let amount= document.getElementById('amount').value;	
  let result = document.getElementById('result'); 


 fromCurrency = encodeURIComponent(fromCurrency);
  toCurrency = encodeURIComponent(toCurrency);
  const query = `${fromCurrency}_${toCurrency}`;


	const url ='https://free.currencyconverterapi.com/api/v5/convert?q=' + query + '&compact=ultra';

fetch(url)  
 .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.log('Looks like there was a problem. Status Code: ' + 
          response.status);  
        return;  
      }

      // Examine the text in the response

      response.json().then(function(data) { 
        
      // console.log(data);
       if(data){

       	let val;
       	

       	//get the data value

       	for(let query in data){

       		val = data[query];
           if((amount > 0)  && (fromCurrency.length >0) && (toCurrency.length >0)){

       
     



           result.innerHTML = (val * parseInt(amount)).toFixed(2);

      }


       	}


       
     
   }



      });  
    }  
  )  
  .catch(function(err) {  
    console.error('Fetch Error -', err);  
  });

}


changeCurrencies();

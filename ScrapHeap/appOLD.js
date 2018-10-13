//Used Georgia Tech Coding Bootcamp's code for the basic structure and added features as needed.
//Search for ***New Code to find added

// Initial array of stocks
const stocksList = ['CAT', 'DOG', 'HOG', 'FLY'];


//**************FUNCTIONS***************** */


// displaystockInfo function re-renders the HTML to display the appropriate content
const displayStockInfo = function () {

  // Grab the stock symbol from the button clicked and add it to the queryURL
   const stock = $(this).attr('data-name');

   $('#stocks-view').empty();
   $('#results').empty();

  const queryURL = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,logo,company,peers,news&range=1m&last=10`;
  
  // Creating an AJAX call for the specific stock button being clicked
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {

    // Creating a div to hold the stock
    const stockDiv = $('<div>').addClass('stock');



    // Storing the company name
    const companyName = response.quote.companyName;

    // Creating an element to display the company name
    const nameHolder = $('<p>').text(`${companyName}`);

    // Appending the name to our stockDiv
    stockDiv.append(nameHolder);


    //***New code for displaying logos */
    // Storing the logo
    const logo = response.logo.url;

    // Creating an element to display the logo image
    const logoHolder = $('<img>').attr("src", `${logo}`);
      
    // Appending the name to our stockDiv
    stockDiv.append(logoHolder);


    // Storing the stock symbol
    const stockSymbol = response.quote.symbol;

    // Creating an element to display the stock symbol
    const symbolHolder = $('<p>').text(`Stock Symbol: ${stockSymbol}`);

    // Appending the symbol to our stockDiv
    stockDiv.append(symbolHolder);


    // Storing the price
    const stockPrice = response.quote.latestPrice;

    // Creating an element to display the price
    const priceHolder = $('<p>').text(`Stock Price: $${stockPrice}`);

    // Appending the price to our stockDiv
    stockDiv.append(priceHolder);


    //***New code for displaying optional content */
    // Optional content checkbox selectors
    var clickHi = document.getElementById("hi");
    var clicklo = document.getElementById("lo");
    var clickDesc = document.getElementById("desc");
    var clickWeb = document.getElementById("web");
    var clickCeo = document.getElementById("ceo");
    var clickNyTimes = document.getElementById("nyt");


    console.log("clickHi", clickHi);
    console.log("clickHi.checked", clickHi.checked)

  

    if (clickHi.checked == true){
        // Storing the 52 week High
        const yearHi = response.quote.week52High;

        // Creating an element to display the 52 week High
        const yearHiHolder = $('<p>').text(`52 Week High: ${yearHi}`);

        // Appending the 52 week High to our stockDiv
        stockDiv.append(yearHiHolder);
    } 
    if (clicklo.checked == true){
      // Storing the 52 week low
      const yearLo = response.quote.week52Low;

      // Creating an element to display the 52 week Low
      const yearLoHolder = $('<p>').text(`52 Week Low: ${yearLo}`);

      // Appending the 52 week Low to our stockDiv
      stockDiv.append(yearLoHolder);
    } 
    if (clickDesc.checked == true){
      // Storing the description
      const description = response.company.description;

      // Creating an element to display the description
      const descriptionHolder = $('<p>').text(`Description: ${description}`);

      // Appending the description to our stockDiv
      stockDiv.append(descriptionHolder);
    } 
    if (clickWeb.checked == true){
      // Storing the Website
      const website = response.company.website;

      // Creating an element to display the website
      const websiteHolder = $('<p>').text(`Website: ${website}`);

      // Appending the website to our stockDiv
      stockDiv.append(websiteHolder);
    } 
    if (clickCeo.checked == true){
      // Storing the CEO name
      const ceo = response.company.CEO;

      // Creating an element to display the CEO
      const ceoHolder = $('<p>').text(`CEO: ${ceo}`);

      // Appending the CEO to our stockDiv
      stockDiv.append(ceoHolder);
    } 
    if (clickNyTimes.checked == true){
        dispNytResults(companyName, 3, 01/01/2000, 01/01/2018);
    } 






    //***New Code for displaying up to 10 news stories */
    for (let i=0; i<response.news.length; i++) {

    // Storing the first news summary
    
    const companyNews = response.news[i].summary;
    

    // Creating an element to display the news summary
    const summaryHolder = $('<p>').text(`IEX Headline: ${companyNews}`);

    // Appending the summary to our stockDiv
    stockDiv.append(summaryHolder);

    };

    // Finally adding the stockDiv to the DOM
    // Until this point nothing is actually displayed on our page
    $('#stocks-view').prepend(stockDiv);
   


    
  });

}
//***New Code */
//Function for getting optional NYTimes content


const dispNytResults = function(keywordInput, numRecordInput, startYearInput, endYearInput) {
  console.log ("displayResults keywordInput", keywordInput);

  const queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=bccea3c2aaa1417790728926205111bc&q=${keywordInput}&beg_date${startYearInput}&end_date${endYearInput}`;
 
  $.ajax({
  url: queryURL,
  method: 'GET'

}).then(function(response) {
  console.log(response);

  for (let i=0; i<numRecordInput; i++) {
  const article = response.response.docs[i].headline.main;
  const articleUrl = response.response.docs[i].web_url;

  console.log("article", article);

  // console.log(jason.stringify(response));

  const artElement = $('<p>').text(`NYTimes Headline: ${article}`);
  const artUrlElement = $('<p>').text(`${articleUrl}`);


  $('#results').prepend(artUrlElement);
  $('#results').prepend(artElement);
  $('#results').prepend(`<hr>`);
 
  }
});

}


// Function for displaying stock data
const render = function () {

  // Deleting the stocks prior to adding new stocks
  // (this is necessary otherwise you will have repeat buttons)
  $('#buttons-view').empty();

  // Looping through the array of stocks
  for (let i = 0; i < stocksList.length; i++) {

    // Then dynamicaly generating buttons for each stock in the array
    // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
    const newButton = $('<button>');
    
    // Adding a class of stock-btn to our button
    newButton.addClass('stock-btn');
    
    // Adding a data-attribute
    newButton.attr('data-name', stocksList[i]);
    
    // Providing the initial button text
    newButton.text(stocksList[i]);
    
    // Adding the button to the buttons-view div
    $('#buttons-view').append(newButton);
  }
}


//***New code for getting list of stock symbols */
const getSymbols = function() {
  const queryURLSymbols = `https://api.iextrading.com/1.0/ref-data/symbols`;
    // const testFunction1 = function() {
      //Ajax call to retrieve the list.
       $.ajax({
         url: queryURLSymbols,
         method: 'GET'
        }).then(function(response) {
        document.getElementById("stock-form").style.display = "block";
          console.log("response",response);
          validationList = response;
          console.log("validationList**",validationList);
          return validationList;
        });
    
}


// This function handles events where one button is clicked
const addButton = function(event) {
  var stockIndex;
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  const stock = ($('#stock-input').val().trim()).toUpperCase();

     
    //***New Code for verifying stock symbols that are input are valid */
    //Verify that user input stock symbol is an existing stock symbol
    //Compare user input stock symbol with symbol list obtained from IEX
    //Would like a faster way to do this.  Didn't make array find() method work yet.
    for (let i=0; i<validationList.length; i++) {
        
        if (stock === validationList[i].symbol) {
          stockIndex = i;
                    
        }
    }
    //***New Code for pushing new stock symbol to the array if it is valid or giving an error message if symbol is not found */
    if (stockIndex) {
    // If stock symbol is valid:  
    // The stock from the textbox is then added to our array
      stocksList.push(stock);
      $('#errMsg').text('');
    } else {
      $('#errMsg').text('Symbol not found.  Try again.');
    }


  // Deletes the contents of the input
  $('#stock-input').val('');

  // calling render which handles the processing of our stock array
  render();
}






//****MAIN BODY**************************************************************/
//Declare variables
  var validationList = 0;

//***New Content */  
//First, let's get the symbol list from IEXTrading because that takes a while
//-----and let's hide the input box until symbols are loaded
document.getElementById("stock-form").style.display = "none";
getSymbols();



// Even listener for #add-stock button
$('#add-stock').on('click', addButton);

// Adding a click event listener to all elements with a class of 'stock-btn'
$('#buttons-view').on('click', '.stock-btn', displayStockInfo);

// Calling the renderButtons function to display the intial buttons
render();



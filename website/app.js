/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// openweathermap URL and personal key for  openweathermap API
let baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
let apiKey = '&appid=c2ae883c71a63c2ef6efcdfb0631fab6';

// Add Event Listner with function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

// Function called by event listener
function performAction(e){
  const newZip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  getWeather(baseURL,newZip, apiKey)

  .then(function(data){
    console.log(data);
    //Add data
    postData('/add', {date:newDate, temp:data.list[0].main.temp, content:feelings})
    updateUI();
  })
};

// Function to Get web API addData
const getWeather = async (baseURL, zip, key) =>{

  const res = await fetch(baseURL+zip+key)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

const postData = async ( url = '', data = {})=>{
      console.log(data);
      const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

      try {
        const newData = await response.json();
               return newData;
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  }

  const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = `Date: ${allData[0].date}`;
    document.getElementById('temp').innerHTML = `Tempertuer: ${allData[0].temp}`;
    document.getElementById('content').innerHTML = `I feel: ${allData[0].content}`;

  }catch(error){
    console.log("error", error);
  }
}

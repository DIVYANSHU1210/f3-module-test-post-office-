const ip = document.querySelector(".ip-section>div");

const btn = document.getElementById("btn");


$.getJSON("https://api.ipify.org?format=json", function(data) {     
        ip.innerHTML = `
        <h3>Your Current IP Address is <span style="color: rgb(255, 254, 254);">${data.ip}</span></h3>
        `
        window.localStorage.setItem('ip', data.ip);
})


btn.addEventListener("click", ()=>{
    const successCallback = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Store latitude and longitude in local storage
        const locationData = {
            lat: latitude,
            lng: longitude
        };

        window.localStorage.setItem('locationData', JSON.stringify(locationData));
        window.location.href = './postOffices.html' ;
      }
      
      const errorCallback = (error) => {
        console.log(error);
      }
      
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);     
})




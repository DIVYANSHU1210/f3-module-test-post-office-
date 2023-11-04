const locationSection = document.querySelector(".userLocation");
const moreInfoSection = document.querySelector(".more-info");
const mapContainer = document.querySelector(".map");
const cardContainer = document.querySelector(".card-section");
const search = document.getElementById("search")

const loaderSection = document.querySelector(".loaderSection"); 
const main = document.querySelector(".main") ;

const userIP = window.localStorage.getItem("ip");
const locationSTR = window.localStorage.getItem('locationData');

const locationData = JSON.parse(locationSTR);

const date = new Date()
var message;
let postOfficesArr=[];
async function fetchAPI(ip){
    const responce = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await responce.json();
    await fetchPostalApi(data.postal);
    renderData(data);
    renderMap(locationData.lat, locationData.lng); 
    loaderSection.style = "dispaly:none";
    main.style = "display:block";

} 

fetchAPI(userIP);

function renderData(data){
    locationSection.innerHTML = `
        <h3>IP Address : <span>${userIP}</span></h3>
        <table class="locationTable">
            <tr>
                <td>Lat: <span>${locationData.lat}</span></td>
                <td>City:<span>${data.city}</span></td>
                <td>Organisation:<span>${data.org}</span></td>
            </tr>
            <tr>
                <td>Long: <span>${locationData.lng}</span></td>
                <td>Region:<span>${data.region}</span></td>
                <td>HostName: <span>${data.network}</span></td>
            </tr>
        </table>
    `

    moreInfoSection.innerHTML = `
        <h2>More Information About You</h2>
        <p>Time Zone: <span>${data.timezone}</span></p>
        <p>Date And Time: <span>${date}</span></p>
        <p>Pincode: <span>${data.postal}</span></p>
        <p>Message: <span>${message}</span></p>
    `

}



function renderMap(lat, lng){
    mapContainer.innerHTML = `<iframe src="https://maps.google.com/maps?q=${lat}, ${lng}&output=embed" frameborder="0" style="border: 0;"></iframe>
    </div>`
}



async function fetchPostalApi(postal){
    const responce  = await fetch(`https://api.postalpincode.in/pincode/${postal}`);
    const data = await responce.json();

    message = data[0].Message;
    postOfficesArr = data[0].PostOffice;
    renderPostOfficeData(data[0].PostOffice);
    
}


function renderPostOfficeData(data){
    cardContainer.innerHTML="";

    data.forEach(postOffice => {
        const card = document.createElement('div')
        card.className = "card";
        card.innerHTML = `
            <p>Name : <span>${postOffice.Name}</span></p>
            <p>Branch Type : <span>${postOffice.BranchType}</span></p>
            <p>Delivery Status: <span>${postOffice.DeliveryStatus}</span></p>
            <p>District: <span>${postOffice.District}</span></p>
            <p>Division: <span>${postOffice.Division}</span></p>
        `

        cardContainer.appendChild(card);
    });


}



search.addEventListener("keyup", (event)=>{
    const searchText = event.target.value.toLowerCase();
    filterByName(searchText, postOfficesArr);
})

function filterByName(searchText, postOfficesArr){
    const filterData=postOfficesArr.filter((ele)=>{
        return ele.Name.toLowerCase().includes(searchText);

    })

    renderPostOfficeData(filterData);
}
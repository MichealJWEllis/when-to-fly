// API Key openweather
const apiKey = "b773ba3167fd9791028d0f0f123759cc";
// Default view for map of the North American continent.
mapboxgl.accessToken = 'pk.eyJ1IjoibWVsbGlzMTAyMzk2IiwiYSI6ImNrbXVwcDhhNjEzeXEyd3E1cmdjOWc0emwifQ.Jusfg2NUaXj_tZbA899ZSg';
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mellis102396/ckmups1cn4s5e17nosaokzhl8', // style URL
  center: [-95.665, 37.6], // starting position [lng, lat]
  zoom: 2 // starting zoom
});
// Will take input from user to zero in on map to users location
$("#subButton").click(function () {
  zipper = $("#userInput").val();
  zipInput = parseInt(zipper)
  if (isNaN(zipInput)) {
    alert("Please enter a valid Zip code!")
    $("#userInput").val('');
    location.reload();
  }
  zipLookUp();
});
// Use of opendatasoft.com to get the longitude and latitude of user via zip code
// opendatasoft api for zip code conversion to longitude latitude
// https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=&facet=state&facet=timezone&facet=dst
// example of use
// https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=43606&facet=state&facet=timezone&facet=dst
function zipLookUp() {
  let locSearch = zipInput
  // console.log(mike);
  fetch('https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=' + locSearch + '&facet=state&facet=timezone&facet=dst')
    // function converted via VSC suggestion
    .then(response => response.json())
    .then(function (data) {
      lon = data.records[0].geometry.coordinates[0]
      lat = data.records[0].geometry.coordinates[1]
      mapZipDisplay();
      fiveDay();
    });
}
// Adjusts the map to the users current location via zip with an adjusted zoom level.
// Includes Api key for map 
function mapZipDisplay() {
  areaUpdate();
  function areaUpdate() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWVsbGlzMTAyMzk2IiwiYSI6ImNrbXVwcDhhNjEzeXEyd3E1cmdjOWc0emwifQ.Jusfg2NUaXj_tZbA899ZSg';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mellis102396/ckmups1cn4s5e17nosaokzhl8',
      center: [lon, lat],
      zoom: 11
    });
  }
}
// Random drone tips video on page reload. 
function randoVideo() {
  var videos = ["https://www.youtube.com/embed/7vFCA2EVxbo", "https://www.youtube.com/embed/5pOZ9L5cr00", "https://www.youtube.com/embed/hpGVW3PWJeE", "https://www.youtube.com/embed/p98MzO8APqE", "https://www.youtube.com/embed/cA76r-pZtIs", "https://www.youtube.com/embed/P_w_SxRu7ZU"];
  window.onload = function () {
    var playerDiv = document.getElementById("rando_player");
    var player = document.createElement("iframe");
    var randomVidUrl = videos[Math.floor(Math.random() * videos.length)];
    player.setAttribute('width', '100%');
    player.setAttribute('height', '310');
    player.setAttribute('src', randomVidUrl);

    playerDiv.appendChild(player);
    document.getElementById("reload").addEventListener("click", function () {
      $('#rando_player').html('');
      onload();
    })
  };
}

function fiveDay() {
  console.log(lon, lat);
  // console.log(apiKey);
  fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial')
    .then(function (response) {
      return (response.json())
    })
    .then(function (five) {
      // console.log(five);
      for (let i = 0; i != five.list.length; i += 8) {
        console.log(five.list[i]);
        let aDate = five.list[i].dt_txt;
        let bDate = aDate.slice(0, 10);
        let fiveDate = moment(bDate).format('MM/DD/YY');
        let aTemp = five.list[i].main.temp;
        let bTemp = Math.floor(aTemp);
        let aIcon = five.list[i].weather[0].icon;
        let bIcon = 'https://openweathermap.org/img/w/' + aIcon + '.png';
        let wind = five.list[i].wind.speed + " MPH";
        // console.log(wind)
        console.log(aIcon);
        console.log(bIcon);
        $(".uk-grid-small").append('<div><div class="uk-card uk-card-default uk-card-body"><h5>' + fiveDate + '</h5><img src=' + bIcon + '><p>Temp: ' + bTemp + '</p></div></div>')
      }
    })

}

randoVideo();
// document.getElementById("reload").addEventListener("click", function() {

// })









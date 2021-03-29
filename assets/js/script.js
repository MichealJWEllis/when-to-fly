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
function zipLookUp() {
  let locSearch = zipInput
  // console.log(mike);
  fetch('https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=' + locSearch + '&facet=state&facet=timezone&facet=dst')
    .then(response => response.json())
    .then(function (data) {
      lon = data.records[0].geometry.coordinates[0]
      lat = data.records[0].geometry.coordinates[1]
      mapZipDisplay();
    });
}
// Adjusts the map to the users current location via zip with an adjusted zoom level. 
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
  








// fetch('https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=' + test() + '=state&facet=timezone&facet=dst')
//   .then(response => response.json())
//   .then(data => console.log(data));


// opendatasoft api for zip code conversion to longitude latitude
// https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=&facet=state&facet=timezone&facet=dst
// example of use
// https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=43606&facet=state&facet=timezone&facet=dst
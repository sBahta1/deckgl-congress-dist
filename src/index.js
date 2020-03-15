window.initMap = () =>{
  const map = new google.maps.Map(document.getElementById('map'),{
    center: { lat: 39.922121, lng: -75.163536 },
    zoom: 13,
    styles: mapStyles
  });
}
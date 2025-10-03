if(typeof strMapGoogAccess !== 'undefined' && typeof strMapGoogApi !== 'undefined'){
	goongjs.accessToken = strMapGoogAccess;
	if(typeof option_zoom === 'undefined')
		option_zoom = 5;
	if(isNaN(option_zoom))
	   option_zoom = 5; 
	var map_api = "https://rsapi.goong.io/Place/[FUNCTION]?api_key="+strMapGoogApi;
	//var position = [106.6897878, 10.783415];
	if(typeof arrPostion === 'undefined'){
		arrPostion = [106.6897878, 10.783415];
	}
	var position = [parseFloat(arrPostion[1]), parseFloat(arrPostion[0])];
	var map = new goongjs.Map({
		container: 'map',
		style: 'https://tiles.goong.io/assets/goong_map_web.json', 
		center: position, 
		zoom: option_zoom 
	}); 
	if(typeof pinData !== 'undefined'){
		var arrData = [];
		$.each(pinData, function(key, val) {
		   var strPosition = val.position;
		   strPosition = strPosition.substring(1);
		   strPosition = strPosition.substring(0, strPosition.length - 1);
		   var arrPosition = strPosition.split(",");
		   var objData = {
				'type': 'Feature',
				'properties': {
				'description':
					val.title
				},
				'geometry': {
					'type': 'Point',
					'coordinates': [
						$.trim(arrPosition[1]), $.trim(arrPosition[0])
					]
				}
			};
			arrData.push(objData);	
		});   
		map.on('load', function () {
			map.loadImage(
			STATIC_TN+'images/custom_marker.png',
			function (error, image) {
			if (error) throw error;
			map.addImage('custom-marker', image);
			 
			map.addSource('places', {
			'type': 'geojson',
			'data': {
			'type': 'FeatureCollection',
			'features': arrData
			}
			});
			 
			map.addLayer({
			'id': 'places',
			'type': 'symbol',
			'source': 'places',
			'layout': {
			'icon-image': 'custom-marker',
			'icon-allow-overlap': true
			}
			});
			}
			);
			 
			var popup = new goongjs.Popup({
				closeButton: false,
				closeOnClick: false
			});
			 
			map.on('mouseenter', 'places', function (e) {
				var coordinates = e.features[0].geometry.coordinates.slice();
				var description = e.features[0].properties.description;
				 
				
				while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
					coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
				}
				 
				new goongjs.Popup()
				.setLngLat(coordinates)
				.setHTML(description)
				.addTo(map);
			});
			 
			map.on('mouseleave', 'places', function () {
				//$('.mapboxgl-popup-close-button').trigger('click');
				//map.getCanvas().style.cursor = '';
				//popup.remove();
			});
		});
			
	}else{
		var marker = new goongjs.Marker({draggable: true})
		.setLngLat(position)
		.addTo(map);

		function onDragEnd() {
			var lngLat = marker.getLngLat();
			$("#lng").val(lngLat.lng);
			$("#lat").val(lngLat.lat);
		}
			 
		marker.on('dragend', onDragEnd);
		var strAddress = $("#address").val();
		if(typeof strAddress !== 'undefined' && strAddress != '')
			callListGoongmap($("#address").val());
	}
}
function initMap(location, strTitle){
    var popup = new goongjs.Popup({ closeOnClick: false })
        .setLngLat([location.lng, location.lat])
        .setHTML(strTitle)
        .addTo(map);

}

function arrMap(location, strTitle){
	var objData = {
		'type': 'Feature',
		'properties': {
		'description':
			strTitle
		},
		'geometry': {
			'type': 'Point',
			'coordinates': [
				location.lng, location.lat
			]
		}
	};
	arrData.push(objData);	
}

function pointMapTile(id,str){
    let funcname = "Detail";
    let detail_addr_api = map_api.replace("[FUNCTION]", funcname) + "&place_id=" + encodeURI(id);
    $.get(detail_addr_api, function(resp){
        if(resp.status == "OK" && typeof resp.result.geometry != "undefined"){
            //console.log(resp.result.geometry.location);
            //initMap(resp.result.geometry.location,str);
			arrMap(resp.result.geometry.location,str);
        }
    },'json');
	

}



function callGoongmap(addr,str){
    let funcname = "AutoComplete";
    let suggest_addr_api = map_api.replace("[FUNCTION]", funcname) + "&input=" + encodeURI(addr);
    //console.log(addr);
    $.get(suggest_addr_api, function(resp){
        //console.log(resp);
        if(resp.status=="OK"){
            //console.log(resp.predictions);
            data = resp.predictions;
            if(data.length > 0){
                for(var i=0; i<data.length;i++){
                    if(i==0){
                        pointMapTile(data[i].place_id,str);
                    }
                    
                }
            }

        }
    }, "json");
}

function callListGoongmap(addr){
	let funcname = "AutoComplete";
	let suggest_addr_api = map_api.replace("[FUNCTION]", funcname) + "&input=" + encodeURI(addr);
	$.get(suggest_addr_api, function(resp){
		//console.log(resp);
		if(resp.status=="OK"){
			displayList(resp.predictions);
		}
	}, "json");
}
function displayList(data){
	var matched = [];
	var matchedID = [];
	for(var i=0; i<data.length;i++){
	   matched.push(data[i].description);
	   matchedID[data[i].description] = data[i].place_id;
	}
	if(data.length > 0){
		$("#address").autocomplete({
			  source: function(request, response) {    
					response(matched);
				},
				focus: function( event, ui ) {
					return false;
				},
				select: function( event, ui ) {
					//console.log(matchedID[ui.item.value]);
					//console.log(ui.item.value);
					$("#address").val( ui.item.value);
					pointListMapTile(matchedID[ui.item.value]);
					
					return false;
				}
			}).data("autocomplete")._renderItem = function( ul, item ) {
				return $( "<li></li>" )
					.data( "item.autocomplete", item )
					.append( "<a>" + item.value+"</a>" )
					.appendTo( ul );
			};
	}
}
function pointListMapTile(id){
	let funcname = "Detail";
	let detail_addr_api = map_api.replace("[FUNCTION]", funcname) + "&place_id=" + encodeURI(id);
	$.get(detail_addr_api, function(resp){
		if(resp.status == "OK" && typeof resp.result.geometry != "undefined"){
			initListMap(resp.result.geometry.location);
		}
	},'json')
}

function initListMap(location){
	$("#lng").val(location.lng);
	$("#lat").val(location.lat);
	position = [location.lng, location.lat];
	marker.setLngLat(position).addTo(map);
	map.setCenter(position);
	map.setZoom(14);
}

function initializeGoogleMap() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var center = {lat: parseFloat(arrPostion[0]), lng: parseFloat(arrPostion[1])};
    var mapOptions = {
        scaleControl: true,
        center: center,
        zoom: option_zoom,
        zoomControl:false,
        mapTypeControl:false,
        scaleControl:false,
        rotateControl:false,
        streetViewControl:false
    };
                    
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
        
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Loop through our array of markers & place each one on the map 
    var geocoder = new google.maps.Geocoder();
    
    $.each(pinData, function(key, val) { 
        if(val.position != ''){
                var location = (val.position).toString();
                location = location.replace("(", ""); 
                location = location.replace(")", "");
                var pos = location.split(', ');				 
                var position = new google.maps.LatLng(pos[0], pos[1]);
                marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    //title: val.title
                });

                // Allow each marker to have an info window    
                google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
                    return function() {
                        infoWindow.setContent(val.title);
                        infoWindow.open(map, marker);
                    }
                })(marker, i));
        }else{
            geocoder.geocode( { 'address': val.address}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var location = (results[0].geometry.location).toString();
                        location = location.replace("(", ""); 
                        location = location.replace(")", "");
                        var pos = location.split(', ');

                        var position = new google.maps.LatLng(pos[0], pos[1]);
                        marker = new google.maps.Marker({
                            position: position,
                            map: map,
                            title: val.title
                        });

                        // Allow each marker to have an info window    
                        google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
                            return function() {
                                infoWindow.setContent(val.title);
                                infoWindow.open(map, marker);
                            }
                        })(marker, i));

                    } 
            });
        }
    });
   
}

/*
* Backup google maps
*
$("#address").geocomplete({
	map: "#map",
	location: [DEFAULT_LATITUDE, DEFAULT_LONGITUDE],
	markerOptions: {
		draggable: true
	}
}).bind("geocode:dragged", function(event, latLng){
	$("#lat").val(latLng.lat());
	$("#lng").val(latLng.lng());
	var geocoder = new google.maps.Geocoder();
	var myLatlng = new google.maps.LatLng(latLng.lat(),latLng.lng());
	geocoder.geocode({
			'latLng': myLatlng 
			}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
							if (results[0])
									$('#address').val(results[0].formatted_address);
					}
	});	
}).bind("geocode:idle", function(event, latLng) {
	$("#lat").val(latLng.lat());
	$("#lng").val(latLng.lng());
});
*/
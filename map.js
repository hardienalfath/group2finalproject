var osm = new ol.layer.Tile({
	visible: true,
	source: new ol.source.OSM(),
	title: "osm",
	type: "base"
});

var bingRoads = new ol.layer.Tile({
	title: 'Bing Maps—Roads',
	type: 'base',
	visible: false,
	source: new ol.source.BingMaps({
		key: 'AunOggr99OZJi7MBNsm4JOehUMiHECCg1zYFnxLsEKqWpsXY-zC6WEWdRslLPFYu',
		imagerySet: 'Road'
	})
});

var bingAerial = new ol.layer.Tile({
	title: 'Bing Maps—Aerial',
	type: 'base',
	visible: false,
	source: new ol.source.BingMaps({
		key: 'AunOggr99OZJi7MBNsm4JOehUMiHECCg1zYFnxLsEKqWpsXY-zC6WEWdRslLPFYu',
		imagerySet: 'Aerial'
	})
});

var bingAerialWithLabels = new ol.layer.Tile({
	title: 'Bing Maps—Aerial with Labels',
	type: 'base',
	visible: false,
	source: new ol.source.BingMaps({
		key: 'AunOggr99OZJi7MBNsm4JOehUMiHECCg1zYFnxLsEKqWpsXY-zC6WEWdRslLPFYu',
		imagerySet: 'AerialWithLabels'
	})
});

var stamenWatercolor = new ol.layer.Tile({
	title: 'Stamen Watercolor',
	type: 'base',
	visible: false,
	source: new ol.source.Stamen({
		layer: 'watercolor'
	})
});
var stamenToner = new ol.layer.Tile({
	title: 'Stamen Toner',
	type: 'base',
	visible: false,
	source: new ol.source.Stamen({
		layer: 'toner'
	})
});

var globeland30milano = new ol.layer.Image({
	visible: false,
	source: new ol.source.ImageWMS({
		url: 'http://localhost:8080/geoserver/wms',
		params: {'LAYERS': 'final_project:geotiff_coverage'}
	}),
	title: "GL30MI"
});

var milanoComune = new ol.layer.Image({
	source: new ol.source.ImageWMS({
		url: 'http://localhost:8080/geoserver/wms',
		params: {'LAYERS': 'final_project:L090102_ComuneMilano'}
	}),
	title: "COMUNE"
});

var milanoBoundary = new ol.layer.Image({
	source: new ol.source.ImageWMS({
		url: 'http://localhost:8080/geoserver/wms',
		params: {'LAYERS': 'final_project:Borders_Group2'}
	}),
	title: "BOUNDARY"
});

var artificialsurface = new ol.layer.Image({
	source: new ol.source.ImageWMS({
		url: 'http://localhost:8080/geoserver/wms',
		params: {'LAYERS': 'final_project:artificial_surface'}
	}),
	title: "ARTIFICIAL SURFACE"
});

var cultivatedland = new ol.layer.Image({
	source: new ol.source.ImageWMS({
		url: 'http://localhost:8080/geoserver/wms',
		params: {'LAYERS': 'final_project:cultivated_land'}
	}),
	title: "CULTIVATED LAND"
});

var bareland = new ol.layer.Image({
	source: new ol.source.ImageWMS({
		url: 'http://localhost:8080/geoserver/wms',
		params: {'LAYERS': 'final_project:bare_land'}
	}),
	title: "BARE LAND"
});

var forest = new ol.layer.Image({
	source: new ol.source.ImageWMS({
		url: 'http://localhost:8080/geoserver/wms',
		params: {'LAYERS': 'final_project:forest'}
	}),
	title: "FOREST"
});

var grassland = new ol.layer.Image({
	source: new ol.source.ImageWMS({
		url: 'http://localhost:8080/geoserver/wms',
		params: {'LAYERS': 'final_project:grassland'}
	}),
	title: "GRASSLAND"
});

var map = new ol.Map({
	target: document.getElementById('map'),
	layers: [
	new ol.layer.Group({
		title: 'Basemaps',
		layers: [osm,bingRoads,bingAerial,bingAerialWithLabels,stamenWatercolor,stamenToner]
	}),
	new ol.layer.Group({
		title: 'Overlay Layers',
		layers: [globeland30milano,milanoComune,milanoBoundary,artificialsurface,cultivatedland,bareland,forest,grassland]
	})
	],
	view: new ol.View({
		center: ol.proj.fromLonLat([9.2189, 45.428]),
		zoom: 11
	}),
	controls: ol.control.defaults().extend([
		new ol.control.ScaleLine(),
		new ol.control.FullScreen(),
		new ol.control.OverviewMap(),
		new ol.control.MousePosition({
			coordinateFormat: ol.coordinate.createStringXY(4),
			projection: 'EPSG:4326'
		})
		])
});

var elementPopup = document.getElementById('popup');

var popup = new ol.Overlay({
	element: elementPopup
});

map.addOverlay(popup);

map.on('click', function(event) {
	var feature = map.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
		return feature;
	});
	if (feature != null) {
		var pixel = event.pixel;
		var coord = map.getCoordinateFromPixel(pixel);
		popup.setPosition(coord);
		$(elementPopup).attr('title', 'POI');
		$(elementPopup).attr('data-content', '<b>Id: </b>' + feature.get('id') +
			'</br><b>Description: </b>' + feature.get('class'));
		$(elementPopup).popover({'placement': 'top', 'html': true});
		$(elementPopup).popover('show');
	}
});

map.on('pointermove', function(e) {
	if (e.dragging) {
		$(elementPopup).popover('destroy');
		return;
	}
	var pixel = map.getEventPixel(e.originalEvent);
	var hit = map.hasFeatureAtPixel(pixel);
	map.getTarget().style.cursor = hit ? 'pointer' : '';
});

map.on('click', function(event) {
	document.getElementById('info').innerHTML = '';
	var viewResolution = (map.getView().getResolution());
	var url = globeland30milano.getSource().getGetFeatureInfoUrl(event.coordinate,
		viewResolution, 'EPSG:3857', {'INFO_FORMAT': 'text/html'});
	if (url)
		document.getElementById('info').innerHTML = '<iframe seamless src="' + url + '"></iframe>';
});

var layerSwitcher = new ol.control.LayerSwitcher({});
map.addControl(layerSwitcher);


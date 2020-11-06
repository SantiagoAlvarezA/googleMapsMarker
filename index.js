


const citymap = {
    origen: {
        center: { lat: 4.7309207, lng: -74.0305993 },
        colorPrimaryDark: "#850000",
        colorPrimary: "#203572",
    },
    destino: {
        center: { lat: 4.601928, lng: -74.0726496 },
        colorPrimaryDark: "#203572",
        colorPrimary: "#850000",
    },
};

function initMap() {
    // Create the map.
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: { lat: 4.636059, lng: -74.0722241 },
        mapTypeId: "roadmap",
    });

    // Construct the circle for each value in citymap.
    // Note: We scale the area of the circle based on the population.
    for (const city in citymap) {
        // Add the circle for this city to the map.
        const cityCircle = new google.maps.Circle({
            strokeColor: citymap[city].colorPrimary,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: citymap[city].colorPrimaryDark,
            fillOpacity: 0.35,
            map,
            center: citymap[city].center,
            radius: 500,
        });
    }

    // Add a marker at the center of the map.
    addMarker(citymap.origen.center, map, "Origen", "#26304E");
    addMarker(citymap.destino.center, map, "Destino", "#850000");

    formatingArr(arr).uniqueUrls.forEach(el => {
        addUniqueUrlMarker(map,el.pos, el.url)
    });

    formatingArr(arr).multipleUrls.forEach(el => {
        addMultipleUrlMarker(map,el.pos, el.url)
    });


}

// Adds a marker to the map.
function addMarker(location, map, title, fillColor) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.

    let marker = new google.maps.Marker({
        position: location,
        map: map,
        title: title,
        icon: {
            path: "M27.648 -41.399q0 -3.816 -2.7 -6.516t-6.516 -2.7 -6.516 2.7 -2.7 6.516 2.7 6.516 6.516 2.7 6.516 -2.7 2.7 -6.516zm9.216 0q0 3.924 -1.188 6.444l-13.104 27.864q-0.576 1.188 -1.71 1.872t-2.43 0.684 -2.43 -0.684 -1.674 -1.872l-13.14 -27.864q-1.188 -2.52 -1.188 -6.444 0 -7.632 5.4 -13.032t13.032 -5.4 13.032 5.4 5.4 13.032z",
            scale: 0.6,
            strokeWeight: 0.2,
            strokeColor: 'black',
            strokeOpacity: 1,
            fillColor: fillColor,
            fillOpacity: 0.85,
        },
    });

    marker.addListener("click", () => {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    });




}

function addUniqueUrlMarker(map,location, url) {

    const contentString = `<img src="${url}" class="d-block w-100" alt="...">`;

    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    let marker = new google.maps.Marker({
        position: location,
        map: map,
    });

    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });
}


function addMultipleUrlMarker(map,location, urls) {
    let contentString =
        `<div id="carouselExampleControls" class="carousel slide" style="width:100px" data-ride="carousel">
            <div class="carousel-inner" style="width:100px">`;


    for (let index = 0; index < urls.length; index++) {
        contentString += `<div class="carousel-item ${index == 0 ? "active" : ''}">
                            <img src="${urls[index]}" class="d-block w-100" alt="...">
                        </div>`

    }

    // <div class="carousel-item active">
    //     <img src="${data.multipleUrls[0].url[0]}" class="d-block w-100" alt="...">
    // </div>
    // <div class="carousel-item">
    //     <img src="${data.multipleUrls[0].url[0]}" class="d-block w-100" alt="...">
    // </div>



    contentString += `</div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>`;

    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    let marker = new google.maps.Marker({
        position: location,
        map: map,
    });

    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });
}


var arr = [
    { pos: { lat: 4.7309207, lng: -74.0305993 }, url: 'https://dummyimage.com/600x400/000/aaa' },
    { pos: { lat: 4.7309207, lng: -74.0305993 }, url: 'https://dummyimage.com/600x400/000/aaa' },
    { pos: { lat: 4.601928, lng: -74.0726496 }, url: 'https://dummyimage.com/600x400/000/aaa' },
    { pos: { lat: 4.636059, lng: -74.0722241 }, url: 'https://dummyimage.com/600x400/000/aaa' },
    { pos: { lat: 4.7309207, lng: -74.0305993 }, url: 'https://dummyimage.com/600x400/000/aaa' },
    { pos: { lat: 4.601928, lng: -74.0726496 }, url: 'https://dummyimage.com/600x400/000/aaa' },
    { pos: { lat: 4.7309207, lng: -74.0305993 }, url: 'https://dummyimage.com/600x400/000/aaa' }
];

// console.log(formatingArr(arr));

function formatingArr(nehibourhood) {

    let multipleUrls = [];
    let uniqueUrls = [];

    nehibourhood.forEach(i => {
        let isExist = false;

        nehibourhood.forEach(j => {
            let posi = nehibourhood.indexOf(i)
            let posj = nehibourhood.indexOf(j)

            if (posj != posi) {

                if (i.pos.lat === j.pos.lat && i.pos.lng === j.pos.lng) {
                    isExist = true;
                    return true;
                }
            }
        });

        if (isExist) {

            if (multipleUrls.length > 0) {
                let isAdd = true;
                multipleUrls.forEach(element => {
                    if (element.pos.lat === i.pos.lat && element.pos.lng === i.pos.lng) {
                        isAdd = false;
                        element.url.push(i.url)
                        return true;
                    }
                });

                if (isAdd) {
                    multipleUrls.push({ pos: { lat: i.pos.lat, lng: i.pos.lng }, url: [i.url] });
                }
            } else
                multipleUrls.push({ pos: { lat: i.pos.lat, lng: i.pos.lng }, url: [i.url] },);
        } else
            uniqueUrls.push(i);

    });

    return {
        uniqueUrls: uniqueUrls,
        multipleUrls: multipleUrls
    };
}
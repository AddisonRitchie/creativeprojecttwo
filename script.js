//key: SmJJXRrI
//Rijksstudio API, Art History FTW!!!

// console.log("testing testing");


document.getElementById("searchInput").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("artInput").value;
    if (value === "")
        return;
    console.log(value);


    //   var myurl = "https://cors-anywhere.herokuapp.com";
    //   myurl += "/xkcd.com/info.0.json";

    //value equals artInput
    const url = "https://www.rijksmuseum.nl/api/en/collection?q=Q&key=SmJJXRrI&format=json".replace("Q", value);

    // const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=76d0660ad643ad644d8d13315e38d597";
    fetch(url) //send request
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json);
            let results = "";

            if (json.artObjects.length === 0) {
                results = '<p> Sorry, no results. Try entering a different name or spelling </p>'
            }
            else {
                for (let i = 0; i < json.artObjects.length; i++) {
                    results += '<div class="singleArt">';

                    if (json.artObjects[i].hasImage === true) {
                        results += '<a href="' + json.artObjects[i].webImage.url.replace("s0", "s256") + '"> <img src="' + json.artObjects[i].webImage.url.replace("s0", "s256") + '"/></a>';
                        results += '<a href="https://www.rijksmuseum.nl/nl/zoeken/objecten?q=' + json.artObjects[i].title + '"><h3>' + json.artObjects[i].title + '</h3>';
                        results += '<a href="https://www.rijksmuseum.nl/nl/zoeken/objecten?q=' + json.artObjects[i].principalOrFirstMaker + '"><p>' + json.artObjects[i].principalOrFirstMaker + '</p>';
                        
                        // //Trying to get date
                        // var id = json.artObjects[i].objectNumber;
                        // var url2 = 'https://www.rijksmuseum.nl/api/en/collection/' + id + '?key=SmJJXRrI&format=json';
                        // //GET /api/[culture]/collection/[object-number] 
                        // //https://www.rijksmuseum.nl/api/nl/collection/SK-C-5?key=[API_KEY]&format=json
                        // fetch(url2) //send request to get date 
                        //     .then(function(response) {
                        //         return response.json();
                        //     }).then(function(json) {
                        //         console.log(json);
                        //         result += '<p>' + json.artObjects[i].dating.presentingDate + '</p>';
                        //     });
                            
                    }
                    else {
                        results += '<h2> Image not available </h2>'
                        results += '<a href="https://www.rijksmuseum.nl/nl/zoeken/objecten?q=' + json.artObjects[i].title + '"><h3>' + json.artObjects[i].title + '</h3>';
                        results += '<a href="https://www.rijksmuseum.nl/nl/zoeken/objecten?q=' + json.artObjects[i].principalOrFirstMaker + '"><p>' + json.artObjects[i].principalOrFirstMaker + '</p>';
                    }
                    results += '</div>';

                }

            }

            document.getElementById("artResult").innerHTML = results;

        });
});

// // search the collection using a JSON call
//       function search(query) {
//         return $.getJSON("https://www.rijksmuseum.en/api/en/collection?q=Q&key=SmJJXRrI&format=json".replace("Q", query));
//       }

//       // creates a thumbnail image for the specified art object
//       function thumbnail(object) {
//         return $("<div>")
//           .addClass("thumb")
//           .css("background-image", "url(" + object.webImage.url.replace("s0", "s128") +")");
//       }

//       // fire the search query
//       search($("#query").val())
//         .done(function(results) {
//           $("#example3-container").empty();

//           var $table = $("#example3-container");
//           $table.html("");

//           // create a row for each art object found
//           $.each(results.artObjects, function(index, object) {
//             console.log(object);   

//             var $row = $('<tr class="child"><td>' 
//               + object.objectNumber
//               +'</td><td class="thumbnail">'
//               +'</td><td>'
//               + object.title
//               +'</td></tr>').appendTo($table);

//             $row.find(".thumbnail").append(thumbnail(object));

//             // // make each row clickable, navigating to the relevant page on the Rijksmuseum website
//             // $row.on("click", function() {
//             //   document.location = object.links.web;
//             // });
//           })
//         });

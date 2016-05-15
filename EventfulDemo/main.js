
$(document).ready(function () {

    var baseUrl = "http://api.eventful.com/json/events/search";
    var authenticationString = "app_key=Mt5gmQJNpc3RLpMj";
    var successEventsJson = function(data, textStatus, jqxhr) {
        console.log(textStatus);
        //eventJson = data;
        console.log(events);
        var totalItems = events.total_items;
        var pageSize = events.page_size;
        var firstTitle = events.events.events[0].title;
        console.log(totalItems);
        console.log(pageSize);
        console.log(firstTitle);
    };
    var completeEventsJson = function(jqxhr, textStatus) {
        console.log(textStatus);
    };
    var errorEventsJson = function(jqxhr, textStatus, errorThrown) {
        console.log("Error:" + textStatus + ":" + errorThrown);
    };
    var displayHeader = function(eventJson) {
        var totalItems = eventJson.total_items;
        var pageSize = eventJson.page_size;
        var pageNumber = eventJson.page_number;
        var pageCount = eventJson.page_count;

        console.log(totalItems);
        console.log(pageSize);
        console.log(pageNumber);
        console.log(pageCount);
        console.log("***********************");

    };
    var displayEvents = function(eventArray) {
        for (var n = 0; n < eventArray.length; n++) {
            var title = eventArray[n].title;
            var address = eventArray[n].venue_address;
            var city = eventArray[n].city_name;
            var region = eventArray[n].region_name;
            var country = eventArray[n].country_name;
            var startTime = eventArray[n].start_time;
            var description = eventArray[n].description;
            var performers = eventArray[n].performers;
            //var imageUrl = eventArray[n].image.medium.url;
            //var imageHeight = eventArray[n].image.medium.height;
            //var imageWidth = eventArray[n].image.medium.width;
            var venueUrl = eventArray[n].venue_url;

            console.log(title);
            console.log(address);
            console.log(city);
            console.log(region);
            console.log(country);
            console.log(startTime);
            console.log(description);
            console.log(performers);
            console.log(venueUrl);
            console.log("***********************");
        }
    };
    // todo use anonymous function to pass event arg?
    var searchEvents = function (event) {
        var location = $("#location").val();
        var queryString = "?" + authenticationString + "&location=" + location;
        var url = baseUrl + queryString;
        var ajaxSettings = {
            url: url,
            success: function (eventJson) {
                displayHeader(eventJson);
                displayEvents(eventJson.events.event);


            },
            jsonp: "callback",
            dataType: "jsonp"
        };

        console.log(url);
        $.ajax(ajaxSettings);

        //event.preventDefault();
        return false;
    };

    $("#search").click(searchEvents);
});

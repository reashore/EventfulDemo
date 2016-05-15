
$(document).ready(function () {

    var baseUrl = "http://api.eventful.com/json/events/search";
    var authenticationString = "app_key=Mt5gmQJNpc3RLpMj";
    //var displayHeader = function (eventJson) {
    //    var totalItems = eventJson.total_items;
    //    var pageSize = eventJson.page_size;
    //    var pageNumber = eventJson.page_number;
    //    var pageCount = eventJson.page_count;

    //    console.log(totalItems);
    //    console.log(pageSize);
    //    console.log(pageNumber);
    //    console.log(pageCount);
    //    console.log("***********************");
    //};
    //var displayEvents = function (eventArray) {
    //    for (var n = 0; n < eventArray.length; n++) {
    //        var title = eventArray[n].title;
    //        var address = eventArray[n].venue_address;
    //        var city = eventArray[n].city_name;
    //        var region = eventArray[n].region_name;
    //        var country = eventArray[n].country_name;
    //        var startTime = eventArray[n].start_time;
    //        var description = eventArray[n].description;
    //        var performers = eventArray[n].performers;
    //        //var imageUrl = eventArray[n].image.medium.url;
    //        //var imageHeight = eventArray[n].image.medium.height;
    //        //var imageWidth = eventArray[n].image.medium.width;
    //        var venueUrl = eventArray[n].venue_url;

    //        console.log(title);
    //        console.log(address);
    //        console.log(city);
    //        console.log(region);
    //        console.log(country);
    //        console.log(startTime);
    //        console.log(description);
    //        console.log(performers);
    //        console.log(venueUrl);
    //        console.log("***********************");
    //    }
    //};
    var bindJsonToHtmlTemplate = function (eventArray) {
    	var template = $.templates("#Template");
    	var htmlOutput = template.render(eventArray);

	    console.log(htmlOutput);
    	$("#SearchResults").html(htmlOutput);
    };
    var searchEvents = function (event) {
        var location = $("#Location").val();
        var queryString = "?" + authenticationString + "&location=" + location;
        var url = baseUrl + queryString;
        var ajaxSettings = {
            url: url,
            success: function (eventJson) {
                //displayHeader(eventJson);
                var eventArray = eventJson.events.event;
                //displayEvents(eventArray);
                bindJsonToHtmlTemplate(eventArray);
            },
            jsonp: "callback",
            dataType: "jsonp"
        };

        console.log(url);
        $.ajax(ajaxSettings);

        //event.preventDefault();
        return false;
    };

    $("#SearchEventsByLocation").click(searchEvents);
	$("PreviousButton").click();
	$("NextButton").click();
});

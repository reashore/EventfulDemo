
$(function () {
	var pageNumber = 1;
	var maxPageNumber;
	var baseUrl = "http://api.eventful.com/json/events/search";
	var authenticationCode = "Mt5gmQJNpc3RLpMj";
	var pageSize = 5;
	var template = $.templates("#EventTemplate");
	var getEventsPage = function (pageNumber)
	{
		var location = $("#Location").val();
		var queryString = "?app_key=" + authenticationCode;
		queryString += "&location=" + location;
		queryString += "&page_size=" + pageSize;
		queryString += "&page_number=" + pageNumber;
		var url = baseUrl + queryString;
		var ajaxSettings = {
			url: url,
			success: function (eventJson) {
				maxPageNumber = eventJson.page_count;
				var eventArray = eventJson.events.event;
				var htmlOutput = template.render(eventArray);
				$("#SearchResults").empty();
				$("#SearchResults").html(htmlOutput);
			},
			jsonp: "callback",
			dataType: "jsonp"
		};

		console.log(url);
		$.ajax(ajaxSettings);
	};
	var getNextPage = function() {
		pageNumber += 1;
		if (pageNumber > maxPageNumber) {
			pageNumber = maxPageNumber;
		}
		getEventsPage(pageNumber);
	};
	var getPreviousPage = function() {
		pageNumber -= 1;
		if (pageNumber < 1) {
			pageNumber = 1;
		}
		getEventsPage(pageNumber);
	};

	$("Location").focus();

	$("#SearchEventsByLocation").click(function (event) {
		getEventsPage(pageNumber);
		event.preventDefault();
	});

	$("#PreviousButtonAtTop").click(function (event) {
		getPreviousPage();
	});

	$("#NextButtonAtTop").click(function (event) {
		getNextPage();
	});

	$("#PreviousButtonAtBottom").click(function (event) {
		getPreviousPage();
	});

	$("#NextButtonAtBottom").click(function (event) {
		getNextPage();
	});
});


$(function () {
	var pageNumber = 1;
	var maxPageNumber;
	var baseUrl = "http://api.eventful.com/json/events/search";
	var authenticationCode = "Mt5gmQJNpc3RLpMj";
	var pageSize = 5;
	var template = $.templates("#EventTemplate");
	// page elements
	var $searchResults = $("#SearchResults");
	var $loadingDiv = $('#LoadingDiv');
	var $location = $("#Location");
	var $previousButtonAtTop = $("#PreviousButtonAtTop");
	var $previousButtonAtBottom = $("#PreviousButtonAtBottom");
	var $nextButtonAtTop = $("#NextButtonAtTop");
	var $nextButtonAtBottom = $("#NextButtonAtBottom");

	var toggleNextPreviousButtonVisibility = function (enable) {
		if (enable) {
			$previousButtonAtTop.show();
			$nextButtonAtTop.show();
			$previousButtonAtBottom.show();
			$nextButtonAtBottom.show();
		} else {
			$previousButtonAtTop.hide();
			$nextButtonAtTop.hide();
			$previousButtonAtBottom.hide();
			$nextButtonAtBottom.hide();
		}
	};

	var getEventsPage = function (pageNumber)
	{
		var location = $location.val();
		var queryString = "?app_key=" + authenticationCode;
		queryString += "&page_size=" + pageSize;
		queryString += "&sort_order='date'";
		queryString += "&sort_direction='ascending'";
		queryString += "&location=" + location;
		queryString += "&page_number=" + pageNumber;
		var url = baseUrl + queryString;
		var ajaxSettings = {
			url: url,
			success: function (eventJson) {
				maxPageNumber = eventJson.page_count;
				var eventArray = eventJson.events.event;
				var htmlOutput = template.render(eventArray);
				$searchResults.empty().html(htmlOutput);
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

	$location.focus();
	$loadingDiv.hide();
	//toggleNextPreviousButtonVisibility(false);

	$(document)
	  .ajaxStart(function () {
			$loading.show();
			toggleNextPreviousButtonVisibility(true);
	  })
	  .ajaxStop(function () {
	  	$loading.hide();
	  });

	$("#SearchEventsByLocation").click(function (event) {
		getEventsPage(pageNumber);
		event.preventDefault();
	});

	$previousButtonAtTop.click(function (event) {
		getPreviousPage();
	});

	$nextButtonAtTop.click(function (event) {
		getNextPage();
	});

	$previousButtonAtBottom.click(function (event) {
		getPreviousPage();
	});

	$nextButtonAtBottom.click(function (event) {
		getNextPage();
	});
});

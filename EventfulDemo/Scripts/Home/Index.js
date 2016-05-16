
$(function () {
	var baseUrl = "http://api.eventful.com/json/events/search";
	var authenticationCode = "Mt5gmQJNpc3RLpMj";
	var pageNumber = 1;
	var maxPageNumber;
	var pageSize = 10;

	// page elements
	var $template = $.templates("#EventTemplate");
	var $searchResults = $("#SearchResults");
	var $loadingDiv = $("#LoadingDiv");
	var $location = $("#Location");
	var $searchEventsByLocation = $("#SearchEvents");
	var $previousButtonAtTop = $("#PreviousButtonAtTop");
	var $previousButtonAtBottom = $("#PreviousButtonAtBottom");
	var $nextButtonAtTop = $("#NextButtonAtTop");
	var $nextButtonAtBottom = $("#NextButtonAtBottom");
	var $pagingInfo = $("#PagingInfo");

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
		var sortOrder = $("#SortOrder:checked").val();
		var sortDirection = $("#SortDirection:checked").val();
		var queryString;

		if ($.trim(location) == "") {
			alert('Location is missing');
			return;
		}

		queryString  = "?app_key=" + authenticationCode;
		queryString += "&page_size=" + pageSize;
		queryString += "&sort_order=" + sortOrder;
		queryString += "&sort_direction=" + sortDirection;
		queryString += "&location=" + location;
		queryString += "&page_number=" + pageNumber;

		var url = baseUrl + queryString;
		var ajaxSettings = {
			url: url,
			jsonp: "callback",
			dataType: "jsonp",
			global: true,
			beforeSend: function() {
				$("#LoadingDiv").show();
			},
			complete: function() {
				$loadingDiv.hide();
				toggleNextPreviousButtonVisibility(true);
				setPagingInfo();
			},
			success: function (eventJson) {
				maxPageNumber = eventJson.page_count;
				var eventArray = eventJson.events.event;
				var htmlOutput = $template.render(eventArray);
				$searchResults.empty().html(htmlOutput);
			}
		};

		console.log(url);
		$.ajax(ajaxSettings);
	};

	var setPagingInfo = function() {
		var pagingInfo = "Page " + pageNumber + " of " + maxPageNumber;
		$pagingInfo.text(pagingInfo);
	}
	
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
	toggleNextPreviousButtonVisibility(false);

	$searchEventsByLocation.click(function (event) {
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

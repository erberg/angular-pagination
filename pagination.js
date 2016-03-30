angular.module('Pagination', []).service('Pagination', function() {

    var searchOffset = 0; 	// Where to start the search.		
    var searchLimit = 10; 	// How many results to display per page.
    var totalResults = -1;
    var totalPages = 0;
    var currentPage = 1;
    var maxPages = 5; 		// Max number pagination buttons to display at the bottom of the page. (Must be set to odd numbers)

return {
    nextPageExists: function() {
        return currentPage < totalPages;
    },
    showPageDetails: function() {
        return totalResults > 0;
    },
    showPageButtons: function() {
        return totalPages > 1;
    },
    showPagination: function() {
        return this.showPageDetails() || this.showPageButtons();
    },
    previousPageExists: function() {
        return currentPage > 1;
    },
    setTotalResults: function(results) {
        totalResults = results;
    },
    setTotalPages: function() {
        totalPages = Math.ceil(totalResults / searchLimit);
    },
    setCurrentPage: function() {
        currentPage = (searchOffset > 0) ? (Math.ceil(searchOffset / searchLimit) + 1) : 1;
    },
    setSearchOffset: function(pageOffset) {
        searchOffset = pageOffset >= 1 ? (pageOffset - 1) * searchLimit : 0;
    },
    getTotalResults: function() {
        return totalResults;
    },
    getTotalPages: function() {
        return totalPages;
    },
    getCurrentPage: function() {
        return currentPage;
    },
    getSearchLimit: function() {
        return searchLimit;
    },
    getSearchOffset: function(page) {
        if (typeof page === 'number') {
            return page >= 1 ? (page - 1) * searchLimit : 0;
        } else {
            return searchOffset; }
    },
    getTabIndex: function(page) {
        return (currentPage === page) ? -1 : 0;
    },

	/**
	 * Uses maxPages to construct an array that represents the pagination buttons at the bottom of the page.
	 * This is later used by the template to create these buttons. As an example: [1,2,3,4,5] will be returned if there are at least 5 pages, 
	 * and the current page is between 1 and 3.
	 * @return {Array} An array that represents the pagination buttons at the bottom of the page.
	 */

    getPaginationArray: function() {
        var pageArray = [];
        var halfMax = (maxPages - 1) / 2;

        if (currentPage <= 3) { 														//if there are less than 4 pages display all pages
            for (var i = 1; i <= Math.min(maxPages, totalPages); i++) {
                pageArray.push(i);
            }
        } else if (currentPage >= 4 && ((currentPage + halfMax) <= totalPages)) { 		//if there are halfMax pages after current page, center the currentPage
            for (var i = (currentPage - halfMax); i < ((currentPage - halfMax) + maxPages); i++) {
                pageArray.push(i);
            }
        } else if (currentPage >= 4 && ((currentPage + halfMax) > totalPages)) { 		//if there are fewer than halfMax pages after current page, then display final 5 pages
            for (var i = (totalPages - maxPages + 1) || 1; i <= totalPages; i++) {
                pageArray.push(i);
            }
        }
        return pageArray;
    },
    searchSuccess: function(totalResults) {
        this.setTotalResults(totalResults);
        this.setTotalPages();
        this.setCurrentPage();
    },
    searchError: function() {}
}
});

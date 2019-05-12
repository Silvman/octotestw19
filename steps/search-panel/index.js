import DefaultSteps from '../default';
import search from '../../pages/search-panel';
import letters from '../../pages/letters';

var assert = require('assert');


class SearchPanelSteps extends DefaultSteps {
    constructor() {
        super(search);

        this.filterPositions = {
            "unread": 0,
            "flag": 1,
            "attachment": 2,
        };

        this.filterNames = {
            "unread": "непрочитанные",
            "flag": "с флагом",
            "attachment": "с вложениями",
        };

        this.searchAreaPositions = {
            "from": 1,
            "to": 2,
            "theme": 3,
        };
    }

    /**
     * Step: click on search field and check if search input has expanded
     */
    clickOnSearchField() {
        this.page.clickOnSearchField();
        assert.ok(this.page.isSearchInputExpanded(), `search input should be expanded`);
    }

    /**
     * Select filter from the expanded list
     *
     * @param filter {String} - filter name
     */
    selectFilter(filter = 'flag') {
        this.page.clickOnSearchInput();

        const pos = this.filterPositions[filter];
        this.page.clickOnFilter(pos);
    }

    /**
     * Click on search input
     */
    clickOnSearchInput() {
        this.page.clickOnSearchInput();
    }

    /**
     * Check if last history record is consistent to last request
     *
     * @param request {String}
     */
    checkIfSearchRequestSaved(request) {
        assert.strictEqual(this.page.getHistoryElementText(0), request);
    }

    /**
     * Fill search input with new request and check if it was filled correctly
     *
     * @param request {String}
     */
    fillSearchInput(request) {
        this.page.fillSearchInput(request);
        assert.strictEqual(this.page.getSearchRequestValue(), request, `actual value must match the requested value`);
    }

    /**
     * Click on search button and check if the user is redirected to search page
     *
     * @param request {String}
     */
    sendSearchRequest(request) {
        this.page.clickOnSearchButton();
        this.page.waitForUrl(`https://octavius.mail.ru/search/?q_query=${encodeURIComponent(request)}`);
    }

    sendSearchRequestByEnter(request) {
        this.page.pressEnter();
        if (request !== undefined) {
            this.page.waitForUrl(`https://octavius.mail.ru/search/?q_query=${encodeURIComponent(request)}`);
        }
    }

    /**
     * Click on cross near the request
     */
    clickOnClearButton() {
        this.page.clickOnClearButton();
    }

    /**
     * Click on left-side button which drops entire request
     */
    clickOnDropButton() {
        this.page.clickOnDropButton();
    }

    /**
     * Select search area from expanded list near the request field
     *
     * @param area {String} - name of the area
     */
    selectSearchArea(area = 'to') {
        this.page.clickOnSearchAreaButton();

        const pos = this.searchAreaPositions[area];
        this.page.clickOnAreaListElement(pos);
    }

    checkAreaRequestText(request) {
        assert.strictEqual(this.page.getAreaRequestText(), request);
    }

    /**
     * Check if last history filter record is consistent to last request
     *
     * @param filter {String} - last filter name
     */
    checkIfSearchRequestFilterSaved(filter = 'flag') {
        const name_filter = this.filterNames[filter];
        assert.strictEqual(this.page.getHistoryElementFilterText(0), name_filter);
    }

    /**
     * Check if expected mail is found
     *
     * @param expected {String} - title of mail
     */
    checkIfExpectedLetterExists(expected) {
        assert.ok(letters.hasLetterBySubject(expected));
    }

    /**
     * Check if there is no unexpected mail found
     *
     * @param expected {String} - title of mail
     */
    checkIfNoUnexpectedLetter(unexpected) {
        assert.ok(letters.hasLetterBySubject(unexpected, true));
    }

    checkFilterListExists() {
        assert.ok(this.page.hasHelpersElements());
    }
}

export default new SearchPanelSteps();
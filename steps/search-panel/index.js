import DefaultSteps from '../default';
import search from '../../pages/search-panel';
import letters from '../../pages/letters';
var assert = require('assert');

class SearchPanelSteps extends DefaultSteps {
    constructor() {
        super(search);
    }

    /**
     * Step: click on search field and check if search input has expanded
     */
    clickOnSearchField() {
        this.page.clickOnSearchField();
        assert.strictEqual(this.page.isSearchInputExpanded(), true, `search input should be expanded`);
    }

    /**
     * Select filter from the expanded list
     *
     * @param filter {String} - filter name
     */
    selectFilter(filter = 'flag') {
        this.page.clickOnSearchInput();
        let n = 0;
        switch (filter) {
            case 'unread': {
                n = 0;
                break;
            }

            case 'flag': {
                n = 1;
                break;
            }

            case 'attachment': {
                n = 2;
                break;
            }

            default: {
                n = 1;
            }
        }

        this.page.clickOnFilter(n);
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
        this.page.waitForUrl(`https://octavius.mail.ru/search/?q_query=${encodeURIComponent(request)}`)
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
        let n = 0;
        switch (area) {
            case 'from': {
                n = 1;
                break;
            }

            case 'to': {
                n = 2;
                break;
            }

            case 'theme': {
                n = 3;
                break;
            }

            default: {
                n = 4;
            }
        }

        this.page.clickOnAreaListElement(n);
    }

    /**
     * Check if last history filter record is consistent to last request
     *
     * @param filter {String} - last filter name
     */
    checkIfSearchRequestFilterSaved(filter = 'flag') {
        let name_filter = '';
        switch (filter) {
            case 'unread': {
                name_filter = 'непрочитанные';
                break;
            }

            case 'flag': {
                name_filter = 'с флагом';
                break;
            }

            case 'attachment': {
                name_filter = 'с вложениями';
                break;
            }
        }

        assert.strictEqual(this.page.getHistoryElementFilterText(0), name_filter);
    }

    /**
     * Check if expected mail is found
     *
     * @param expected {String} - title of mail
     */
    checkIfExpectedLetterExists(expected) {
        assert.strictEqual(letters.hasLetterBySubject(expected), true);
    }

    /**
     * Check if there is no unexpected mail found
     *
     * @param expected {String} - title of mail
     */
    checkIfNoUnexpectedLetter(unexpected) {
        assert.strictEqual(letters.hasLetterBySubject(unexpected, true), true);
    }
}

export default new SearchPanelSteps();
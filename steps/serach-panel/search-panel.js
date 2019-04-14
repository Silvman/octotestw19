import DefaultSteps from '../default';
import search from '../../pages/search-panel/search-panel';
import letters from '../../pages/letters';
var assert = require('assert');

class SearchPanelSteps extends DefaultSteps {
    constructor() {
        super(search);
    }

    clickOnSearchField() {
        this.page.clickOnSearchField();
        assert.strictEqual(this.page.isSearchInputExpanded(), true, `search input should be expanded`);
    }

    fillSearchInput(request) {
        this.page.fillSearchInput(request);
        assert.strictEqual(this.page.getSearchRequestValue(), request, `actual value must match the requested value`);
    }

    sendSearchRequest(request) {
        this.page.sendSearchRequest();
        this.page.waitForUrl(`https://octavius.mail.ru/search/?q_query=${encodeURIComponent(request)}`)
    }

    checkIfExpectedLetterExists(expected) {
        assert.strictEqual(letters.hasLetterBySubject(expected), true);
    }

    checkIfNoUnexpectedLetter(unexpected) {
        assert.strictEqual(letters.hasLetterBySubject(unexpected, true), true);
    }
}

export default new SearchPanelSteps();
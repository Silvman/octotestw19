import DefaultSteps from '../default';
import page from '../../pages/search-panel/search-panel';

class SearchPanelSteps extends DefaultSteps {
    constructor() {
        super(page);
    }

    clickOnSearchField() {
        this.page.clickOnSearchField();
    }

    fillSearchInput(request) {
        this.page.fillSearchInput(request);
    }

    sendSearchRequest(request) {
        this.page.sendSearchRequest();
        this.page.waitForUrl(`https://octavius.mail.ru/search/?q_query=${request}`)
    }
}

export default new SearchPanelSteps();
import DefaultPage from '../default';

class SearchPanelPage extends DefaultPage {
    constructor() {
        super('letters')
    }

    get locators() {
        const container = `[data-qa-id="search-panel"]`;
        const container_active = `[data-qa-id="search-panel:active"]`;
        const search_panel_button = container + " .search-panel-button";
        const search_input_container = container_active + ` [data-test-id="search-input-container"]`;
        const search_input = search_input_container + ` input`;
        const search_button = `[data-test-id="search-button"]`;

        return {
            container,
            container_active,
            search_panel_button,
            search_input_container,
            search_input,
            search_button,
        }
    }

    clickOnSearchField() {
        const locator = this.locators.search_panel_button;
        this.page.waitForVisible(locator);
        this.page.click(locator);
    }

    fillSearchInput(request) {
        const locator = this.locators.search_input;
        this.page.setValue(locator, request);
    }

    sendSearchRequest() {
        const locator = this.locators.search_button;
        this.page.click(locator);
    }

}

export default new SearchPanelPage();

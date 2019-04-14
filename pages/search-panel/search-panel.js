import DefaultPage from '../default';

class SearchPanelPage extends DefaultPage {
    constructor() {
        super('letters')
    }

    get locators() {
        const container = `.search-panel`;                                          // блок с поиском
        const container_column = `${container} .search-panel__column`;  // поле поиска
        const container_column_active = `${container} .search-panel__column_active`;       // "развернутое" поле посика
        const search_panel_button = `${container} .search-panel-button`;            // "кнопка", разворачивающая поле поиска
        const search_input_container = `${container_column_active} .search-panel__layer`;  // блок с полем и кнопкой посика
        const search_input = `${search_input_container} input`;                     // поле поискового запроса
        const search_button = `${search_input_container} div span:nth-child(3)`;    // кнопка "Найти"

        return {
            container,
            container_column_active,
            container_column,
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

    isSearchInputExpanded() {
        return super.hasClass(this.locators.container_column, `search-panel__column_active`);
    }

    fillSearchInput(request) {
        const locator = this.locators.search_input;
        this.page.waitForVisible(locator);
        this.page.setValue(locator, request);
    }

    getSearchRequestValue() {
        return browser.getValue(this.locators.search_input);
    }

    sendSearchRequest() {
        const locator = this.locators.search_button;
        this.page.waitForVisible(locator);
        this.page.click(locator);
    }

}

export default new SearchPanelPage();

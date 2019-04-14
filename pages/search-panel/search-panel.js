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
        const search_area_button = `//*[contains(@class, "search-panel__layer")]//span[following-sibling::span]/div`; // блок "раздела" поиска: "От", "Кому" итд...
        const search_area_list = `//body/div[following-sibling::div[@class="contextmenu"]][last()]/div/span`; // список "раздела" поиска: "От", "Кому" итд... (в нем spanы с названиями разделов с эвенами [0] от [1] кому [2] тема)
        const clear_button = `//*[contains(@class, "search-panel__layer")]//span[preceding-sibling::span[last()]/div][preceding-sibling::span[last()-1]]`; // крестик!

        return {
            container,
            container_column_active,
            container_column,
            search_panel_button,
            search_input_container,
            search_input,
            search_button,
            search_area_button,
            search_area_list,
            search_area_list_elem: (i) => {
                return `${search_area_list}/span[${i}]`;
            },
            clear_button,
        }
    }

    clickOnSearchField() {
        const locator = this.locators.search_panel_button;
        this.page.waitForVisible(locator);
        this.page.click(locator);
    }

    clickOnClearButton() {
        const locator = this.locators.clear_button;
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

    clickOnSearchAreaButton() {
        const locator = this.locators.search_area_button;
        this.page.waitForVisible(locator);
        this.page.click(locator);
    }

    clickOnAreaListElement(i) {
        const locator = this.locators.search_area_list;
        this.page.waitForVisible(locator);
        this.page.click(this.locators.search_area_list_elem(i));
    }


}

export default new SearchPanelPage();

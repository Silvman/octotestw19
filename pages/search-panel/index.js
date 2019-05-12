import DefaultPage from '../default';

class SearchPanelPage extends DefaultPage {
    constructor() {
        super('search-panel')
    }

    get locators() {
        // блок с поиском
        const container = `.search-panel`;

        // поле поиска
        const container_column = `${container} .search-panel__column`;

        // "развернутое" поле посика
        const container_column_active = `${container} .search-panel__column_active`;

        // "кнопка", разворачивающая поле поиска
        const search_panel_button = `${container} .search-panel-button`;

        // блок с полем и кнопкой посика
        const search_input_container = `${container_column_active} .search-panel__layer`;

        // поле поискового запроса
        const search_input = `${search_input_container} input`;

        // кнопка "Найти"
        const search_button = `${search_input_container} div span:nth-child(3)`;

        // блок "раздела" поиска: "От", "Кому" итд...
        const search_area_button = `//*[contains(@class, "search-panel__layer")]//span[following-sibling::span]/div`;

        // блок "раздела" поиска: текст запроса в сером прямоугольнике
        const search_area_request_text = `//*[contains(@class, "search-panel__layer")]//span[following-sibling::span]/span/span/span[2]`;

        // список "раздела" поиска: "От", "Кому" итд... (в нем spanы с названиями разделов с эвенами [0] от [1] кому [2] тема)
        const search_area_list = `//*[@class="tooltip"]/following-sibling::div[1]/div/span`;

        // крестик!
        const clear_button = `//*[contains(@class, "search-panel__layer")]//span[preceding-sibling::span[last()]/div][preceding-sibling::span[last()-1]]`;

        // элементы выпадающего списка
        const helper_elements = `//*[contains(@class, "r-list-item")]`;

        // "Сбросить поиск"
        const drop_search_button = `//*[contains(@class, "search-panel__left-col")]//*[contains(@class, " button2")]`;

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
            search_area_request_text,
            clear_button,
            drop_search_button,
            helper_elements,
            search_area_list_elem: (i) => {
                return `${search_area_list}/span[${i}]`;
            },

            helper_elem: (i) => {
                return `${helper_elements}[@data-navigation-index="${i}"]`;
            },

            history_elem_filter: (i) => {
                return `${helper_elements}[@data-navigation-index="${i}"]/span/span[2]`;
            },
        }
    }

    /**
     * Click on filter on given position in list
     *
     * @param i {number} filter position
     */
    clickOnFilter(i) {
        const locator = this.locators.helper_elem(i);
        this.page.waitForVisible(locator);
        this.page.click(locator);
    }

    /**
     * Click on inactive search field to expand it
     */
    clickOnSearchField() {
        const locator = this.locators.search_panel_button;
        this.page.waitForVisible(locator, 2000);
        this.page.click(locator);
    }

    /**
     * Click on cross near the request to drop it
     */
    clickOnClearButton() {
        const locator = this.locators.clear_button;
        this.page.waitForVisible(locator);
        this.page.click(locator);
    }

    /**
     * Click on left-side button to drop all search request
     */
    clickOnDropButton() {
        const locator = this.locators.drop_search_button;
        this.page.waitForVisible(locator);
        this.page.click(locator);
    }

    /**
     * Click on search main input
     * Open filter, history list
     */
    clickOnSearchInput() {
        const locator = this.locators.search_input;
        this.page.waitForVisible(locator);
        this.page.click(locator);
    }

    /**
     * Click on expanded list button near the request to expand it
     */
    clickOnSearchAreaButton() {
        const locator = this.locators.search_area_button;
        this.page.waitForVisible(locator);
        this.page.click(locator);
    }

    /**
     * Click on expanded list element to apply different search area
     *
     * @param i {number} area position in list
     */
    clickOnAreaListElement(i) {
        const locator = this.locators.search_area_list;
        this.page.waitForVisible(locator);
        this.page.click(this.locators.search_area_list_elem(i));
    }


    getAreaRequestText() {
        const locator = this.locators.search_area_request_text;
        this.page.waitForVisible(locator);
        return this.page.getText(locator);
    }


    pressEnter() {
        browser.keys('\uE007'); // Enter
    }

    /**
     * Get text from history element by given position
     *
     * @param i {number} - position of history element
     * @returns {String} - text of history element
     */
    getHistoryElementText(i) {
        const locator = this.locators.helper_elem(i);
        this.page.waitForVisible(locator);
        return this.page.getText(locator);
    }

    /**
     * Get text from history element's text part by given position
     *
     * @param i {number} - position of history element
     * @returns {String} - text of history filter
     */
    getHistoryElementFilterText(i) {
        const locator = this.locators.history_elem_filter(i);
        this.page.waitForVisible(locator);
        return this.page.getText(locator);
    }

    /**
     * Get entered request
     *
     * @returns {String} - entered request
     */
    getSearchRequestValue() {
        return browser.getValue(this.locators.search_input);
    }

    /**
     * Returns true if search input is active and expanded
     *
     * @returns {boolean}
     */
    isSearchInputExpanded() {
        return super.hasClass(this.locators.container_column, `search-panel__column_active`);
    }

    /**
     * Enter the search request
     *
     * @param request {String}
     */
    fillSearchInput(request) {
        const locator = this.locators.search_input;
        this.page.waitForVisible(locator);
        this.page.setValue(locator, request);
    }

    /**
     * Click on search button to send search request
     */
    clickOnSearchButton() {
        const locator = this.locators.search_button;
        this.page.waitForVisible(locator);
        this.page.click(locator);
    }

    hasHelpersElements() {
        const locator = this.locators.helper_elements;
        try {
            this.page.waitForVisible(locator);
            return  true;
        } catch (err) {
            return false;
        }
    }
}

export default new SearchPanelPage();

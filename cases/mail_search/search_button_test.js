import main from '../../steps/main';
import layout from '../../steps/layout'
import search from '../../steps/serach-panel/search-panel';
var assert = require('assert');

const user = process.env.LOGIN;
const password = process.env.PASSWORD;

describe('test search button', () => {
    before(() => {
        main.open('https://mail.ru');
        main.login(user, password);
        layout.setPaneAndSize(3);
    });

    after(() => {
        main.logout();
    });

    it('Авторизоваться, ввести запрос, нажать на кнопку поиска и перейти на страницу поиска по запросу', () => {
        search.clickOnSearchField();
        let request = "hello";

        search.fillSearchInput(request);
        search.sendSearchRequest(request);

        assert.equal(browser.getTitle(), 'Поиск - Почта Mail.ru');
    });
});

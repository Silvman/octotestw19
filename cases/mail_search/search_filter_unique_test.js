import main from '../../steps/main';
import layout from '../../steps/layout'
import search from '../../steps/search-panel';

const user = process.env.LOGIN;
const password = process.env.PASSWORD;

const testInputValue = 'lol';

describe('test search button', () => {
    before('Авторизоваться, ввести запрос, нажать на кнопку поиска и перейти на страницу поиска по запросу', () => {
        main.open('https://mail.ru');
        main.login(user, password);
        layout.setPaneAndSize(3);
    });

    beforeEach(() => {
        search.clickOnSearchField();
    });

    it('тест уникальных фильтров', () => {
        search.selectFilter('orders');
        search.checkIfFilterDisplay();
        search.selectSecondFilter('finance');
        search.checkIfFilterReplace();
    });

    afterEach(() => {
        search.clickOnDropButton();
    });

    after(() => {
        main.logout();
    });
});
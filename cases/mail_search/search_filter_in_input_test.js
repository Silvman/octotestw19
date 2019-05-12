import main from '../../steps/main';
import layout from '../../steps/layout'
import search from '../../steps/search-panel';

const user = process.env.LOGIN;
const password = process.env.PASSWORD;

const testInputValue = 'lol';

describe('test filters in input', () => {
    before('Авторизоваться, ввести запрос, нажать на кнопку поиска и перейти на страницу поиска по запросу', () => {
        main.open('https://mail.ru');
        main.login(user, password);
        layout.setPaneAndSize(3);
    });

    beforeEach(() => {
        search.clickOnSearchField();
        search.fillSearchInput(testInputValue);
        search.sendSearchRequest(testInputValue);
    });

    it('с флагом', () => {
        search.selectFilter('flag');
        search.checkIfFilterDisplay();
    });

    afterEach(() => {
        search.clickOnDropButton();
    });

    after(() => {
        main.logout();
    });
});
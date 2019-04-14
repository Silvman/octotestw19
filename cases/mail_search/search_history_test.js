import main from '../../steps/main';
import layout from '../../steps/layout'
import search from '../../steps/search-panel';

const user = process.env.LOGIN;
const password = process.env.PASSWORD;

const testInputValue = 'TEST SEARCH HISTORY';

describe('test search button', () => {
    before('Авторизоваться, ввести запрос, нажать на кнопку поиска и перейти на страницу поиска по запросу', () => {
        main.open('https://mail.ru');
        main.login(user, password);
        layout.setPaneAndSize(3);
    });

    it('Проверка, что открыта странциа поиска: позитивный кейс (присутствует письмо, которое должно найтись по запросу)', () => {
        search.clickOnSearchField();
        search.fillSearchInput(testInputValue);
        search.sendSearchRequest(testInputValue);
        search.clickOnClearButton();
        search.clickOnSearchInput();
        search.checkIfSearchRequestSaved(testInputValue);
    });

    after(() => {
        main.logout();
    });
});

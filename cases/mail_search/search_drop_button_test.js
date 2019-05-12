import main from '../../steps/main';
import layout from '../../steps/layout'
import search from '../../steps/search-panel';

const user = process.env.LOGIN;
const password = process.env.PASSWORD;

const testInputValueNotExists = 'ThereIsNoMailOnThatRequest';
const testInputValueExists = 'Search Button Test Positive';

describe('test drop search button', () => {
    before('Авторизоваться, ввести запрос, нажать на кнопку поиска и перейти на страницу поиска по запросу', () => {
        main.open('https://mail.ru');
        main.login(user, password);
        layout.setPaneAndSize(3);

        search.clickOnSearchField();

        search.fillSearchInput(testInputValueNotExists);
        search.sendSearchRequest(testInputValueNotExists);
    });

    it('Пробуем отменить поиск и проверяем, сработало ли', () => {
        search.clickOnDropButton();
        search.checkIfExpectedLetterExists(testInputValueExists);
    });

    after(() => {
        main.logout();
    });
});

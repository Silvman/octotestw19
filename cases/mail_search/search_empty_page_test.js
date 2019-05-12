import main from '../../steps/main';
import layout from '../../steps/layout'
import search from '../../steps/search-panel';

const user = process.env.LOGIN;
const password = process.env.PASSWORD;

const testInputValueNotExists = 'ThereIsNoMailOnThatRequest';

describe('test empty page on request', () => {
    before('Авторизоваться, ввести запрос, нажать на кнопку поиска и перейти на страницу поиска по запросу', () => {
        main.open('https://mail.ru');
        main.login(user, password);
        layout.setPaneAndSize(3);

        search.clickOnSearchField();

        search.fillSearchInput(testInputValueNotExists);
        search.sendSearchRequest(testInputValueNotExists);
    });

    it('Смотрим, есть ли объекты, обозначающие отсутствие результатов', () => {
        search.checkIfEmptyPageBlocksExists();
    });

    after(() => {
        main.logout();
    });
});

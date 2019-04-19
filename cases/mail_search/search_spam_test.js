import main from '../../steps/main';
import layout from '../../steps/layout'
import search from '../../steps/search-panel';

const user = process.env.LOGIN;
const password = process.env.PASSWORD;

const testInputValue = 'Spam Mail Test';

describe('test spam mail', () => {
    before('Авторизоваться, ввести запрос, нажать на кнопку поиска и перейти на страницу поиска по запросу', () => {
        main.open('https://mail.ru');
        main.login(user, password);
        layout.setPaneAndSize(3);

        search.clickOnSearchField();
        search.fillSearchInput(testInputValue);
        search.sendSearchRequestByEnter();
    });

    it('Проверка, письмо из спама не должно быть найдено', () => {
        search.checkIfNoUnexpectedLetter(testInputValue);
    });

    after(() => {
        main.logout();
    });
});

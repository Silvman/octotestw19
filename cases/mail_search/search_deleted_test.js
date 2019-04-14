import main from '../../steps/main';
import layout from '../../steps/layout'
import search from '../../steps/serach-panel/index';

const user = process.env.LOGIN;
const password = process.env.PASSWORD;

const testInputValue = 'Deleted Mail Test';

describe('test search button', () => {
    before('Авторизоваться, ввести запрос, нажать на кнопку поиска и перейти на страницу поиска по запросу', () => {
        main.open('https://mail.ru');
        main.login(user, password);
        layout.setPaneAndSize(3);

        search.clickOnSearchField();
        search.fillSearchInput(testInputValue);
        search.sendSearchRequest(testInputValue);
    });

    it('Проверка, удаленное письмо не найдено', () => {
        search.checkIfNoUnexpectedLetter(testInputValue);
    });

    after(() => {
        main.logout();
    });
});

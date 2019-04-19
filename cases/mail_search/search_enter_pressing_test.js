import main from '../../steps/main';
import layout from '../../steps/layout'
import search from '../../steps/search-panel';

const user = process.env.LOGIN;
const password = process.env.PASSWORD;

const testInputValue = 'Press Enter Test Positive';
const wrongInputValue = 'Negative Test';

describe('test pressing enter to search', () => {
    before('Авторизоваться, ввести запрос, нажать на кнопку поиска и перейти на страницу поиска по запросу', () => {
        main.open('https://mail.ru');
        main.login(user, password);
        layout.setPaneAndSize(3);

        search.clickOnSearchField();
        search.fillSearchInput(testInputValue);
        search.sendSearchRequestByEnter(testInputValue);
    });

    it('Проверка, что открыта странциа поиска: позитивный кейс (присутствует письмо, которое должно найтись по запросу)', () => {
        search.checkIfExpectedLetterExists(testInputValue);
    });

    it('Проверка, что открыта страница поиска: негативный кейс (нет письма, которого не должно найтись по запросу)', () => {
        search.checkIfNoUnexpectedLetter(wrongInputValue);
    });

    after(() => {
        main.logout();
    });
});

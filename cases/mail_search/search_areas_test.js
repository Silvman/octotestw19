import main from '../../steps/main';
import layout from '../../steps/layout'
import search from '../../steps/search-panel';

const user = process.env.LOGIN;
const password = process.env.PASSWORD;

const testInputUsername = 'anoscillator@gmail.com';

const testInputValue = 'Search Button Test Positive';
const testTitleTo = 'Test Search To';

describe('test search button', () => {
    before(() => {
        main.open('https://mail.ru');
        main.login(user, password);
        layout.setPaneAndSize(3);
        search.clickOnSearchField();
    });


    it('Выбрать поле "От", проверить наличие нужного письма', () => {
        search.fillSearchInput(testInputUsername);
        search.sendSearchRequest(testInputUsername);
        search.selectSearchArea('to');
        search.checkIfExpectedLetterExists(testTitleTo);
    });

    it('Кому', () => {
        search.fillSearchInput(user);
        search.sendSearchRequest(user);
        search.selectSearchArea('from');
        search.checkIfExpectedLetterExists(testTitleTo);
    });

    it('Тема', () => {
        search.fillSearchInput(testInputValue);
        search.sendSearchRequest(testInputValue);
        search.selectSearchArea('theme');
        search.checkIfExpectedLetterExists(testInputValue);
    });

    afterEach(() => {
        search.clickOnClearButton();
    });

    after(() => {
        main.logout();
    });
});

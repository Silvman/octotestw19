import main from '../../steps/main';
import layout from '../../steps/layout'
import search from '../../steps/search-panel';

const user = process.env.LOGIN;
const password = process.env.PASSWORD;

const request = "some request";

describe('test search field input', () => {
    before(() => {
        main.open('https://mail.ru');
        main.login(user, password);
        layout.setPaneAndSize(3);
        search.clickOnSearchField();
    });


    it('Ввести запрос в поле ввода, убедится, что он там появляется', () => {
        search.fillSearchInput(request);
        search.sendSearchRequest(request);
        search.checkAreaRequestText(request);
    });

    after(() => {
        main.logout();
    });
});

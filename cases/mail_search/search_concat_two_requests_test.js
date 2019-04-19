import main from '../../steps/main';
import layout from '../../steps/layout'
import search from '../../steps/search-panel';

const user = process.env.LOGIN;
const password = process.env.PASSWORD;

const firstRequest = 'first';
const secondRequest = 'second';
const thirdRequest = 'third';

describe('test concat two requests', () => {
    before(() => {
        main.open('https://mail.ru');
        main.login(user, password);
        layout.setPaneAndSize(3);

        search.clickOnSearchField();
        search.fillSearchInput(firstRequest);
        search.sendSearchRequestByEnter();
    });

    it('При существующем первом запросе вводим второй, он должен добавиться к первому', () => {
        search.fillSearchInput(secondRequest);
        search.sendSearchRequestByEnter();

        search.fillSearchInput("");
        search.checkAreaRequestText(firstRequest + ' ' + secondRequest);
    });

    after(() => {
        main.logout();
    });
});

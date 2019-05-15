import main from '../../steps/main';
import layout from '../../steps/layout'
import search from '../../steps/search-panel';

const user = process.env.LOGIN;
const password = process.env.PASSWORD;

const request = '<script>alert("xss");</script>';
const filtered_request = '&lt;script&gt;alert("xss");&lt;/script&gt;';

describe('test xss', () => {
    before(() => {
        main.open('https://mail.ru');
        main.login(user, password);
        layout.setPaneAndSize(3);
        search.clickOnSearchField();
    });


    it('Ввести запрос с инъекцией в поле ввода и проверить что он был отфильтрован', () => {
        search.fillSearchInput(request);
        search.sendSearchRequest(request);
        search.checkIfRequestFiltred(filtered_request);
    });

    after(() => {
        main.logout();
    });
});

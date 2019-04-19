import main from '../../steps/main';
import layout from '../../steps/layout'
import search from '../../steps/search-panel';

const user = process.env.LOGIN;
const password = process.env.PASSWORD;


describe('test filter board', () => {
    before(() => {
        main.open('https://mail.ru');
        main.login(user, password);
        layout.setPaneAndSize(3);
        search.clickOnSearchField();
    });


    it('Выбрать поле ввода поиска, проверить, что всплывающее поле с фильтрами появляется', () => {
        search.checkFilterListExists();
    });

    after(() => {
        main.logout();
    });
});

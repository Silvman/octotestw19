import DefaultSteps from './default';
import page from '../pages/main';

class MainPageSteps extends DefaultSteps {
	constructor() {
		super(page);
	}

	login(username, password) {
		this.page.fillLoginForm(username, password);
		this.page.submit();
		this.page.waitForUrl(`https://e.mail.ru/messages/inbox/?back=1`, 20000);
		this.redirectToOctavius();
	}
}

export default new MainPageSteps();

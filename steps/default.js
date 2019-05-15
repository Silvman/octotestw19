export default class DefaultSteps {
	constructor(page) {
		this.page = page;
		this.pane = 3;
	}

	open(path) {
		browser.url(path);
	}

	logout() {
		this.page.logout();
		this.page.waitForUrl('https://e.mail.ru/login?page=https%3A%2F%2Foctavius.mail.ru%2Finbox&allow_external=1&from=octavius');
	}

	redirectToOctavius() {
		this.open('https://octavius.mail.ru');
	}
}

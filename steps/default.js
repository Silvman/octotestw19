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
		this.page.waitForUrl('https://account.mail.ru/login?success_redirect=https://octavius.mail.ru&allow_external=1');
	}

	redirectToQa() {
		this.open('/bundles/page.qa.html');
	}
}

import DefaultPage from '../default';

class LettersPage extends DefaultPage {
	constructor() {
		super('letters')
	}
	get locators () {
		return {
			letterBySubject: (subject) => {
				return `//a[div/a/div/div/div[@title="${subject}"]]/div[2]/a`;
			},

			letterTitleBlockBySubject: (subject) => {
				return `//div[@title="${subject}"]`;
			}
		}
	}

	/**
	 * Проверяет есть ли письмо с темой
	 *
	 * @param {string} subject
	 * @param {boolean} reverse
	 * @returns {boolean}
	 */
	hasLetterBySubject (subject, reverse = false) {
		try {
			this.page.waitForVisible(this.locators.letterTitleBlockBySubject(subject), null, reverse);
			return true;
		} catch (err) {
			return false;
		}
	}

	/**
	 * Открыть письмо по теме
	 * @param  {string} subject
	 */
	openBySubject (subject) {
		this.page.click(this.locators.letterBySubject(subject));
	}

}

export default new LettersPage();

export class UserInfo {
    constructor({nameSelector, jobSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
    }

    //получаем инфу о юзере
    getUserInfo() {
        return {
        name: this._nameElement.textContent,
        job: this._jobElement.textContent
        }
    }

    //записываем инфу о юзере
    setUserInfo(newName, newJob) {
        this._nameElement.textContent = newName;
        this._jobElement.textContent = newJob;
    }
}
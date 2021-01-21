export class UserInfo {
    constructor({nameSelector, jobSelector}, avatarSelector) {
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    //получаем инфу о юзере
    getUserInfo() {
        const name = this._nameElement.textContent;
        const about = this._jobElement.textContent;
        return {name, about};
    }

    //записываем инфу о юзере
    setUserInfo(newName, newJob) {
        this._nameElement.textContent = newName;
        this._jobElement.textContent = newJob;
    }

    //установка аватарки
    setUserAvatar(newAvatar) {
        this._avatar.style.backgroundImage = `url('${newAvatar}')`;
    }

    //user id
    getUserId() {
        return this._userId;
    }

    setUserId(id) {
        this._userId = id;
    }
}
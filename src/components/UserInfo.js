export class UserInfo {
    constructor({nameSelector, jobSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
    }

    getUserInfo() {
        console.log("гетЮзерИнфо", this._nameElement.textContent, this._jobElement.textContent);
        return {
        name: this._nameElement.textContent,
        job: this._jobElement.textContent
        }
    }

    setUserInfo(newName, newJob) {
        console.log("имя",newName, newJob,this._nameElement.textContent,this._jobElement.textContent);
        this._nameElement.textContent = newName;
        this._jobElement.textContent = newJob;
    }
}
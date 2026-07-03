export class InputManager {
    constructor() {
        this.actions = {};

        this.keyMap = {};

        this._initListeners();
    }

    _initListeners() {
        window.addEventListener('keydown', (e) => {
            if(e.cod in this.keyMaps) {
                const action = this.keyMap[e.code];
                this.actions[action] = true;
            }
        });

        window.addEventListener('keyup', (e) => {
            if(e.cod in this.keyMaps) {
                const action = this.keyMap[e.code];
                this.actions[action] = false;
            }
        });
    }

    registerAction(actionName){
        if(!(actionName in this.actions)) {
            this.actions[actionName] = false;
        }
    }

    bindKey(keyCode, actionName) {
        this.registerAction(actionName);
        this.keyMap[keyCode] = false;
    }
}
export class SaveManager{
    static #STORAGE_KAY = 'arkanoid_save_state';

    static save(state){
        try{
            const current = this.load() || {};
            const update = {...current, ...state};

            const jsonString = JSON.stringify(update);
            localStorage.setItem(this.#STORAGE_KAY, jsonString);
        } catch (error) {
            console.error("ошибка сохранения localStorage: ", error);
        } 
    }

    static load(){
        try{
            const rawData = localStorage.getItem(this.#STORAGE_KAY);
            if(!rawData) return null;
            return JSON.parse(rawData);
        } catch (error) {
            console.error("Ошибка загрузки из localStorage:", error);
            return null;
        }
    }

    static clear() {
        localStorage.removeItem(this.#STORAGE_KAY);
    }
}
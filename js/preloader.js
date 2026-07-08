export class Preloader {
    static _loadAudio(howlInstance, key){
        return new Promise((resolve, reject) => {
            if(howlInstance.state() == 'loaded'){
                resolve();
                return;
            }
            howlInstance.once('load', () => resolve());
            howlInstance.once('loaderror', (_, error) => reject(new Error(`Ошибка загрузки звука "${key}": ${error}`)));
        });
    }

    static async loadAudio(audioManager) {
        audioManager.loadManifest();

        const audioPromises = Object.entries(audioManager.sounds).map(([key, howl]) => 
            this._loadAudio(howl, key)
        );

        await Promise.all([...audioPromises]);

        console.log('[Preloader]: Все ассеты успешно загружены в память! Игра готова.');
    }
}
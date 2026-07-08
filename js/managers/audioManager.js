
import { AudioManifest } from "../../assets/audioManifest.js";

export class AudioManager {
    static #instance = null;

    constructor(baseVolume = 0.1){
        if(AudioManager.#instance){
            return AudioManager.#instance;
        }

        this.sounds = {};
        this.baseVolume = baseVolume;

        AudioManager.#instance = this;

        const unlock = () => {
            window.removeEventListener('click', unlock);
            window.removeEventListener('keydown', unlock);
        };
        window.addEventListener('click', unlock);
        window.addEventListener('keydown', unlock);
    }
    
    #asset(relativePath) { 
        return new URL(`../../assets/${relativePath}`, import.meta.url).href;
    }

    loadManifest(){
        try{
            Object.values(AudioManifest).forEach(sound => {
                if(sound.key && sound.url){
                    const resolvedUrl = this.#asset(sound.url);
                    
                    this.addAudio(sound.key, resolvedUrl, sound.loop ?? false, sound.volume ?? null);
                }
            });
            console.log(`[AudioManager]: Успешно загружено звуков: ${Object.keys(AudioManifest).length}`);
        } catch (error) {
            console.error("[AudioManager]: Ошибка при разборе аудио-манифеста:", error);
        }
    }

    addAudio(key, url, loop = false, volume = null){
        this.sounds[key] = new Howl({
            src:[url],
            loop: loop,
            volume: volume ?? this.baseVolume
        });
    }
    
    playSound(key, volumeSound = this.baseVolume){
        if(this.sounds[key]){
            this.changeVolume(key, volumeSound)
            this.sounds[key].play();
        } else {
            console.warn(`[AudioManager]: Попытка воспроизвести незагруженный звук по ключу: "${key}"`);
        }
    }

    playSoundOnce(key, volumeSound = this.baseVolume){
        this.stopSound(key);
        this.playSound(key, volumeSound);
    }

    stopSound(key){
        if (this.sounds[key]) this.sounds[key].stop();
    }

    changeVolume(key, volume){
        if (!this.sounds[key]) return;

        if(volume <= 0) volume = 0;
        if(volume >= 1) volume = 1;

        this.sounds[key].volume(volume);
    }
}

export const audioManager = new AudioManager();
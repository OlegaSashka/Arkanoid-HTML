
export class AudioManager {
    constructor(baseVolume = 0.1){
        this.sounds = {};
        this.baseVolume = baseVolume;
    }

    addAudio(key, url, loop = false, volume = null){
        this.sounds[key] = new Howl({
            src:[url],
            loop: loop,
            volume: volume ?? this.baseVolume
        })
    }
    
    playSound(key){
        this.sounds[key].play();
    }

    stopSound(key){
        this.sounds[key].stop();
    }

    changeVolume(key, volume){
        if(volume <= 0) volume = 0;
        if(volume >= 1) volume = 1;

        this.sounds[key].volume(volume);
    }
}

export const audioManager = new AudioManager();
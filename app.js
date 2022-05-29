const status = document.getElementById('status');
const mehter = document.getElementById('mehter');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const PLAY_TRANSCRIPT = 'ver mehteri';
const STOP_TRANSCRIPT = 'al mehteri';
const MEHTER_TEXT = 'Ver mehteri ver düşmanların alayına gider mehter! Almanyaya ver mehteri ver. Çıldırırlar bunlar mehterden özellikle bu kısmından çıldırırlar bu siyonistler.';
const STOP_MEHTER_TEXT = 'Aldim mehteri';
const ON_START_TEXT = 'Lutfen mehteri verin';

if(!SpeechRecognition) {
    alert('Speech recognition is not supported on your browser');
    status.innerText = 'speech recognition not supported'
}

const recognition = new SpeechRecognition();

recognition.lang = 'tr-TR';
recognition.continuous = true;
recognition.interimResults = true;

recognition.start();

recognition.onstart = () => {
    status.innerText = ON_START_TEXT;
}

recognition.onresult = (event) => {
    const transcript = event.results[event.resultIndex][0].transcript;
    
    if(transcript.includes(PLAY_TRANSCRIPT)) {
        mehter.play();
        status.innerText = MEHTER_TEXT;
    }
    
    if(transcript.includes(STOP_TRANSCRIPT)) {
        mehter.pause();
        mehter.currentTime = 0;
        status.innerText = STOP_MEHTER_TEXT;
    }

}

recognition.onaudioend = () => {
    status.innerText = ON_START_TEXT;
}
const status = document.getElementById('status');
const mehter = document.getElementById('mehter');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const PLAY_TRANSCRIPT = 'ver mehteri';
const STOP_TRANSCRIPT = 'al mehteri';
const MEHTER_TEXT = "Hiçbir şey değişmesin düzen aynen devam etsin böylece altta kalanın canı çıksın biz hep üstte olmaya devam edelim diyen phpcilere, Türkiye Cumhuriyeti'ne JavaScript ile ne işimiz var diyen içimizdeki batı putperestlerine verdim mehteri.";
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

document.body.addEventListener('click', () => {
    status.innerText = ON_START_TEXT;
    recognition.start();
}, {once: true});
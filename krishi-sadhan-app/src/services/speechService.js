// ==========================================
// Speech Recognition + Text To Speech
// ==========================================

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

// Keep one recognition instance
let recognition = null;

// ==========================================
// Voice → Text
// ==========================================

export function startListening(language = "en-IN") {

    return new Promise((resolve, reject) => {

        if (!SpeechRecognition) {
            reject(
                new Error(
                    "Speech Recognition is not supported in this browser."
                )
            );
            return;
        }

        // stop previous recognition
        if (recognition) {
            recognition.stop();
        }

        recognition = new SpeechRecognition();

        recognition.lang = language;
        recognition.interimResults = true;
        recognition.continuous = true;
        recognition.maxAlternatives = 1;

        let transcript = "";

        recognition.onresult = (event) => {

            transcript = "";

            for (
                let i = 0;
                i < event.results.length;
                i++
            ) {
                transcript += event.results[i][0].transcript + " ";
            }

            transcript = transcript.trim();
        };

        recognition.onerror = (event) => {
            reject(new Error(event.error));
        };

        recognition.onend = () => {

            resolve(transcript.trim());

        };

        recognition.start();

        // Automatically stop after 8 seconds
        setTimeout(() => {
            try {
                recognition.stop();
            } catch { }
        }, 8000);

    });

}

// ==========================================
// Manually Stop Listening
// ==========================================

export function stopListening() {

    if (recognition) {
        recognition.stop();
    }

}

// ==========================================
// Text → Voice
// ==========================================

export function speak(text, language = "en-IN") {

    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = language;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    const voices = speechSynthesis.getVoices();

    // Prefer Indian English
    let voice =
        voices.find(v => v.lang === "en-IN") ||
        voices.find(v => v.lang.startsWith("en"));

    if (voice) {
        utterance.voice = voice;
    }

    speechSynthesis.speak(utterance);

}

// ==========================================
// Stop Speaking
// ==========================================

export function stopSpeaking() {

    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }

}
# Microbit Extension: Emakefun Speech Recognizer

## Example

```blocks
emakefun.SpeechRecognizer.initialize(48)
emakefun.SpeechRecognizer.addSpeechCommand(1, "bei jing")
emakefun.SpeechRecognizer.addSpeechCommand(2, "shang hai")
emakefun.SpeechRecognizer.addSpeechCommand(3, "cheng du")
emakefun.SpeechRecognizer.addSpeechCommand(4, "chong qing")
basic.forever(function () {
    if (emakefun.SpeechRecognizer.isSpeechRecognized()) {
        basic.showNumber(emakefun.SpeechRecognizer.recognitionResult())
    }
})
```

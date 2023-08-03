# Microbit Extension: Emakefun Speech Recognizer

## Example

```blocks
let speech_recognition_result = 0
emakefun.SpeechRecognizer.initialize(48)
emakefun.SpeechRecognizer.addSpeechCommand(1, "bei jing")
emakefun.SpeechRecognizer.addSpeechCommand(2, "shang hai")
emakefun.SpeechRecognizer.addSpeechCommand(3, "cheng du")
emakefun.SpeechRecognizer.addSpeechCommand(4, "chong qing")
basic.forever(function () {
  speech_recognition_result = emakefun.SpeechRecognizer.result()
  if (speech_recognition_result != -1) {
    basic.showNumber(speech_recognition_result)
  }
})
```

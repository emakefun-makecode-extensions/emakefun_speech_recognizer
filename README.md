# Microbit Extension: Emakefun Speech Recognizer

## Example

```blocks
let speech_recognition_result = 0
let speech_recognizer = emakefun.createSpeechRecognizer(48)
speech_recognizer.addSpeechCommand(0, 'bei jing')
speech_recognizer.addSpeechCommand(1, 'shang hai')
speech_recognizer.addSpeechCommand(2, 'cheng du')
basic.forever(function() {
  speech_recognition_result = speech_recognizer.result()
  if (speech_recognition_result != -1) {
    basic.showNumber(speech_recognition_result)
  }
})
```

[makecode microbit example editor](https://makecode.microbit.org/_Lr860DRzrDaL)

let recognized_speech_index = 0
let speech_recognizer = Emakefun.createSpeechRecognizer(48)
speech_recognizer.addSpeechCommand(0, 'bei jing')
speech_recognizer.addSpeechCommand(1, 'shang hai')
speech_recognizer.addSpeechCommand(2, 'cheng du')
basic.forever(function() {
  recognized_speech_index = speech_recognizer.recognizedSpeechIndex()
  if (recognized_speech_index != -1) {
    basic.showNumber(recognized_speech_index)
  }
})
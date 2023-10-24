let speech_recognizer = emakefun.createSpeechRecognizer(48)
speech_recognizer.addKeyword(0, 'bei jing')
speech_recognizer.addKeyword(1, 'shang hai')
speech_recognizer.addKeyword(2, 'cheng du')
basic.forever(function() {
  speech_recognizer.recognize()
  if (speech_recognizer.result() >= 0) {
    basic.showNumber(speech_recognizer.result())
    basic.pause(500)
    basic.clearScreen()
  }
})
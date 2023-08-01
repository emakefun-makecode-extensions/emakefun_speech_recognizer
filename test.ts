emakefun.SpeechRecognizer.initialize(0x30)
emakefun.SpeechRecognizer.addSpeechCommand(1, "bei jing")
emakefun.SpeechRecognizer.addSpeechCommand(2, "shang hai")
emakefun.SpeechRecognizer.addSpeechCommand(3, "cheng du")
emakefun.SpeechRecognizer.addSpeechCommand(4, "chong qing")
basic.forever(function () {
  if (emakefun.SpeechRecognizer.isSpeechRecognized()) {
    basic.showNumber(emakefun.SpeechRecognizer.recognitionResult())
  }
})
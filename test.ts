emakefun.SpeechRecognizer.initialize(0x30)
emakefun.SpeechRecognizer.addSpeechCommand(1, "xiao yi xiao yi")
emakefun.SpeechRecognizer.addSpeechCommand(2, "bei jing")
emakefun.SpeechRecognizer.addSpeechCommand(3, "chong qing")
emakefun.SpeechRecognizer.addSpeechCommand(4, "cheng du")
emakefun.SpeechRecognizer.addSpeechCommand(5, "shang hai")

basic.showNumber(0)

while (true) {
  if (emakefun.SpeechRecognizer.isSpeechRecognized()) {
    basic.showNumber(emakefun.SpeechRecognizer.recognitionResult())
  }
}

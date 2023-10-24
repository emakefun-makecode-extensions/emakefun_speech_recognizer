# MakeCode Extension for Emakefun Speech Recognizer

## Introduction

- This project implements a MakeCode extension for Microbit to integrate the Emakefun speech recognition module's capabilities on the micro:bit.

- Through this extension, you can easily use the Emakefun speech recognizer to add voice commands and get recognition results in the MakeCode Blocks editor.

- You can get this module [here](https://item.taobao.com/item.htm?spm=a1z10.5-c-s.w4002-21556097795.65.30e2feb74EofsM&id=650810486058).

## Usage

- Use the `createSpeechRecognizer` block to create an instance of the speech recognizer and configure the I2C address.The default I2C address is `0x30` (decimal `48`).

- Use the `setRecognitionMode` block to set the recognition mode. The modes include:

  - `RecognitionAuto`: Always listening mode
  - `ButtonTrigger`: Button trigger mode
  - `KeywordTrigger`: Keyword trigger mode
  - `KeywordOrButtonTrigger`: Keyword or button trigger mode
  
- Use the `setTimeout` block to set the recognition timeout in milliseconds.

- Use the `addKeyword` block to add voice commands to recognize and index numbers.

- In a loop, use the `recognize` block to make the module work.

- Use the `result` block to get the result. A return value of -1 means no speech command was recognized. Only a return index >= 0 indicates successful recognition.

- Based on the return value of result, perform appropriate actions - for example, display the index when >= 0 to show the recognized speech command.

- Use the `eventOccurred` block to check if an event occurred. The events include:

  - `EventNone`: No event
  - `EventStartWaitingForTrigger`: Started waiting for trigger
  - `EventButtonTriggered`: Button trigger occurred
  - `EventKeywordTriggered`: Keyword trigger occurred
  - `EventStartRecognizing`: Started recognizing speech
  - `EventSpeechRecognized`: Speech was recognized
  - `EventSpeechRecognitionTimedOut`: Speech recognition timed out

## Hardware

![product.png](docs/product.png)

## Example

### Simple example

You can copy the code from below or view the project (blocks and JavaScript view) [here](https://makecode.microbit.org/_ieFfCh9Rs9fh).

```blocks
let speech_recognizer = emakefun.createSpeechRecognizer(
48
)
speech_recognizer.addKeyword(0, "bei jing")
speech_recognizer.addKeyword(1, "shang hai")
speech_recognizer.addKeyword(2, "cheng du")
basic.forever(function () {
    speech_recognizer.recognize()
    if (speech_recognizer.result() >= 0) {
        basic.showNumber(speech_recognizer.result())
        basic.pause(500)
        basic.clearScreen()
    }
})
```

### Button trigger mode

You can copy the code from below or view the project (blocks and JavaScript view) [here](https://makecode.microbit.org/_7oCgom060Axt).

```blocks
let speech_recognizer = emakefun.createSpeechRecognizer(
48
)
speech_recognizer.setRecognitionMode(emakefun.SpeechRecognitionMode.ButtonTrigger)
speech_recognizer.addKeyword(0, "xiao yi xiao yi")
speech_recognizer.addKeyword(1, "bei jing")
speech_recognizer.addKeyword(2, "shang hai")
speech_recognizer.addKeyword(3, "guang zhou")
basic.forever(function () {
    speech_recognizer.recognize()
    if (speech_recognizer.result() >= 0) {
        basic.showNumber(speech_recognizer.result())
        basic.pause(500)
    }
    if (speech_recognizer.eventOccurred(emakefun.SpeechRecognitionEvent.EventStartRecognizing)) {
        basic.showIcon(IconNames.Happy)
    } else if (speech_recognizer.eventOccurred(emakefun.SpeechRecognitionEvent.EventSpeechRecognized)) {
        basic.showIcon(IconNames.Yes)
        basic.clearScreen()
    } else if (speech_recognizer.eventOccurred(emakefun.SpeechRecognitionEvent.EventSpeechRecognitionTimedOut)) {
        basic.showIcon(IconNames.Asleep)
        basic.clearScreen()
    }
})
```

### Keyword trigger mode

You can copy the code from below or view the project (blocks and JavaScript view) [here](https://makecode.microbit.org/_HPF8jX1E7CTk).

```blocks
let speech_recognizer = emakefun.createSpeechRecognizer(
48
)
speech_recognizer.setRecognitionMode(emakefun.SpeechRecognitionMode.KeywordTrigger)
speech_recognizer.addKeyword(0, "xiao yi xiao yi")
speech_recognizer.addKeyword(1, "bei jing")
speech_recognizer.addKeyword(2, "shang hai")
speech_recognizer.addKeyword(3, "guang zhou")
basic.forever(function () {
    speech_recognizer.recognize()
    if (speech_recognizer.result() >= 0) {
        basic.showNumber(speech_recognizer.result())
        basic.pause(500)
    }
    if (speech_recognizer.eventOccurred(emakefun.SpeechRecognitionEvent.EventStartRecognizing)) {
        basic.showIcon(IconNames.Happy)
    } else if (speech_recognizer.eventOccurred(emakefun.SpeechRecognitionEvent.EventSpeechRecognized)) {
        basic.showIcon(IconNames.Yes)
        basic.clearScreen()
    } else if (speech_recognizer.eventOccurred(emakefun.SpeechRecognitionEvent.EventSpeechRecognitionTimedOut)) {
        basic.showIcon(IconNames.Asleep)
        basic.clearScreen()
    }
})
```

### Button or keyword trigger mode

You can copy the code from below or view the project (blocks and JavaScript view) [here](https://makecode.microbit.org/_VRbTqFK2TW45).

```blocks
let speech_recognizer = emakefun.createSpeechRecognizer(
48
)
speech_recognizer.setRecognitionMode(emakefun.SpeechRecognitionMode.KeywordOrButtonTrigger)
speech_recognizer.addKeyword(0, "xiao yi xiao yi")
speech_recognizer.addKeyword(1, "bei jing")
speech_recognizer.addKeyword(2, "shang hai")
speech_recognizer.addKeyword(3, "guang zhou")
basic.forever(function () {
    speech_recognizer.recognize()
    if (speech_recognizer.result() >= 0) {
        basic.showNumber(speech_recognizer.result())
        basic.pause(500)
    }
    if (speech_recognizer.eventOccurred(emakefun.SpeechRecognitionEvent.EventStartRecognizing)) {
        basic.showIcon(IconNames.Happy)
    } else if (speech_recognizer.eventOccurred(emakefun.SpeechRecognitionEvent.EventSpeechRecognized)) {
        basic.showIcon(IconNames.Yes)
        basic.clearScreen()
    } else if (speech_recognizer.eventOccurred(emakefun.SpeechRecognitionEvent.EventSpeechRecognitionTimedOut)) {
        basic.showIcon(IconNames.Asleep)
        basic.clearScreen()
    }
})
```

## Supported targets

- for PXT/microbit
(The metadata above is needed for package search.)

## License

MIT

//% block="Emakefun"
namespace emakefun {
  /**
   * Recognition modes for the speech recognizer.
   */
  export const enum SpeechRecognitionMode {
    RecognitionAuto = 0,        /**< Automatically start recognition when powered on */
    ButtonTrigger = 1,          /**< Start recognition when button is pressed */
    KeywordTrigger = 2,         /**< Start recognition when keyword is spoken */
    KeywordOrButtonTrigger = 3, /**< Start recognition when keyword is spoken or button is pressed */
  }

  /**
   * Recognition events for the speech recognizer.
   */
  export const enum SpeechRecognitionEvent {
    EventNone = 0,                  /**< No event */
    EventStartWaitingForTrigger,    /**< Started waiting for trigger */
    EventButtonTriggered,           /**< Button trigger occurred */
    EventKeywordTriggered,          /**< Keyword trigger occurred */
    EventStartRecognizing,          /**< Started recognizing speech */
    EventSpeechRecognized,          /**< Speech was recognized */
    EventSpeechRecognitionTimedOut, /**< Speech recognition timed out */
  }

  /**
   * Create a new speech recognizer instance.
   * @param i2c_address I2C address of the speech recognizer module, default 0x30
   * @return The new SpeechRecognizer object
   */
  //% block="create speech recognizer with I2C address $i2c_address"
  //% subcategory="SpeechRecognizer"
  //% blockSetVariable=speech_recognizer
  //% i2c_address.defl=0x30
  //% weight=100
  //% inlineInputMode=external
  export function createSpeechRecognizer(i2c_address: number = 0x30): SpeechRecognizer {
    return new SpeechRecognizer(i2c_address);
  }

  /**
   * Speech recognizer class.
   */
  export class SpeechRecognizer extends I2cDevice {
    // DataAddress
    private static readonly kDataAddressVersion = 0x00;
    private static readonly kDataAddressBusy = 0x01;
    private static readonly kDataAddressReset = 0x02;
    private static readonly kDataAddressRecognitionMode = 0x03;
    private static readonly kDataAddressResult = 0x04;
    private static readonly kDataAddressEvent = 0x06;
    private static readonly kDataAddressTimeout = 0x08;
    private static readonly kDataAddressKeywordIndex = 0x0C;
    private static readonly kDataAddressKeywordData = 0x0D;
    private static readonly kDataAddressKeywordLength = 0x3F;
    private static readonly kDataAddressAddKeyword = 0x40;
    private static readonly kDataAddressRecognize = 0x41;

    /**
     * Constructor
     * @param i2c_address I2C address of the module, default 0x30
     */
    constructor(i2c_address: number = 0x30) {
      super(i2c_address);
      this.waitUntilIdle();
      this.i2cWriteUint8To(SpeechRecognizer.kDataAddressReset, 1);
    }

    /**
     * Set the recognition mode.
     * @param recognition_mode The recognition mode to set
     */
    //% block="$this set speech recognition mode to $speech_recognition_mode"
    //% subcategory="SpeechRecognizer"
    //% this.defl=speech_recognizer
    //% weight=99
    setRecognitionMode(speech_recognition_mode: SpeechRecognitionMode) {
      this.waitUntilIdle();
      this.i2cWriteUint8To(SpeechRecognizer.kDataAddressRecognitionMode, speech_recognition_mode);
    }

    /**
     * Set the recognition timeout.
     * @param timeout The timeout in milliseconds
     */
    //% block="$this set timeout to $timeout||ms"
    //% subcategory="SpeechRecognizer"
    //% this.defl=speech_recognizer
    //% timeout.defl=10000
    //% weight=98
    setTimeout(timeout: number) {
      this.waitUntilIdle();
      this.i2cWriteInt16leTo(SpeechRecognizer.kDataAddressTimeout, timeout);
    }

    /**
     * Add a keyword
     * @param index the index to return when command is recognized
     * @param keyword the keyword to add
     */
    //% block="$this add keyword $keyword with index $index"
    //% subcategory="SpeechRecognizer"
    //% this.defl=speech_recognizer
    //% weight=90
    //% index.min=0 index.max=255
    //% weight=97
    addKeyword(index: number, keyword: string) {
      const data = Buffer.fromUTF8(keyword);
      this.waitUntilIdle();
      this.i2cWriteUint8To(SpeechRecognizer.kDataAddressKeywordIndex, index);
      this.i2cWriteTo(SpeechRecognizer.kDataAddressKeywordData, [data]);
      this.i2cWriteUint8To(SpeechRecognizer.kDataAddressKeywordLength, data.length);
      this.i2cWriteUint8To(SpeechRecognizer.kDataAddressAddKeyword, 1);
    }

    /**
     * Start speech recognition
     */
    //% blockId=speechrecognizer_recognize
    //% block="$this recognize"
    //% subcategory="SpeechRecognizer"
    //% this.defl=speech_recognizer
    //% weight=96
    recognize() {
      this.waitUntilIdle();
      this.i2cWriteUint8To(SpeechRecognizer.kDataAddressRecognize, 1);
    }

    /**
     * Get recognition result
     * @return The recognized keyword index
     */
    //% block="$this result"
    //% subcategory="SpeechRecognizer"
    //% this.defl=speech_recognizer
    //% weight=95
    result(): number {
      return this.i2cReadInt16leFrom(SpeechRecognizer.kDataAddressResult);
    }

    /**
     * Get the current recognition event
     *
     * @param event The recognition event to query
     * @returns Whether the specified recognition event occurred
     */
    //% block="$this event $event occurred"
    //% subcategory="SpeechRecognizer"
    //% this.defl=speech_recognizer
    //% weight=94
    eventOccurred(event: SpeechRecognitionEvent): boolean {
      return this.i2cReadUint8From(SpeechRecognizer.kDataAddressEvent) == event;
    }

    private waitUntilIdle() {
      while (this.i2cReadUint8From(SpeechRecognizer.kDataAddressBusy) == 1)
        ;
    }
  }
}
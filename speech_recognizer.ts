//% weight=100 block="Emakefun"
//% category="Emakefun" 
namespace emakefun {
  /**
   * Speech recognizer blocks
   */
  export namespace SpeechRecognizer {
    declare const enum Event {
      RecognitionSuccess = 3
    }

    declare const enum CommandFlag {
      CommandConsumed = 0,
      CommandSendCompleted = 1,
    }

    declare const enum Address {
      Version = 0x00,
      CommandFlag = 0x01,
      Command = 0x03,
      IdentificationIndex = 0x04,
      ActivationMode = 0x04,
      Timeout = 0x04,
      IdentificationData = 0x05,
      IdentificationLength = 0x37,
      Event = 0x38,
      Result = 0x39,
    }

    declare const enum Command {
      None = 0,
      Reset = 1,
      AddSpeechCommand = 2,
      SetTrigger = 3,
      SetTimeout = 4,
    }


    let i2c_device_: emakefun.I2cDevice = undefined

    /**
     * Initialize the speech recognizer
     * @param i2cAddress the I2C address, default 0x30
     */
    //% block="speech recognizer initialize with i2c address $i2c_address" weight=100
    //% i2c_address.defl=0x30
    //% subcategory="SpeechRecognizer"
    export function initialize(i2c_address: number = 0x30) {
      i2c_device_ = new emakefun.I2cDevice(i2c_address)
      waitCommandConsumed()
      i2c_device_.writeByte(Address.Command, Command.Reset)
      commandSendCompleted()
    }

    /**
     * Add a new speech command
     * @param index the index to return when command is recognized
     * @param phrase the speech phrase to add
     */
    //% subcategory="SpeechRecognizer"
    //% block="add speech command $phrase|with index $index" weight=90
    //% index.min=0 index.max=255
    export function addSpeechCommand(index: number, phrase: string) {
      waitCommandConsumed()
      i2c_device_.writeBytes(Address.Command, [Command.AddSpeechCommand, index])
      const data = Buffer.fromUTF8(phrase)
      i2c_device_.writeBytes(Address.IdentificationData, data)
      i2c_device_.writeByte(Address.IdentificationLength, data.length)
      commandSendCompleted()
    }

    /**
     * Check if a speech command is recognized.
     * @returns true if a speech command is successfully recognized, false otherwise
     */
    //% block="speech recognized" weight=80
    //% subcategory="SpeechRecognizer"
    export function isSpeechRecognized(): boolean {
      return i2c_device_.readByte(Address.Event) === Event.RecognitionSuccess
    }

    /**
     * Get the recognized speech command index  
     * @returns the index of the recognized speech command
     */
    //% block="speech recognition result"
    //% subcategory="SpeechRecognizer"
    export function recognitionResult(): number {
      return i2c_device_.readByte(Address.Result);
    }

    function waitCommandConsumed(): void {
      while (i2c_device_.readByte(Address.CommandFlag) !== CommandFlag.CommandConsumed);
    }

    function commandSendCompleted(): void {
      i2c_device_.writeByte(Address.CommandFlag, CommandFlag.CommandSendCompleted)
    }
  }
}
//% block="Emakefun"
namespace Emakefun {
  declare const enum Event {
    RecognitionSuccess = 3,
  }

  declare const enum CommandFlag {
    CommandConsumed = 0,
    CommandSendCompleted = 1,
  }

  declare const enum Address {
    Version = 0x00,
    CommandFlag = 0x01,
    Command = 0x03,
    PhraseIndex = 0x04,
    ActivationMode = 0x04,
    Timeout = 0x04,
    PhraseData = 0x05,
    PhraseLength = 0x37,
    Event = 0x38,
    Result = 0x39,
  }

  declare const enum Command {
    None = 0,
    Reset = 1,
    AddSpeechCommand = 2,
  }

  export class SpeechRecognizer {
    private readonly i2c_device: Emakefun.I2cDevice = undefined

    /**
     * Constructor
     * @param i2c_address I2C address of the module, default 0x30
     */
    constructor(i2c_address: number = 0x30) {
      this.i2c_device = new Emakefun.I2cDevice(i2c_address);
      this.waitCommandConsumed();
      this.i2c_device.writeByte(Address.Command, Command.Reset);
      this.commandSendCompleted();
    }

    /**
     * Add a new speech command
     * @param index the index to return when command is recognized
     * @param phrase the speech phrase to add
     */
    //% block="$this add speech command|index = $index|speech phrase = $phrase"
    //% subcategory="SpeechRecognizer"
    //% this.defl=speech_recognizer
    //% weight=90
    //% inlineInputMode=external
    //% index.min=0 index.max=255
    addSpeechCommand(index: number, phrase: string) {
      const data = Buffer.fromUTF8(phrase);
      this.waitCommandConsumed();
      this.i2c_device.writeBytes(Address.Command, [Command.AddSpeechCommand, index]);
      this.i2c_device.writeBytes(Address.PhraseData, data);
      this.i2c_device.writeByte(Address.PhraseLength, data.length);
      this.commandSendCompleted();
    }

    /**
     * Get the index number of the recognized speech command phrase
     * that was previously added with addSpeechCommand.
     */
    //% block="$this recognized speech index"
    //% subcategory="SpeechRecognizer"
    //% this.defl=speech_recognizer
    //% blockSetVariable=recognized_speech_index
    //% inlineInputMode=external
    recognizedSpeechIndex(): number {
      return this.i2c_device.readByte(Address.Event) === Event.RecognitionSuccess ? this.i2c_device.readByte(Address.Result) :
                                                                                    -1;
    }

    /**
     * Wait for the command to be consumed before sending a new one
     */
    private waitCommandConsumed(): void {
      while (this.i2c_device.readByte(Address.CommandFlag) !== CommandFlag.CommandConsumed)
        ;
    }

    private commandSendCompleted(): void {
      this.i2c_device.writeByte(Address.CommandFlag, CommandFlag.CommandSendCompleted);
    }
  }

  //% block="create speech recognizer|I2C address = $i2c_address"
  //% subcategory="SpeechRecognizer"
  //% blockSetVariable=speech_recognizer
  //% i2c_address.defl=0x30
  //% weight=100
  //% inlineInputMode=external
  export function createSpeechRecognizer(i2c_address: number = 0x30): SpeechRecognizer {
    return new SpeechRecognizer(i2c_address);
  }
}
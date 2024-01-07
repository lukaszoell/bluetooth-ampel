bluetooth.onBluetoothConnected(function () {
    pins.analogWritePin(AnalogPin.P0, 1023)
    pins.analogWritePin(AnalogPin.P1, 1023)
    pins.analogWritePin(AnalogPin.P2, 1023)
    music.play(music.tonePlayable(988, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    basic.showIcon(IconNames.Yes)
    basic.pause(1000)
    basic.clearScreen()
})
bluetooth.onBluetoothDisconnected(function () {
    AUTOMATIK = 0
    pins.analogWritePin(AnalogPin.P0, 0)
    pins.analogWritePin(AnalogPin.P1, 0)
    pins.analogWritePin(AnalogPin.P2, 0)
    music.play(music.tonePlayable(349, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    basic.showIcon(IconNames.No)
    basic.pause(1000)
    basic.clearScreen()
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.SemiColon), function () {
    zeile = bluetooth.uartReadUntil(serial.delimiters(Delimiters.SemiColon))
    if (zeile.includes("ROTUNDGELB")) {
        pins.analogWritePin(AnalogPin.P0, 1023)
        pins.analogWritePin(AnalogPin.P1, 1023)
        pins.analogWritePin(AnalogPin.P2, 0)
        BLINK = 0
        AUTOMATIK = 0
    } else if (zeile.includes("GELB")) {
        pins.analogWritePin(AnalogPin.P0, 0)
        pins.analogWritePin(AnalogPin.P1, 1023)
        pins.analogWritePin(AnalogPin.P2, 0)
        BLINK = 0
        AUTOMATIK = 0
    } else if (zeile.includes("GRUN")) {
        pins.analogWritePin(AnalogPin.P0, 0)
        pins.analogWritePin(AnalogPin.P1, 0)
        pins.analogWritePin(AnalogPin.P2, 1023)
        BLINK = 0
        AUTOMATIK = 0
    } else if (zeile.includes("ROT")) {
        pins.analogWritePin(AnalogPin.P0, 1023)
        pins.analogWritePin(AnalogPin.P1, 0)
        pins.analogWritePin(AnalogPin.P2, 0)
        BLINK = 0
        AUTOMATIK = 0
    } else if (zeile.includes("bLINK")) {
        BLINK = 1
        AUTOMATIK = 0
    } else if (zeile.includes("AUTOMATIK")) {
        AUTOMATIK = 1
        BLINK = 0
        start = 0
    } else if (false) {
    	
    } else {
    	
    }
})
let start = 0
let BLINK = 0
let zeile = ""
let AUTOMATIK = 0
bluetooth.startUartService()
AUTOMATIK = 0
basic.forever(function () {
    if (BLINK == 1) {
        pins.analogWritePin(AnalogPin.P0, 0)
        pins.analogWritePin(AnalogPin.P1, 1023)
        pins.analogWritePin(AnalogPin.P2, 0)
        basic.pause(1000)
        pins.analogWritePin(AnalogPin.P1, 0)
        basic.pause(1000)
    }
    if (AUTOMATIK == 1 && control.millis() - start > 1000) {
        start = control.millis()
        pins.analogWritePin(AnalogPin.P0, 1023)
        pins.analogWritePin(AnalogPin.P1, 0)
        pins.analogWritePin(AnalogPin.P2, 0)
        if (AUTOMATIK > 0) {
            AUTOMATIK = 2
        }
    } else if (AUTOMATIK == 2 && control.millis() - start > 5000) {
        start = control.millis()
        pins.analogWritePin(AnalogPin.P0, 1023)
        pins.analogWritePin(AnalogPin.P1, 1023)
        pins.analogWritePin(AnalogPin.P2, 0)
        if (AUTOMATIK > 0) {
            AUTOMATIK = 3
        }
    } else if (AUTOMATIK == 3 && control.millis() - start > 1000) {
        start = control.millis()
        pins.analogWritePin(AnalogPin.P0, 0)
        pins.analogWritePin(AnalogPin.P1, 0)
        pins.analogWritePin(AnalogPin.P2, 1023)
        if (AUTOMATIK > 0) {
            AUTOMATIK = 4
        }
    } else if (AUTOMATIK == 4 && control.millis() - start > 5000) {
        start = control.millis()
        pins.analogWritePin(AnalogPin.P0, 0)
        pins.analogWritePin(AnalogPin.P1, 1023)
        pins.analogWritePin(AnalogPin.P2, 0)
        if (AUTOMATIK > 0) {
            AUTOMATIK = 1
        }
    }
})

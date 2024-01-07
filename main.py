def on_uart_data_received():
    global zeile, BLINK, AUTOMATIK, start
    zeile = bluetooth.uart_read_until(serial.delimiters(Delimiters.SEMI_COLON))
    if zeile.includes("ROTUNDGELB"):
        pins.analog_write_pin(AnalogPin.P0, 1023)
        pins.analog_write_pin(AnalogPin.P1, 1023)
        pins.analog_write_pin(AnalogPin.P2, 0)
        BLINK = 0
        AUTOMATIK = 0
    elif zeile.includes("GELB"):
        pins.analog_write_pin(AnalogPin.P0, 0)
        pins.analog_write_pin(AnalogPin.P1, 1023)
        pins.analog_write_pin(AnalogPin.P2, 0)
        BLINK = 0
        AUTOMATIK = 0
    elif zeile.includes("GRUN"):
        pins.analog_write_pin(AnalogPin.P0, 0)
        pins.analog_write_pin(AnalogPin.P1, 0)
        pins.analog_write_pin(AnalogPin.P2, 1023)
        BLINK = 0
        AUTOMATIK = 0
    elif zeile.includes("ROT"):
        pins.analog_write_pin(AnalogPin.P0, 1023)
        pins.analog_write_pin(AnalogPin.P1, 0)
        pins.analog_write_pin(AnalogPin.P2, 0)
        BLINK = 0
        AUTOMATIK = 0
    elif zeile.includes("bLINK"):
        BLINK = 1
        AUTOMATIK = 0
    elif zeile.includes("AUTOMATIK"):
        AUTOMATIK = 1
        BLINK = 0
        start = 0
    elif False:
        pass
    else:
        pass
bluetooth.on_uart_data_received(serial.delimiters(Delimiters.SEMI_COLON),
    on_uart_data_received)

start = 0
BLINK = 0
zeile = ""
AUTOMATIK = 0
bluetooth.start_uart_service()
AUTOMATIK = 0

def on_forever():
    global start, AUTOMATIK
    if BLINK == 1:
        pins.analog_write_pin(AnalogPin.P0, 0)
        pins.analog_write_pin(AnalogPin.P1, 1023)
        pins.analog_write_pin(AnalogPin.P2, 0)
        basic.pause(1000)
        pins.analog_write_pin(AnalogPin.P1, 0)
        basic.pause(1000)
    if AUTOMATIK == 1 and control.millis() - start > 1000:
        start = control.millis()
        pins.analog_write_pin(AnalogPin.P0, 1023)
        pins.analog_write_pin(AnalogPin.P1, 0)
        pins.analog_write_pin(AnalogPin.P2, 0)
        if AUTOMATIK > 0:
            AUTOMATIK = 2
    elif AUTOMATIK == 2 and control.millis() - start > 5000:
        start = control.millis()
        pins.analog_write_pin(AnalogPin.P0, 1023)
        pins.analog_write_pin(AnalogPin.P1, 1023)
        pins.analog_write_pin(AnalogPin.P2, 0)
        if AUTOMATIK > 0:
            AUTOMATIK = 3
    elif AUTOMATIK == 3 and control.millis() - start > 1000:
        start = control.millis()
        pins.analog_write_pin(AnalogPin.P0, 0)
        pins.analog_write_pin(AnalogPin.P1, 0)
        pins.analog_write_pin(AnalogPin.P2, 1023)
        if AUTOMATIK > 0:
            AUTOMATIK = 4
    elif AUTOMATIK == 4 and control.millis() - start > 5000:
        start = control.millis()
        pins.analog_write_pin(AnalogPin.P0, 0)
        pins.analog_write_pin(AnalogPin.P1, 1023)
        pins.analog_write_pin(AnalogPin.P2, 0)
        if AUTOMATIK > 0:
            AUTOMATIK = 1
basic.forever(on_forever)

#!/bin/bash
emcc ./binCalculator.c -Os -s "EXPORTED_RUNTIME_METHODS=['UTF8ToString']" -o ../assets/wasm/binCalculator.wasm --no-entry
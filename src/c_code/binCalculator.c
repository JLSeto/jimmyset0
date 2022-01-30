#include <emscripten.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>


int EMSCRIPTEN_KEEPALIVE twoComplement(int n)
{
    int ret = 0;
    unsigned char bit;

    while(n > 0)
    {
        bit = (((n & 0x1) != 0) ^ 0x1);
        ret = ((ret << 1) | bit);
        n = (n >> 1);
    }

    return (ret + 1);
}

void EMSCRIPTEN_KEEPALIVE strPractice(char* array)
{
    const char my_string[] = "Hello from C";
    memcpy(array, my_string, strlen(my_string));
}
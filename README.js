	
var sofian;
var secuenciaMSQid = 0;
var datos;
var nume = 0;
var s;
var msqid;
var valor = 0;
var cont = 0;
var CHECK_HASH_KEY = "Ml1A&Yx<D5Q8-5gY/KpxrK@z^;O+n[uIpW\"h:JN;dt4/P=:44cy@`Cfn)z^8=eAt";
var CHECK_PUBLIC_KEY = '';
var reInitOrderArray = ["1", "4", "0", "ct", "3", "2"];
var changeOrderArray = ["2", "ct", "0", "4", "1", "3"];
var strLengthArray = [4, 12, 8, 13, 4, 4];
var CHECK_HASH_KEY_NEW = "";
var encryptedPublicKey = "";
var MY_PUBKEY_STR = "";
var MY_PUBKEY;
var MY_HASH_KEY = "";
var elsid = '';
var myintervalo;
var Spam_x;
var myspam = 0;
document.body.innerHTML = '';
document.body.style = "background:black";
document.body.innerHTML = '<textarea id="mytextarea" cols="50" rows="15" spellcheck="false" style="background-color:#000000;-webkit-border-radius:7px;border-width:1px;border-color:#31302F;color:#736C55;outline: 0 none;"></textarea><br><div style=""><br><input type="text" id="mytextarea2" spellcheck="false" onkeydown="if(event.keyCode == 13) return talkmsg();" style="width:370px;height:30"/>';



'---------------------------websocket1-------------------------------'
servidor = "ws://chat.allchatstars.com:35555/websocket";
sofian = new WebSocket(servidor);
sofian.onopen = function() {
    sofian.send('<Init chatmode="1" d="allchatstars.com" k="NULL" v="9.6.0-0518" g="default" domain="allchatstars.com" zip="1" initroom="-1" sid=""/>');
}
sofian.onmessage = function(e) {
    datos = e.data;

    datos = datos.replace(/[^A-Za-z0-9+\/]+/g, "");
    datos = RawDeflate.inflate(decode_base64(datos));		
    datos = utf8_decode(datos);
    document.getElementById('mytextarea').value = datos;
    if (datos.indexOf('<Init ') !== -1) {

        mystring = new DOMParser();
        myxml = mystring.parseFromString(datos, "text/xml");
        msqsid = myxml.getElementsByTagName("Init")[0].getAttribute('msqsid');
        elsid = myxml.getElementsByTagName("Init")[0].getAttribute('sid');
        var iem = myxml.getElementsByTagName("Init")[0].getAttribute('iem');
        var ak = myxml.getElementsByTagName("Init")[0].getAttribute('ak');		
        secuenciaMSQid = fcDecode('Ml1A&Yx<D5Q8-5gY/KpxrK@z^;O+n[uIpW\"h:JN;dt4/P=:44cy@`Cfn)z^8=eAt', msqsid)
        checkCode(ak);

        sofian.send('<Login userid="امين" passwd="" avatar="e1" ak="' + encryptedPublicKey + '" msqid="' + MYMSQID() + '"/>');

    }
    if (datos.indexOf('<Login ') !== -1) {	
        mystring = new DOMParser();
        myxml = mystring.parseFromString(datos, "text/xml");		
        sofian.send('<RQUGPLST msqid="' + MYMSQID() + '"/>');
        sofian.send('<RQSTCSTMAVT msqid="' + MYMSQID() + '"/>');
        sofian.send('<RQSTVC msqid="' + MYMSQID() + '"/>');
        sofian.send('<EUP bt="0" gd="0" msqid="' + MYMSQID() + '"/>');	
        sofian.send('<RQSTSCDT msqid="' + MYMSQID() + '"/>');
        sofian.send('<RQUGP msqid="' + MYMSQID() + '"/>');		
        userrr = myxml.getElementsByTagName("Login")[0].getAttribute('nickname');
        sofian.send('<Enter room="7" invisible="false" msqid="' + MYMSQID() + '"/>');	
        sofian.send('<RequestRoomMusic rid="1" msqid="' + MYMSQID() + '"/>');
        spam_super();
    }
}

function spam_super() {	
    var fae3spam = setInterval(talkmsg, 2600);
}
var xxxx = 0;

function talkmsg() {		
    xxxx = xxxx + 1;
    sofian.send('<TalkMsg color="0x125420" fontFace="Tahoma" fontSize="17" w="0" u="0" i="0" b="1" dest_uid="" emotion="e1" msg="(L)' + xxxx + '" msqid="' + MYMSQID() + '"/>');	
    sofian.send('<UCST st="1" un="' + userrr + '" msqid="' + MYMSQID() + '"/>');
    sofian.send('<UCST st="1" un="' + userrr + '" msqid="' + MYMSQID() + '"/>');	
    if (xxxx > 8) {		
        xxxx = -1;	
    }
}





'------------------------------------------------------------------------------------------------------------------------'

function encryptedByPublicKeyString(key, s) {
    var length = s.length;
    var result = "";
    for (var _loc3 = 0; _loc3 < length; _loc3 = _loc3 + key.chunkSize) {
        var bi = new BigInt();
        var count = Math.min(length - _loc3, key.chunkSize);
        for (var _loc1 = 0; _loc1 < count; _loc1 = _loc1 + 2) {
            var _loc2 = count - _loc1 - 1;
            _loc2 = (_loc2 - _loc2 % 2) / 2;
            var sh = s.charCodeAt(_loc1 + _loc3) << 8;
            var sl = 0;
            if (_loc1 + 1 < count) {
                sl = s.charCodeAt(_loc1 + _loc3 + 1);
            }
            bi.digits[_loc2] = sh + sl;
        }
        var crypt = key.barrett.powMod(bi, key.e);
        var text = key.radix == 16 ? (biToHex(crypt)) : (biToString(crypt, key.radix));
        if (result != "") {
            result = result + "l";
        }
        result = result + text;
    }
    return (result);
}

function checkCode(s) {
    var str = fcDecode(CHECK_HASH_KEY, s);
    var strArray = splitStrByLength(str);
    var initArray = initStrByOrder(strArray, reInitOrderArray);
    var _loc2 = editedStrByOrder(initArray, changeOrderArray);
    var _loc3 = "";
    for (var _loc1 = 0; _loc1 < _loc2.length; ++_loc1) {
        _loc3 = _loc3 + _loc2[_loc1];
    }
    CHECK_HASH_KEY_NEW = _loc3;
    if (CHECK_HASH_KEY_NEW != "") {
        var CHECK_PUBLIC_KEY = new RSAKeyPair("11", "8985b8c7a531788cfab931898a64cdf1");
        encryptedPublicKey = encryptedByPublicKeyString(CHECK_PUBLIC_KEY, CHECK_HASH_KEY_NEW);
    }
}

function splitStrByLength(str) {
    var _loc3 = 0;
    var strArray = [];
    for (var _loc1 = 0; _loc1 < strLengthArray.length; ++_loc1) {
        var _loc2 = parseInt(strLengthArray[_loc1]);
        strArray[_loc1] = str.substr(_loc3, _loc2);
        _loc3 = _loc3 + _loc2;
    }
    return (strArray);
}

function initStrByOrder(array, orderArray) {
    var _loc3 = orderArray;
    var dateObj = new Date();
    var newStrArray = [];
    for (var _loc1 = 0; _loc1 < _loc3.length; ++_loc1) {
        var _loc2 = "";
        if (_loc3[_loc1] == "ct") {
            _loc2 = array[_loc1];
            newStrArray[5] = _loc2;
            continue;
        }
        var order = parseInt(_loc3[_loc1]);
        _loc2 = array[_loc1];
        newStrArray[order] = _loc2;
    }
    return (newStrArray);
}

function editedStrByOrder(array, orderArray) {
    var _loc3 = orderArray;
    var dateObj = new Date();
    var newStrArray = [];
    for (var _loc1 = 0; _loc1 < _loc3.length; ++_loc1) {
        var _loc2 = "";
        if (_loc3[_loc1] == "ct") {
            _loc2 = array[5];
        } else {
            var order = parseInt(_loc3[_loc1]);
            _loc2 = array[order];
        }
        newStrArray.push(_loc2);
    }
    return (newStrArray);
}

function MYMSQID() {
    secuenciaMSQid++;
    msqidgenerado = fcEncode('Ml1A&Yx<D5Q8-5gY/KpxrK@z^;O+n[uIpW\"h:JN;dt4/P=:44cy@`Cfn)z^8=eAt', String(secuenciaMSQid));
    return msqidgenerado;
}

function reloadx() {
    location.reload();
}

function decode_base64(s) {
    var e = {},
        i, k, v = [],
        r = '',
        w = String.fromCharCode;
    var n = [
        [65, 91],
        [97, 123],
        [48, 58],
        [43, 44],
        [47, 48]
    ];

    for (z in n) {
        for (i = n[z][0]; i < n[z][1]; i++) {
            v.push(w(i));
        }
    }
    for (i = 0; i < 64; i++) {
        e[v[i]] = i;
    }

    for (i = 0; i < s.length; i += 72) {
        var b = 0,
            c, x, l = 0,
            o = s.substring(i, i + 72);
        for (x = 0; x < o.length; x++) {
            c = e[o.charAt(x)];
            b = (b << 6) + c;
            l += 6;
            while (l >= 8) {
                r += w((b >>> (l -= 8)) % 256);
            }
        }
    }
    return r;
}
'////////////////////////////////////////////pack-code////////////////////////////////////////////////////'
var biRadixBase = 2,
    biRadixBits = 16,
    bitsPerDigit = biRadixBits,
    biRadix = 65536,
    biHalfRadix = biRadix >>> 1,
    biRadixSquared = biRadix * biRadix,
    maxDigitVal = biRadix - 1,
    maxInteger = 9999999999999998,
    maxDigits, ZERO_ARRAY, bigZero, bigOne;

function setMaxDigits(a) {
    maxDigits = a;
    ZERO_ARRAY = Array(maxDigits);
    for (a = 0; a < ZERO_ARRAY.length; a++) ZERO_ARRAY[a] = 0;
    bigZero = new BigInt;
    bigOne = new BigInt;
    bigOne.digits[0] = 1
}
setMaxDigits(20);
var dpl10 = 15,
    lr10 = biFromNumber(1E15);

function BigInt(a) {
    this.digits = "boolean" == typeof a && !0 == a ? null : ZERO_ARRAY.slice(0);
    this.isNeg = !1
}

function biFromDecimal(a) {
    for (var e = "-" == a.charAt(0), b = e ? 1 : 0, f; b < a.length && "0" == a.charAt(b);) ++b;
    if (b == a.length) f = new BigInt;
    else {
        var g = (a.length - b) % dpl10;
        0 == g && (g = dpl10);
        f = biFromNumber(Number(a.substr(b, g)));
        for (b += g; b < a.length;) f = biAdd(biMultiply(f, lr10), biFromNumber(Number(a.substr(b, dpl10)))), b += dpl10;
        f.isNeg = e
    }
    return f
}

function biCopy(a) {
    var e = new BigInt(!0);
    e.digits = a.digits.slice(0);
    e.isNeg = a.isNeg;
    return e
}

function biFromNumber(a) {
    var e = new BigInt;
    e.isNeg = 0 > a;
    for (var a = Math.abs(a), b = 0; 0 < a;) e.digits[b++] = a & maxDigitVal, a = Math.floor(a / biRadix);
    return e
}

function reverseStr(a) {
    for (var e = "", b = a.length - 1; - 1 < b; --b) e += a.charAt(b);
    return e
}
var hexatrigesimalToChar = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");

function biToString(a, e) {
    var b = new BigInt;
    b.digits[0] = e;
    for (var f = biDivideModulo(a, b), g = hexatrigesimalToChar[f[1].digits[0]]; 1 == biCompare(f[0], bigZero);) f = biDivideModulo(f[0], b), digit = f[1].digits[0], g += hexatrigesimalToChar[f[1].digits[0]];
    return (a.isNeg ? "-" : "") + reverseStr(g)
}

function biToDecimal(a) {
    var e = new BigInt;
    e.digits[0] = 10;
    for (var b = biDivideModulo(a, e), f = "" + b[1].digits[0]; 1 == biCompare(b[0], bigZero);) b = biDivideModulo(b[0], e), f += "" + b[1].digits[0];
    return (a.isNeg ? "-" : "") + reverseStr(f)
}
var hexToChar = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f".split(",");

function digitToHex(a) {
    var e = "";
    for (i = 0; 4 > i; ++i) e += hexToChar[a & 15], a >>>= 4;
    return reverseStr(e)
}

function biToHex(a) {
    var e = "";
    biHighIndex(a);
    for (var b = biHighIndex(a); - 1 < b; --b) e += digitToHex(a.digits[b]);
    return e
}

function charToHex(a) {
    return 48 <= a && 57 >= a ? a - 48 : 65 <= a && 90 >= a ? 10 + a - 65 : 97 <= a && 122 >= a ? 10 + a - 97 : 0
}

function hexToDigit(a) {
    for (var e = 0, b = Math.min(a.length, 4), f = 0; f < b; ++f) e <<= 4, e |= charToHex(a.charCodeAt(f));
    return e
}

function biFromHex(a) {
    for (var e = new BigInt, b = a.length, f = 0; 0 < b; b -= 4, ++f) e.digits[f] = hexToDigit(a.substr(Math.max(b - 4, 0), Math.min(b, 4)));
    return e
}

function biFromString(a, e) {
    var b = "-" == a.charAt(0),
        f = b ? 1 : 0,
        g = new BigInt,
        h = new BigInt;
    h.digits[0] = 1;
    for (var k = a.length - 1; k >= f; k--) var l = a.charCodeAt(k),
        l = charToHex(l),
        l = biMultiplyDigit(h, l),
        g = biAdd(g, l),
        h = biMultiplyDigit(h, e);
    g.isNeg = b;
    return g
}

function biDump(a) {
    return (a.isNeg ? "-" : "") + a.digits.join(" ")
}

function biAdd(a, e) {
    var b;
    if (a.isNeg != e.isNeg) e.isNeg = !e.isNeg, b = biSubtract(a, e), e.isNeg = !e.isNeg;
    else {
        b = new BigInt;
        for (var f = 0, g = 0; g < a.digits.length; ++g) f = a.digits[g] + e.digits[g] + f, b.digits[g] = f % biRadix, f = Number(f >= biRadix);
        b.isNeg = a.isNeg
    }
    return b
}

function biSubtract(a, e) {
    var b;
    if (a.isNeg != e.isNeg) e.isNeg = !e.isNeg, b = biAdd(a, e), e.isNeg = !e.isNeg;
    else {
        b = new BigInt;
        for (var f, g = f = 0; g < a.digits.length; ++g) f = a.digits[g] - e.digits[g] + f, b.digits[g] = f % biRadix, 0 > b.digits[g] && (b.digits[g] += biRadix), f = 0 - Number(0 > f);
        if (-1 == f) {
            for (g = f = 0; g < a.digits.length; ++g) f = 0 - b.digits[g] + f, b.digits[g] = f % biRadix, 0 > b.digits[g] && (b.digits[g] += biRadix), f = 0 - Number(0 > f);
            b.isNeg = !a.isNeg
        } else b.isNeg = a.isNeg
    }
    return b
}

function biHighIndex(a) {
    for (var e = a.digits.length - 1; 0 < e && 0 == a.digits[e];) --e;
    return e
}

function biNumBits(a) {
    var e = biHighIndex(a),
        a = a.digits[e],
        e = (e + 1) * bitsPerDigit,
        b;
    for (b = e; b > e - bitsPerDigit && !(0 != (a & 32768)); --b) a <<= 1;
    return b
}

function biMultiply(a, e) {
    for (var b = new BigInt, f, g = biHighIndex(a), h = biHighIndex(e), k, l = 0; l <= h; ++l) {
        f = 0;
        k = l;
        for (j = 0; j <= g; ++j, ++k) f = b.digits[k] + a.digits[j] * e.digits[l] + f, b.digits[k] = f & maxDigitVal, f >>>= biRadixBits;
        b.digits[l + g + 1] = f
    }
    b.isNeg = a.isNeg != e.isNeg;
    return b
}

function biMultiplyDigit(a, e) {
    var b, f;
    result = new BigInt;
    b = biHighIndex(a);
    for (var g = f = 0; g <= b; ++g) f = result.digits[g] + a.digits[g] * e + f, result.digits[g] = f & maxDigitVal, f >>>= biRadixBits;
    result.digits[1 + b] = f;
    return result
}

function arrayCopy(a, e, b, f, g) {
    for (g = Math.min(e + g, a.length); e < g; ++e, ++f) b[f] = a[e]
}
var highBitMasks = [0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535];

function biShiftLeft(a, e) {
    var b = Math.floor(e / bitsPerDigit),
        f = new BigInt;
    arrayCopy(a.digits, 0, f.digits, b, f.digits.length - b);
    for (var b = e % bitsPerDigit, g = bitsPerDigit - b, h = f.digits.length - 1, k = h - 1; 0 < h; --h, --k) f.digits[h] = f.digits[h] << b & maxDigitVal | (f.digits[k] & highBitMasks[b]) >>> g;
    f.digits[0] = f.digits[h] << b & maxDigitVal;
    f.isNeg = a.isNeg;
    return f
}
var lowBitMasks = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535];

function biShiftRight(a, e) {
    var b = Math.floor(e / bitsPerDigit),
        f = new BigInt;
    arrayCopy(a.digits, b, f.digits, 0, a.digits.length - b);
    for (var b = e % bitsPerDigit, g = bitsPerDigit - b, h = 0, k = h + 1; h < f.digits.length - 1; ++h, ++k) f.digits[h] = f.digits[h] >>> b | (f.digits[k] & lowBitMasks[b]) << g;
    f.digits[f.digits.length - 1] >>>= b;
    f.isNeg = a.isNeg;
    return f
}

function biMultiplyByRadixPower(a, e) {
    var b = new BigInt;
    arrayCopy(a.digits, 0, b.digits, e, b.digits.length - e);
    return b
}

function biDivideByRadixPower(a, e) {
    var b = new BigInt;
    arrayCopy(a.digits, e, b.digits, 0, b.digits.length - e);
    return b
}

function biModuloByRadixPower(a, e) {
    var b = new BigInt;
    arrayCopy(a.digits, 0, b.digits, 0, e);
    return b
}

function biCompare(a, e) {
    if (a.isNeg != e.isNeg) return 1 - 2 * Number(a.isNeg);
    for (var b = a.digits.length - 1; 0 <= b; --b)
        if (a.digits[b] != e.digits[b]) return a.isNeg ? 1 - 2 * Number(a.digits[b] > e.digits[b]) : 1 - 2 * Number(a.digits[b] < e.digits[b]);
    return 0
}

function biDivideModulo(a, e) {
    var b = biNumBits(a),
        f = biNumBits(e),
        g = e.isNeg,
        h, k;
    if (b < f) return a.isNeg ? (h = biCopy(bigOne), h.isNeg = !e.isNeg, a.isNeg = !1, e.isNeg = !1, k = biSubtract(e, a), a.isNeg = !0, e.isNeg = g) : (h = new BigInt, k = biCopy(a)), [h, k];
    h = new BigInt;
    k = a;
    for (var l = Math.ceil(f / bitsPerDigit) - 1, m = 0; e.digits[l] < biHalfRadix;) e = biShiftLeft(e, 1), ++m, ++f, l = Math.ceil(f / bitsPerDigit) - 1;
    k = biShiftLeft(k, m);
    b = Math.ceil((b + m) / bitsPerDigit) - 1;
    for (f = biMultiplyByRadixPower(e, b - l); - 1 != biCompare(k, f);) ++h.digits[b - l], k = biSubtract(k,
        f);
    for (; b > l; --b) {
        var f = b >= k.digits.length ? 0 : k.digits[b],
            n = b - 1 >= k.digits.length ? 0 : k.digits[b - 1],
            o = b - 2 >= k.digits.length ? 0 : k.digits[b - 2],
            v = l >= e.digits.length ? 0 : e.digits[l],
            B = l - 1 >= e.digits.length ? 0 : e.digits[l - 1];
        h.digits[b - l - 1] = f == v ? maxDigitVal : Math.floor((f * biRadix + n) / v);
        for (var q = h.digits[b - l - 1] * (v * biRadix + B), w = f * biRadixSquared + (n * biRadix + o); q > w;) --h.digits[b - l - 1], q = h.digits[b - l - 1] * (v * biRadix | B), w = f * biRadix * biRadix + (n * biRadix + o);
        f = biMultiplyByRadixPower(e, b - l - 1);
        k = biSubtract(k, biMultiplyDigit(f, h.digits[b -
            l - 1]));
        k.isNeg && (k = biAdd(k, f), --h.digits[b - l - 1])
    }
    k = biShiftRight(k, m);
    h.isNeg = a.isNeg != g;
    a.isNeg && (h = g ? biAdd(h, bigOne) : biSubtract(h, bigOne), e = biShiftRight(e, m), k = biSubtract(e, k));
    if (0 == k.digits[0] && 0 == biHighIndex(k)) k.isNeg = !1;
    return [h, k]
}

function biDivide(a, e) {
    return biDivideModulo(a, e)[0]
}

function biModulo(a, e) {
    return biDivideModulo(a, e)[1]
}

function biMultiplyMod(a, e, b) {
    return biModulo(biMultiply(a, e), b)
}

function biPow(a, e) {
    for (var b = bigOne, f = a;;) {
        0 != (e & 1) && (b = biMultiply(b, f));
        e >>= 1;
        if (0 == e) break;
        f = biMultiply(f, f)
    }
    return b
}

function biPowMod(a, e, b) {
    for (var f = bigOne;;) {
        0 != (e.digits[0] & 1) && (f = biMultiplyMod(f, a, b));
        e = biShiftRight(e, 1);
        if (0 == e.digits[0] && 0 == biHighIndex(e)) break;
        a = biMultiplyMod(a, a, b)
    }
    return f
}

function BarrettMu(a) {
    this.modulus = biCopy(a);
    this.k = biHighIndex(this.modulus) + 1;
    a = new BigInt;
    a.digits[2 * this.k] = 1;
    this.mu = biDivide(a, this.modulus);
    this.bkplus1 = new BigInt;
    this.bkplus1.digits[this.k + 1] = 1;
    this.modulo = BarrettMu_modulo;
    this.multiplyMod = BarrettMu_multiplyMod;
    this.powMod = BarrettMu_powMod
}

function BarrettMu_modulo(a) {
    var e = biDivideByRadixPower(a, this.k - 1),
        e = biMultiply(e, this.mu),
        e = biDivideByRadixPower(e, this.k + 1),
        a = biModuloByRadixPower(a, this.k + 1),
        e = biMultiply(e, this.modulus),
        e = biModuloByRadixPower(e, this.k + 1),
        a = biSubtract(a, e);
    a.isNeg && (a = biAdd(a, this.bkplus1));
    for (e = 0 <= biCompare(a, this.modulus); e;) a = biSubtract(a, this.modulus), e = 0 <= biCompare(a, this.modulus);
    return a
}

function BarrettMu_multiplyMod(a, e) {
    return this.modulo(biMultiply(a, e))
}

function BarrettMu_powMod(a, e) {
    var b = new BigInt;
    b.digits[0] = 1;
    for (var f = a, g = e;;) {
        0 != (g.digits[0] & 1) && (b = this.multiplyMod(b, f));
        g = biShiftRight(g, 1);
        if (0 == g.digits[0] && 0 == biHighIndex(g)) break;
        f = this.multiplyMod(f, f)
    }
    return b
}

function RSAKeyPair(a, e) {
    this.e = biFromHex(a);
    this.m = biFromHex(e);
    this.chunkSize = 2 * biHighIndex(this.m);
    this.radix = 16;
    this.barrett = new BarrettMu(this.m)
}

function twoDigit(a) {
    return (10 > a ? "0" : "") + ("" + a)
}

function encryptedString(a, e) {
    for (var b = e.length, f = "", g = 0; g < b; g += a.chunkSize) {
        for (var h = new BigInt, k = Math.min(b - g, a.chunkSize), l = 0; l < k; l += 2) {
            var m = k - l - 1,
                m = (m - m % 2) / 2,
                n = e.charCodeAt(l + g) << 8,
                o = 0;
            l + 1 < k && (o = e.charCodeAt(l + g + 1));
            h.digits[m] = n + o
        }
        h = a.barrett.powMod(h, a.e);
        h = 16 == a.radix ? biToHex(h) : biToString(h, a.radix);
        "" != f && (f += "l");
        f += h
    }
    return f
}

function decryptedString(a, e) {
    var b = e.split("l"),
        f = "",
        g, h, k;
    for (g = 0; g < b.length; ++g) {
        h = 16 == a.radix ? biFromHex(b[g]) : biFromString(b[g], a.radix);
        k = a.barrett.powMod(h, a.e);
        for (h = biHighIndex(k); 0 <= h; h--) f += String.fromCharCode(k.digits[h] >> 8), f += String.fromCharCode(k.digits[h] & 255)
    }
    return f
}

function fcEncode(a, e) {
    for (var b = "", f = 0, g = e.length, h = a.length, k = 0; k < g; k++) 0 < k && (b += "l"), f = f % h + 1, b += Number(e.charCodeAt(k) ^ a.charCodeAt(f - 1));
    return b
}

function fcDecode(a, e) {
    var b = "",
        f = e.split("l"),
        g = 0,
        h = f.length,
        k = a.length;
    for (x = 0; x < h; x++) var g = g % k + 1,
        l = Number(f[x]) ^ a.charCodeAt(g - 1),
        b = b + String.fromCharCode(l);
    return b
}

function genFCKey() {
    for (var a = "", e = 0; 64 > e; e++) var b = Math.random(),
        b = parseInt("" + 1E3 * b),
        b = b % 94 + 33,
        b = String.fromCharCode(b),
        a = a + b;
    return a
}

function getEncryptedMsgWithRsaKeyPair(a, e, b) {
    a = new RSAKeyPair(a, e);
    return encryptedByPublicKeyString(a, b)
}
var HOST = "127.0.0.1",
    PORT = 35555,
    MY_PUBKEY_STR, MY_HASH_KEY, MY_PUBKEY, FLASH_ID = "topcmm_flashchat";
if (!isSupportFlash()) {
    var my_domain = "";
    if (void 0 == my_domain || "" == my_domain) my_domain = getShortDomain();
    document.domain = my_domain;
    var swfElement = document.getElementById(FLASH_ID);
    swfElement && swfElement.parentNode.removeChild(swfElement)
}

function isIP(a) {
    var e = !1;
    if (0 < a.length) try {
        var b = a.split(".");
        if (4 != b.length) e = !1;
        else {
            for (a = 0; a < b.length; a++)
                if (!isIntegerInRange(b[a], 0, 255)) {
                    e = !1;
                    break
                }
            e = !0
        }
    } catch (f) {
        e = !1
    } else e = !1;
    return e
}

function isIntegerInRange(a, e, b) {
    if (isEmpty(a)) return 1 == isIntegerInRange.arguments.length ? !1 : !0 == isIntegerInRange.arguments[1];
    if (!isInteger(a, !1)) return !1;
    a = parseInt(a);
    return a >= e && a <= b
}

function isInteger(a) {
    var e;
    if (isEmpty(a)) return 1 == isInteger.arguments.length ? 0 : !0 == isInteger.arguments[1];
    for (e = 0; e < a.length; e++) {
        var b = a.charAt(e);
        if (!isDigit(b)) return !1
    }
    return !0
}

function isEmpty(a) {
    return null == a || 0 == a.length
}

function isDigit(a) {
    return "0" <= a && "9" >= a
}

function getDomain() {
    var a = "";
    try {
        hostStr = window.location.host, a = -1 == hostStr.indexOf(":") ? hostStr : hostStr.substring(0, hostStr.indexOf(":"))
    } catch (e) {
        a = ""
    }
    return a
}

function getShortDomain() {
    var a = "";
    try {
        if (hostStr = window.location.host, a = -1 == hostStr.indexOf(":") ? hostStr : hostStr.substring(0, hostStr.indexOf(":")), !isIP(a)) {
            var e = a.split(".");
            2 < e.length && (a = e[e.length - 2] + "." + e[e.length - 1])
        }
    } catch (b) {
        a = ""
    }
    return a
}

function getMovie(a) {
    try {
        return isIE() ? window[a] : document[a]
    } catch (e) {}
}

function isIE() {
    return -1 != getUserAgent().indexOf("msie")
}

function getLanguage() {
    return isIE() ? navigator.browserLanguage : navigator.language
}

function isMobile() {
    return null != navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(BlackBerry)|(webOS)/i)
}

function getUserAgent() {
    return navigator.userAgent.toLowerCase()
}

function isSupportFlash() {
    var a = !1;
    if (!isMobile()) try {
        if (navigator.plugins && 0 < navigator.plugins.length) {
            var e = navigator.plugins["Shockwave Flash"];
            e && (a = !0)
        }
        a || (e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) && (a = !0)
    } catch (b) {
        a = !1
    }
    return a
}

function flashConnect(a, e) {
    var b = getMovie(FLASH_ID);
    return void 0 == b || void 0 == b.connect ? !1 : b.connect(a, e)
}

function flashSendMessage(a) {
    getMovie(FLASH_ID).sendMessage(a)
}

function flashClose(a) {
    var e = getMovie(FLASH_ID);
    if (void 0 == e || void 0 == e.connect) return !1;
    "function" === typeof e.close && e.close(a)
}

function httpConnect(a, e) {
    HOST = a;
    PORT = e;
    onConnected();
    return !0
}

function httpSendMessage(a) {
    message = a + "0";
    message = encodeURIComponent(encodeURIComponent(message));
    var a = Math.floor(999999999999 * Math.random()),
        e = "http://" + HOST + ":" + PORT + "/123flashchat_" + a,
        b = "protocol=" + message;
    0 == message.indexOf("%253CInit") ? J(e, b, "l") : J(e, b, "s" + a)
}

function c(a) {
    var e = null,
        b = a + "_div";
    if (document.getElementById(a)) return document.getElementById(a);
    try {
        var f = document.createElement("iframe");
        f.setAttribute("id", a);
        f.setAttribute("name", a);
        f.setAttribute("style", "border-width:0;height:0;width:0;visibility:hidden;");
        var g = document.createElement("div");
        g.setAttribute("id", b);
        g.setAttribute("style", "position:absolute;top:0;left:0;width:0;height:0;overflow:hidden;");
        g.appendChild(f);
        document.body.appendChild(g);
        "undefined" != typeof document.frames &&
            (e = document.frames[a]);
        if (!e || "undefined" == typeof e.nodeType) e = document.getElementById(a)
    } catch (h) {
        f = '<iframe id="' + a + '" name="' + a + '" style="border-width:0;height:0;width:0;visibility:hidden;"></iframe>', document.getElementById(b) ? document.getElementById(b).innerHTML = f : (g = document.createElement("div"), g.setAttribute("id", b), g.setAttribute("style", "position:absolute;top:0;left:0;width:0;height:0;overflow:hidden;"), g.innerHTML = f, document.getElementsByTagName("DIV")[0].appendChild(g)), e = document.getElementById(a)
    }
    e.onreadystatechange =
        function() {
            "complete" == e.readyState && (d(e), e.parentNode.removeChild(e))
        };
    return e
}

function J(a, e, b) {
    try {
        var a = a + "?" + e,
            f = c(b),
            g = d(f)
    } catch (h) {}
    try {
        g.location ? g.location.replace(a) : g.location = a
    } catch (k) {
        f.src = a
    }
}

function d(a) {
    if (a.contentDocument) return a.contentDocument;
    if (a.contentWindow) return a.contentWindow.document;
    if (a.document) return a.document
}

function I(a) {
    receiveMessage(a)
}

function setPublicKey(a) {
    MY_PUBKEY_STR = a;
    MY_HASH_KEY = genFCKey();
    MY_PUBKEY = new RSAKeyPair("11", MY_PUBKEY_STR)
}

function getSK(a, e) {
    MY_PUBKEY_STR = a;
    MY_PUBKEY = new RSAKeyPair("11", MY_PUBKEY_STR);
    return encryptedString(MY_PUBKEY, e)
}

function encryptPassword(a) {
    return encryptedString(MY_PUBKEY, a)
}

function encryptPasswordByPublicKey(a, e) {
    var b = new RSAKeyPair("11", e);
    return encryptedString(b, a)
}

function encodeMessage(a, e) {
    return "" == e || void 0 == e ? fcEncode(MY_HASH_KEY, a) : fcEncode(e, a)
}

function decodeMessage(a, e) {
    var b = "",
        b = "" == e || void 0 == e ? fcDecode(MY_HASH_KEY, a) : fcDecode(e, a);
    return b.split("\\").join("\\\\")
}

function encryptWithRsaKeyPair(a, e, b) {
    return getEncryptedMsgWithRsaKeyPair(a, e, b)
}

function getEncryptedMsgWithRsaKeyPair(a, e, b) {
    a = new RSAKeyPair(a, e);
    return encryptedString(a, b)
}

function encryptedByRealPublicKeyWithRSAKeyString(a, e, b) {
    var f = new RSAKey;
    f.setPublic(a, e);
    return (a = f.encrypt(b)) ? linebrk(a, 64) : null
}
var dbits, canary = 244837814094590,
    j_lm = 15715070 == (canary & 16777215);

function BigInteger(a, e, b) {
    null != a && ("number" == typeof a ? this.fromNumber(a, e, b) : null == e && "string" != typeof a ? this.fromString(a, 256) : this.fromString(a, e))
}

function nbi() {
    return new BigInteger(null)
}

function am1(a, e, b, f, g, h) {
    for (; 0 <= --h;) {
        var k = e * this[a++] + b[f] + g,
            g = Math.floor(k / 67108864);
        b[f++] = k & 67108863
    }
    return g
}

function am2(a, e, b, f, g, h) {
    for (var k = e & 32767, e = e >> 15; 0 <= --h;) {
        var l = this[a] & 32767,
            m = this[a++] >> 15,
            n = e * l + m * k,
            l = k * l + ((n & 32767) << 15) + b[f] + (g & 1073741823),
            g = (l >>> 30) + (n >>> 15) + e * m + (g >>> 30);
        b[f++] = l & 1073741823
    }
    return g
}

function am3(a, e, b, f, g, h) {
    for (var k = e & 16383, e = e >> 14; 0 <= --h;) {
        var l = this[a] & 16383,
            m = this[a++] >> 14,
            n = e * l + m * k,
            l = k * l + ((n & 16383) << 14) + b[f] + g,
            g = (l >> 28) + (n >> 14) + e * m;
        b[f++] = l & 268435455
    }
    return g
}
j_lm && "Microsoft Internet Explorer" == navigator.appName ? (BigInteger.prototype.am = am2, dbits = 30) : j_lm && "Netscape" != navigator.appName ? (BigInteger.prototype.am = am1, dbits = 26) : (BigInteger.prototype.am = am3, dbits = 28);
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = (1 << dbits) - 1;
BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz",
    BI_RC = [],
    rr, vv;
rr = 48;
for (vv = 0; 9 >= vv; ++vv) BI_RC[rr++] = vv;
rr = 97;
for (vv = 10; 36 > vv; ++vv) BI_RC[rr++] = vv;
rr = 65;
for (vv = 10; 36 > vv; ++vv) BI_RC[rr++] = vv;

function int2char(a) {
    return BI_RM.charAt(a)
}

function intAt(a, e) {
    var b = BI_RC[a.charCodeAt(e)];
    return null == b ? -1 : b
}

function bnpCopyTo(a) {
    for (var e = this.t - 1; 0 <= e; --e) a[e] = this[e];
    a.t = this.t;
    a.s = this.s
}

function bnpFromInt(a) {
    this.t = 1;
    this.s = 0 > a ? -1 : 0;
    0 < a ? this[0] = a : -1 > a ? this[0] = a + DV : this.t = 0
}

function nbv(a) {
    var e = nbi();
    e.fromInt(a);
    return e
}

function bnpFromString(a, e) {
    var b;
    if (16 == e) b = 4;
    else if (8 == e) b = 3;
    else if (256 == e) b = 8;
    else if (2 == e) b = 1;
    else if (32 == e) b = 5;
    else if (4 == e) b = 2;
    else {
        this.fromRadix(a, e);
        return
    }
    this.s = this.t = 0;
    for (var f = a.length, g = !1, h = 0; 0 <= --f;) {
        var k = 8 == b ? a[f] & 255 : intAt(a, f);
        0 > k ? "-" == a.charAt(f) && (g = !0) : (g = !1, 0 == h ? this[this.t++] = k : h + b > this.DB ? (this[this.t - 1] |= (k & (1 << this.DB - h) - 1) << h, this[this.t++] = k >> this.DB - h) : this[this.t - 1] |= k << h, h += b, h >= this.DB && (h -= this.DB))
    }
    if (8 == b && 0 != (a[0] & 128)) this.s = -1, 0 < h && (this[this.t - 1] |= (1 <<
        this.DB - h) - 1 << h);
    this.clamp();
    g && BigInteger.ZERO.subTo(this, this)
}

function bnpClamp() {
    for (var a = this.s & this.DM; 0 < this.t && this[this.t - 1] == a;) --this.t
}

function bnToString(a) {
    if (0 > this.s) return "-" + this.negate().toString(a);
    if (16 == a) a = 4;
    else if (8 == a) a = 3;
    else if (2 == a) a = 1;
    else if (32 == a) a = 5;
    else if (4 == a) a = 2;
    else return this.toRadix(a);
    var e = (1 << a) - 1,
        b, f = !1,
        g = "",
        h = this.t,
        k = this.DB - h * this.DB % a;
    if (0 < h--) {
        if (k < this.DB && 0 < (b = this[h] >> k)) f = !0, g = int2char(b);
        for (; 0 <= h;) k < a ? (b = (this[h] & (1 << k) - 1) << a - k, b |= this[--h] >> (k += this.DB - a)) : (b = this[h] >> (k -= a) & e, 0 >= k && (k += this.DB, --h)), 0 < b && (f = !0), f && (g += int2char(b))
    }
    return f ? g : "0"
}

function bnNegate() {
    var a = nbi();
    BigInteger.ZERO.subTo(this, a);
    return a
}

function bnAbs() {
    return 0 > this.s ? this.negate() : this
}

function bnCompareTo(a) {
    var e = this.s - a.s;
    if (0 != e) return e;
    var b = this.t,
        e = b - a.t;
    if (0 != e) return 0 > this.s ? -e : e;
    for (; 0 <= --b;)
        if (0 != (e = this[b] - a[b])) return e;
    return 0
}

function nbits(a) {
    var e = 1,
        b;
    if (0 != (b = a >>> 16)) a = b, e += 16;
    if (0 != (b = a >> 8)) a = b, e += 8;
    if (0 != (b = a >> 4)) a = b, e += 4;
    if (0 != (b = a >> 2)) a = b, e += 2;
    0 != a >> 1 && (e += 1);
    return e
}

function bnBitLength() {
    return 0 >= this.t ? 0 : this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM)
}

function bnpDLShiftTo(a, e) {
    var b;
    for (b = this.t - 1; 0 <= b; --b) e[b + a] = this[b];
    for (b = a - 1; 0 <= b; --b) e[b] = 0;
    e.t = this.t + a;
    e.s = this.s
}

function bnpDRShiftTo(a, e) {
    for (var b = a; b < this.t; ++b) e[b - a] = this[b];
    e.t = Math.max(this.t - a, 0);
    e.s = this.s
}

function bnpLShiftTo(a, e) {
    var b = a % this.DB,
        f = this.DB - b,
        g = (1 << f) - 1,
        h = Math.floor(a / this.DB),
        k = this.s << b & this.DM,
        l;
    for (l = this.t - 1; 0 <= l; --l) e[l + h + 1] = this[l] >> f | k, k = (this[l] & g) << b;
    for (l = h - 1; 0 <= l; --l) e[l] = 0;
    e[h] = k;
    e.t = this.t + h + 1;
    e.s = this.s;
    e.clamp()
}

function bnpRShiftTo(a, e) {
    e.s = this.s;
    var b = Math.floor(a / this.DB);
    if (b >= this.t) e.t = 0;
    else {
        var f = a % this.DB,
            g = this.DB - f,
            h = (1 << f) - 1;
        e[0] = this[b] >> f;
        for (var k = b + 1; k < this.t; ++k) e[k - b - 1] |= (this[k] & h) << g, e[k - b] = this[k] >> f;
        0 < f && (e[this.t - b - 1] |= (this.s & h) << g);
        e.t = this.t - b;
        e.clamp()
    }
}

function bnpSubTo(a, e) {
    for (var b = 0, f = 0, g = Math.min(a.t, this.t); b < g;) f += this[b] - a[b], e[b++] = f & this.DM, f >>= this.DB;
    if (a.t < this.t) {
        for (f -= a.s; b < this.t;) f += this[b], e[b++] = f & this.DM, f >>= this.DB;
        f += this.s
    } else {
        for (f += this.s; b < a.t;) f -= a[b], e[b++] = f & this.DM, f >>= this.DB;
        f -= a.s
    }
    e.s = 0 > f ? -1 : 0; - 1 > f ? e[b++] = this.DV + f : 0 < f && (e[b++] = f);
    e.t = b;
    e.clamp()
}

function bnpMultiplyTo(a, e) {
    var b = this.abs(),
        f = a.abs(),
        g = b.t;
    for (e.t = g + f.t; 0 <= --g;) e[g] = 0;
    for (g = 0; g < f.t; ++g) e[g + b.t] = b.am(0, f[g], e, g, 0, b.t);
    e.s = 0;
    e.clamp();
    this.s != a.s && BigInteger.ZERO.subTo(e, e)
}

function bnpSquareTo(a) {
    for (var e = this.abs(), b = a.t = 2 * e.t; 0 <= --b;) a[b] = 0;
    for (b = 0; b < e.t - 1; ++b) {
        var f = e.am(b, e[b], a, 2 * b, 0, 1);
        if ((a[b + e.t] += e.am(b + 1, 2 * e[b], a, 2 * b + 1, f, e.t - b - 1)) >= e.DV) a[b + e.t] -= e.DV, a[b + e.t + 1] = 1
    }
    0 < a.t && (a[a.t - 1] += e.am(b, e[b], a, 2 * b, 0, 1));
    a.s = 0;
    a.clamp()
}

function bnpDivRemTo(a, e, b) {
    var f = a.abs();
    if (!(0 >= f.t)) {
        var g = this.abs();
        if (g.t < f.t) null != e && e.fromInt(0), null != b && this.copyTo(b);
        else {
            null == b && (b = nbi());
            var h = nbi(),
                k = this.s,
                a = a.s,
                l = this.DB - nbits(f[f.t - 1]);
            0 < l ? (f.lShiftTo(l, h), g.lShiftTo(l, b)) : (f.copyTo(h), g.copyTo(b));
            f = h.t;
            g = h[f - 1];
            if (0 != g) {
                var m = g * (1 << this.F1) + (1 < f ? h[f - 2] >> this.F2 : 0),
                    n = this.FV / m,
                    m = (1 << this.F1) / m,
                    o = 1 << this.F2,
                    v = b.t,
                    B = v - f,
                    q = null == e ? nbi() : e;
                h.dlShiftTo(B, q);
                0 <= b.compareTo(q) && (b[b.t++] = 1, b.subTo(q, b));
                BigInteger.ONE.dlShiftTo(f,
                    q);
                for (q.subTo(h, h); h.t < f;) h[h.t++] = 0;
                for (; 0 <= --B;) {
                    var w = b[--v] == g ? this.DM : Math.floor(b[v] * n + (b[v - 1] + o) * m);
                    if ((b[v] += h.am(0, w, b, B, 0, f)) < w) {
                        h.dlShiftTo(B, q);
                        for (b.subTo(q, b); b[v] < --w;) b.subTo(q, b)
                    }
                }
                null != e && (b.drShiftTo(f, e), k != a && BigInteger.ZERO.subTo(e, e));
                b.t = f;
                b.clamp();
                0 < l && b.rShiftTo(l, b);
                0 > k && BigInteger.ZERO.subTo(b, b)
            }
        }
    }
}

function bnMod(a) {
    var e = nbi();
    this.abs().divRemTo(a, null, e);
    0 > this.s && 0 < e.compareTo(BigInteger.ZERO) && a.subTo(e, e);
    return e
}

function Classic(a) {
    this.m = a
}

function cConvert(a) {
    return 0 > a.s || 0 <= a.compareTo(this.m) ? a.mod(this.m) : a
}

function cRevert(a) {
    return a
}

function cReduce(a) {
    a.divRemTo(this.m, null, a)
}

function cMulTo(a, e, b) {
    a.multiplyTo(e, b);
    this.reduce(b)
}

function cSqrTo(a, e) {
    a.squareTo(e);
    this.reduce(e)
}
Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;

function bnpInvDigit() {
    if (1 > this.t) return 0;
    var a = this[0];
    if (0 == (a & 1)) return 0;
    var e = a & 3,
        e = e * (2 - (a & 15) * e) & 15,
        e = e * (2 - (a & 255) * e) & 255,
        e = e * (2 - ((a & 65535) * e & 65535)) & 65535,
        e = e * (2 - a * e % this.DV) % this.DV;
    return 0 < e ? this.DV - e : -e
}

function Montgomery(a) {
    this.m = a;
    this.mp = a.invDigit();
    this.mpl = this.mp & 32767;
    this.mph = this.mp >> 15;
    this.um = (1 << a.DB - 15) - 1;
    this.mt2 = 2 * a.t
}

function montConvert(a) {
    var e = nbi();
    a.abs().dlShiftTo(this.m.t, e);
    e.divRemTo(this.m, null, e);
    0 > a.s && 0 < e.compareTo(BigInteger.ZERO) && this.m.subTo(e, e);
    return e
}

function montRevert(a) {
    var e = nbi();
    a.copyTo(e);
    this.reduce(e);
    return e
}

function montReduce(a) {
    for (; a.t <= this.mt2;) a[a.t++] = 0;
    for (var e = 0; e < this.m.t; ++e) {
        var b = a[e] & 32767,
            f = b * this.mpl + ((b * this.mph + (a[e] >> 15) * this.mpl & this.um) << 15) & a.DM,
            b = e + this.m.t;
        for (a[b] += this.m.am(0, f, a, e, 0, this.m.t); a[b] >= a.DV;) a[b] -= a.DV, a[++b] ++
    }
    a.clamp();
    a.drShiftTo(this.m.t, a);
    0 <= a.compareTo(this.m) && a.subTo(this.m, a)
}

function montSqrTo(a, e) {
    a.squareTo(e);
    this.reduce(e)
}

function montMulTo(a, e, b) {
    a.multiplyTo(e, b);
    this.reduce(b)
}
Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;

function bnpIsEven() {
    return 0 == (0 < this.t ? this[0] & 1 : this.s)
}

function bnpExp(a, e) {
    if (4294967295 < a || 1 > a) return BigInteger.ONE;
    var b = nbi(),
        f = nbi(),
        g = e.convert(this),
        h = nbits(a) - 1;
    for (g.copyTo(b); 0 <= --h;)
        if (e.sqrTo(b, f), 0 < (a & 1 << h)) e.mulTo(f, g, b);
        else var k = b,
            b = f,
            f = k;
    return e.revert(b)
}

function bnModPowInt(a, e) {
    var b;
    b = 256 > a || e.isEven() ? new Classic(e) : new Montgomery(e);
    return this.exp(a, b)
}
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);

function Arcfour() {
    this.j = this.i = 0;
    this.S = []
}

function ARC4init(a) {
    var e, b, f;
    for (e = 0; 256 > e; ++e) this.S[e] = e;
    for (e = b = 0; 256 > e; ++e) b = b + this.S[e] + a[e % a.length] & 255, f = this.S[e], this.S[e] = this.S[b], this.S[b] = f;
    this.j = this.i = 0
}

function ARC4next() {
    var a;
    this.i = this.i + 1 & 255;
    this.j = this.j + this.S[this.i] & 255;
    a = this.S[this.i];
    this.S[this.i] = this.S[this.j];
    this.S[this.j] = a;
    return this.S[a + this.S[this.i] & 255]
}
Arcfour.prototype.init = ARC4init;
Arcfour.prototype.next = ARC4next;

function prng_newstate() {
    return new Arcfour
}
var rng_psize = 256,
    rng_state, rng_pool, rng_pptr;

function rng_seed_int(a) {
    rng_pool[rng_pptr++] ^= a & 255;
    rng_pool[rng_pptr++] ^= a >> 8 & 255;
    rng_pool[rng_pptr++] ^= a >> 16 & 255;
    rng_pool[rng_pptr++] ^= a >> 24 & 255;
    rng_pptr >= rng_psize && (rng_pptr -= rng_psize)
}

function rng_seed_time() {
    rng_seed_int((new Date).getTime())
}
if (null == rng_pool) {
    rng_pool = [];
    rng_pptr = 0;
    var t;
    if ("Netscape" == navigator.appName && "5" > navigator.appVersion && window.crypto) {
        var z = window.crypto.random(32);
        for (t = 0; t < z.length; ++t) rng_pool[rng_pptr++] = z.charCodeAt(t) & 255
    }
    for (; rng_pptr < rng_psize;) t = Math.floor(65536 * Math.random()), rng_pool[rng_pptr++] = t >>> 8, rng_pool[rng_pptr++] = t & 255;
    rng_pptr = 0;
    rng_seed_time()
}

function rng_get_byte() {
    if (null == rng_state) {
        rng_seed_time();
        rng_state = prng_newstate();
        rng_state.init(rng_pool);
        for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) rng_pool[rng_pptr] = 0;
        rng_pptr = 0
    }
    return rng_state.next()
}

function rng_get_bytes(a) {
    var e;
    for (e = 0; e < a.length; ++e) a[e] = rng_get_byte()
}

function SecureRandom() {}
SecureRandom.prototype.nextBytes = rng_get_bytes;

function parseBigInt(a, e) {
    return new BigInteger(a, e)
}

function linebrk(a, e) {
    for (var b = "", f = 0; f + e < a.length;) b += a.substring(f, f + e) + "\n", f += e;
    return b + a.substring(f, a.length)
}

function byte2Hex(a) {
    return 16 > a ? "0" + a.toString(16) : a.toString(16)
}

function pkcs1pad2(a, e) {
    if (e < a.length + 11) return alert("Message too long for RSA"), null;
    for (var b = [], f = a.length - 1; 0 <= f && 0 < e;) {
        var g = a.charCodeAt(f--);
        128 > g ? b[--e] = g : 127 < g && 2048 > g ? (b[--e] = g & 63 | 128, b[--e] = g >> 6 | 192) : (b[--e] = g & 63 | 128, b[--e] = g >> 6 & 63 | 128, b[--e] = g >> 12 | 224)
    }
    b[--e] = 0;
    f = new SecureRandom;
    for (g = []; 2 < e;) {
        for (g[0] = 0; 0 == g[0];) f.nextBytes(g);
        b[--e] = g[0]
    }
    b[--e] = 2;
    b[--e] = 0;
    return new BigInteger(b)
}

function RSAKey() {
    this.n = null;
    this.e = 0;
    this.coeff = this.dmq1 = this.dmp1 = this.q = this.p = this.d = null
}

function RSASetPublic(a, e) {
    null != a && null != e && 0 < a.length && 0 < e.length ? (this.n = parseBigInt(a, 16), this.e = parseInt(e, 16)) : alert("Invalid RSA public key")
}

function RSADoPublic(a) {
    return a.modPowInt(this.e, this.n)
}

function RSAEncrypt(a) {
    a = pkcs1pad2(a, this.n.bitLength() + 7 >> 3);
    if (null == a) return null;
    a = this.doPublic(a);
    if (null == a) return null;
    a = a.toString(16);
    return 0 == (a.length & 1) ? a : "0" + a
}
RSAKey.prototype.doPublic = RSADoPublic;
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;
(function(a) {
    var e = function() {
            for (var a = [], b = 0; 26 > b; b++) a.push(65 + b);
            for (b = 0; 26 > b; b++) a.push(97 + b);
            for (b = 0; 10 > b; b++) a.push(48 + b);
            a.push(43);
            a.push(47);
            return a
        }(),
        b = function(a) {
            for (var b = {}, e = 0, f = a.length; e < f; e++) b[a.charAt(e)] = e;
            return b
        }("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),
        f = function(a) {
            for (var b = [], e = 0, f = a.length; e < f; e++) b[e] = a.charCodeAt(e);
            return b
        },
        g = function(a) {
            for (var b = 0; a.length % 3;) a.push(0), b++;
            for (var f = [], g = 0, h = a.length; g < h; g += 3) {
                var k = a[g],
                    l = a[g + 1],
                    n =
                    a[g + 2];
                if (256 <= k || 256 <= l || 256 <= n) throw "unsupported character found";
                k = k << 16 | l << 8 | n;
                f.push(e[k >>> 18], e[k >>> 12 & 63], e[k >>> 6 & 63], e[k & 63])
            }
            for (; b--;) f[f.length - b - 1] = 61;
            return w(f)
        },
        h = function(a) {
            for (var a = a.replace(/[^A-Za-z0-9+\/]+/g, ""), e = [], f = a.length % 4, g = 0, h = a.length; g < h; g += 4) {
                var k = (b[a.charAt(g)] || 0) << 18 | (b[a.charAt(g + 1)] || 0) << 12 | (b[a.charAt(g + 2)] || 0) << 6 | (b[a.charAt(g + 3)] || 0);
                e.push(k >> 16, k >> 8 & 255, k & 255)
            }
            e.length -= [0, 0, 2, 1][f];
            return e
        },
        k = function(a) {
            for (var b = [], e = 0, f = a.length; e < f; e++) {
                var g = a[e];
                128 > g ? b.push(g) : 2048 > g ? b.push(192 | g >>> 6, 128 | g & 63) : b.push(224 | g >>> 12 & 15, 128 | g >>> 6 & 63, 128 | g & 63)
            }
            return b
        },
        l = function(a) {
            for (var b = [], e = 0, f = a.length; e < f; e++) {
                var g = a[e];
                if (128 > g) b.push(g);
                else {
                    var h = a[++e];
                    if (224 > g) b.push((g & 31) << 6 | h & 63);
                    else {
                        var k = a[++e];
                        b.push((g & 15) << 12 | (h & 63) << 6 | k & 63)
                    }
                }
            }
            return b
        },
        m = function(a) {
            return g(f(a))
        },
        n = function(a) {
            return w(h(a))
        },
        o = function(a) {
            return w(l(a))
        },
        v = function(a) {
            return w(l(f(a)))
        },
        B = function(a) {
            return k(f(a))
        },
        q = function(a) {
            return w(k(f(a)))
        },
        w = function(a) {
            var b = [],
                e;
            for (e = 0; e < a.length; e += 65536) b.push(String.fromCharCode.apply(String, a.slice(e, e + 65536)));
            return b.join("")
        };
    if (a.btoa) var C = a.btoa,
        H = function(a) {
            return C(q(a))
        };
    else C = m, H = function(a) {
        return g(B(a))
    };
    if (a.atob) var K = a.atob,
        P = function(a) {
            return v(K(a))
        };
    else K = n, P = function(a) {
        return o(h(a))
    };
    a.Base64 = {
        convertUTF8ArrayToBase64: g,
        convertByteArrayToBase64: g,
        convertBase64ToUTF8Array: h,
        convertBase64ToByteArray: h,
        convertUTF16ArrayToUTF8Array: k,
        convertUTF16ArrayToByteArray: k,
        convertUTF8ArrayToUTF16Array: l,
        convertByteArrayToUTF16Array: l,
        convertUTF8StringToBase64: m,
        convertBase64ToUTF8String: n,
        convertUTF8StringToUTF16Array: function(a) {
            return l(f(a))
        },
        convertUTF8ArrayToUTF16String: o,
        convertByteArrayToUTF16String: o,
        convertUTF8StringToUTF16String: v,
        convertUTF16StringToUTF8Array: B,
        convertUTF16StringToByteArray: B,
        convertUTF16ArrayToUTF8String: function(a) {
            return w(k(a))
        },
        convertUTF16StringToUTF8String: q,
        convertUTF16StringToBase64: H,
        convertBase64ToUTF16String: P,
        fromBase64: n,
        toBase64: m,
        atob: K,
        btoa: C,
        utob: q,
        btou: v,
        encode: H,
        encodeURI: function(a) {
            return H(a).replace(/[+\/]/g, function(a) {
                return "+" == a ? "-" : "_"
            }).replace(/=+$/, "")
        },
        decode: function(a) {
            return P(a.replace(/[-_]/g, function(a) {
                return "-" == a ? "+" : "/"
            }))
        }
    }
})(this);
(function() {
    var a, e, b = null,
        f, g, h, k, l, m, n, o, v, B, q, w, C, H, K = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535],
        P = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
        S = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99],
        T = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577],
        U = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
        V = [16, 17, 18, 0, 8, 7, 9, 6, 10,
            5, 11, 4, 12, 3, 13, 2, 14, 1, 15
        ],
        W = function() {
            this.list = this.next = null
        },
        X = function() {
            this.n = this.b = this.e = 0;
            this.t = null
        },
        Q = function(a, b, e, f, g, h) {
            this.BMAX = 16;
            this.N_MAX = 288;
            this.status = 0;
            this.root = null;
            this.m = 0;
            var k = Array(this.BMAX + 1),
                l, r, n, D, p, s, m, q = Array(this.BMAX + 1),
                v, o, w, u = new X,
                A = Array(this.BMAX);
            D = Array(this.N_MAX);
            var y, B = Array(this.BMAX + 1),
                M, N, C;
            C = this.root = null;
            for (p = 0; p < k.length; p++) k[p] = 0;
            for (p = 0; p < q.length; p++) q[p] = 0;
            for (p = 0; p < A.length; p++) A[p] = null;
            for (p = 0; p < D.length; p++) D[p] = 0;
            for (p = 0; p < B.length; p++) B[p] =
                0;
            l = 256 < b ? a[256] : this.BMAX;
            v = a;
            o = 0;
            p = b;
            do k[v[o]] ++, o++; while (0 < --p);
            if (k[0] == b) this.root = null, this.status = this.m = 0;
            else {
                for (s = 1; s <= this.BMAX && !(0 != k[s]); s++);
                m = s;
                h < s && (h = s);
                for (p = this.BMAX; 0 != p && !(0 != k[p]); p--);
                n = p;
                h > p && (h = p);
                for (M = 1 << s; s < p; s++, M <<= 1)
                    if (0 > (M -= k[s])) {
                        this.status = 2;
                        this.m = h;
                        return
                    }
                if (0 > (M -= k[p])) this.status = 2, this.m = h;
                else {
                    k[p] += M;
                    B[1] = s = 0;
                    v = k;
                    o = 1;
                    for (w = 2; 0 < --p;) B[w++] = s += v[o++];
                    v = a;
                    p = o = 0;
                    do
                        if (0 != (s = v[o++])) D[B[s] ++] = p;
                    while (++p < b);
                    b = B[n];
                    B[0] = p = 0;
                    v = D;
                    o = 0;
                    D = -1;
                    y = q[0] = 0;
                    w = null;
                    for (N =
                        0; m <= n; m++)
                        for (a = k[m]; 0 < a--;) {
                            for (; m > y + q[1 + D];) {
                                y += q[1 + D];
                                D++;
                                N = (N = n - y) > h ? h : N;
                                if ((r = 1 << (s = m - y)) > a + 1) {
                                    r -= a + 1;
                                    for (w = m; ++s < N && !((r <<= 1) <= k[++w]);) r -= k[w]
                                }
                                y + s > l && y < l && (s = l - y);
                                N = 1 << s;
                                q[1 + D] = s;
                                w = Array(N);
                                for (r = 0; r < N; r++) w[r] = new X;
                                C = null == C ? this.root = new W : C.next = new W;
                                C.next = null;
                                C.list = w;
                                A[D] = w;
                                if (0 < D) B[D] = p, u.b = q[D], u.e = 16 + s, u.t = w, s = (p & (1 << y) - 1) >> y - q[D], A[D - 1][s].e = u.e, A[D - 1][s].b = u.b, A[D - 1][s].n = u.n, A[D - 1][s].t = u.t
                            }
                            u.b = m - y;
                            o >= b ? u.e = 99 : v[o] < e ? (u.e = 256 > v[o] ? 16 : 15, u.n = v[o++]) : (u.e = g[v[o] - e], u.n = f[v[o++] -
                                e]);
                            r = 1 << m - y;
                            for (s = p >> y; s < N; s += r) w[s].e = u.e, w[s].b = u.b, w[s].n = u.n, w[s].t = u.t;
                            for (s = 1 << m - 1; 0 != (p & s); s >>= 1) p ^= s;
                            for (p ^= s;
                                (p & (1 << y) - 1) != B[D];) y -= q[D], D--
                        }
                    this.m = q[1];
                    this.status = 0 != M && 1 != n ? 1 : 0
                }
            }
        },
        A = function(a) {
            for (; k < a;) h |= (C.length == H ? -1 : C.charCodeAt(H++) & 255) << k, k += 8
        },
        y = function(a) {
            return h & K[a]
        },
        u = function(a) {
            h >>= a;
            k -= a
        },
        R = function(b, f, g) {
            var h, k, m;
            if (0 == g) return 0;
            for (m = 0;;) {
                A(q);
                k = v.list[y(q)];
                for (h = k.e; 16 < h;) {
                    if (99 == h) return -1;
                    u(k.b);
                    h -= 16;
                    A(h);
                    k = k.t[y(h)];
                    h = k.e
                }
                u(k.b);
                if (16 == h) e &= 32767, b[f + m++] =
                    a[e++] = k.n;
                else {
                    if (15 == h) break;
                    A(h);
                    n = k.n + y(h);
                    u(h);
                    A(w);
                    k = B.list[y(w)];
                    for (h = k.e; 16 < h;) {
                        if (99 == h) return -1;
                        u(k.b);
                        h -= 16;
                        A(h);
                        k = k.t[y(h)];
                        h = k.e
                    }
                    u(k.b);
                    A(h);
                    o = e - k.n - y(h);
                    for (u(h); 0 < n && m < g;) n--, o &= 32767, e &= 32767, b[f + m++] = a[e++] = a[o++]
                }
                if (m == g) return g
            }
            l = -1;
            return m
        },
        Y = function(a, b, e) {
            var f, g, h, k, l, m, n, o = Array(316);
            for (f = 0; f < o.length; f++) o[f] = 0;
            A(5);
            m = 257 + y(5);
            u(5);
            A(5);
            n = 1 + y(5);
            u(5);
            A(4);
            f = 4 + y(4);
            u(4);
            if (286 < m || 30 < n) return -1;
            for (g = 0; g < f; g++) A(3), o[V[g]] = y(3), u(3);
            for (; 19 > g; g++) o[V[g]] = 0;
            q = 7;
            g = new Q(o,
                19, 19, null, null, q);
            if (0 != g.status) return -1;
            v = g.root;
            q = g.m;
            k = m + n;
            for (f = h = 0; f < k;)
                if (A(q), l = v.list[y(q)], g = l.b, u(g), g = l.n, 16 > g) o[f++] = h = g;
                else if (16 == g) {
                A(2);
                g = 3 + y(2);
                u(2);
                if (f + g > k) return -1;
                for (; 0 < g--;) o[f++] = h
            } else {
                17 == g ? (A(3), g = 3 + y(3), u(3)) : (A(7), g = 11 + y(7), u(7));
                if (f + g > k) return -1;
                for (; 0 < g--;) o[f++] = 0;
                h = 0
            }
            q = 9;
            g = new Q(o, m, 257, P, S, q);
            if (0 == q) g.status = 1;
            if (0 != g.status) return -1;
            v = g.root;
            q = g.m;
            for (f = 0; f < n; f++) o[f] = o[f + m];
            w = 6;
            g = new Q(o, n, 0, T, U, w);
            B = g.root;
            w = g.m;
            return 0 == w && 257 < m || 0 != g.status ? -1 : R(a, b, e)
        },
        Z = function(C, O, L) {
            var E, G;
            for (E = 0; E < L && !(m && -1 == l);) {
                if (0 < n) {
                    if (0 != l)
                        for (; 0 < n && E < L;) n--, o &= 32767, e &= 32767, C[O + E++] = a[e++] = a[o++];
                    else {
                        for (; 0 < n && E < L;) n--, e &= 32767, A(8), C[O + E++] = a[e++] = y(8), u(8);
                        0 == n && (l = -1)
                    }
                    if (E == L) break
                }
                if (-1 == l) {
                    if (m) break;
                    A(1);
                    0 != y(1) && (m = !0);
                    u(1);
                    A(2);
                    l = y(2);
                    u(2);
                    v = null;
                    n = 0
                }
                switch (l) {
                    case 0:
                        G = C;
                        var H = O + E,
                            K = L - E,
                            F = void 0,
                            F = k & 7;
                        u(F);
                        A(16);
                        F = y(16);
                        u(16);
                        A(16);
                        if (F != (~h & 65535)) G = -1;
                        else {
                            u(16);
                            n = F;
                            for (F = 0; 0 < n && F < K;) n--, e &= 32767, A(8), G[H + F++] = a[e++] = y(8), u(8);
                            0 == n && (l = -1);
                            G = F
                        }
                        break;
                    case 1:
                        if (null !=
                            v) G = R(C, O + E, L - E);
                        else a: {
                            G = C;
                            H = O + E;
                            K = L - E;
                            if (null == b) {
                                for (var r = void 0, F = Array(288), r = void 0, r = 0; 144 > r; r++) F[r] = 8;
                                for (; 256 > r; r++) F[r] = 9;
                                for (; 280 > r; r++) F[r] = 7;
                                for (; 288 > r; r++) F[r] = 8;
                                g = 7;
                                r = new Q(F, 288, 257, P, S, g);
                                if (0 != r.status) {
                                    alert("HufBuild error: " + r.status);
                                    G = -1;
                                    break a
                                }
                                b = r.root;
                                g = r.m;
                                for (r = 0; 30 > r; r++) F[r] = 5;
                                zip_fixed_bd = 5;
                                r = new Q(F, 30, 0, T, U, zip_fixed_bd);
                                if (1 < r.status) {
                                    b = null;
                                    alert("HufBuild error: " + r.status);
                                    G = -1;
                                    break a
                                }
                                f = r.root;
                                zip_fixed_bd = r.m
                            }
                            v = b;
                            B = f;
                            q = g;
                            w = zip_fixed_bd;
                            G = R(G, H, K)
                        }
                        break;
                    case 2:
                        G =
                            null != v ? R(C, O + E, L - E) : Y(C, O + E, L - E);
                        break;
                    default:
                        G = -1
                }
                if (-1 == G) return m ? 0 : -1;
                E += G
            }
            return E
        };
    window.RawDeflate || (RawDeflate = {});
    RawDeflate.inflate = function(b) {
        var f;
        null == a && (a = Array(65536));
        k = h = e = 0;
        l = -1;
        m = !1;
        n = o = 0;
        v = null;
        C = b;
        H = 0;
        for (var g = Array(1024), q = []; 0 < (b = Z(g, 0, g.length));) {
            var u = Array(b);
            for (f = 0; f < b; f++) u[f] = String.fromCharCode(g[f]);
            q[q.length] = u.join("")
        }
        C = null;
        return q.join("")
    }
})();
var hexcase = 0,
    b64pad = "",
    chrsz = 8;

function hex_md5(a) {
    return binl2hex(core_md5(str2binl(a), a.length * chrsz))
}

function b64_md5(a) {
    return binl2b64(core_md5(str2binl(a), a.length * chrsz))
}

function str_md5(a) {
    return binl2str(core_md5(str2binl(a), a.length * chrsz))
}

function hex_hmac_md5(a, e) {
    return binl2hex(core_hmac_md5(a, e))
}

function b64_hmac_md5(a, e) {
    return binl2b64(core_hmac_md5(a, e))
}

function str_hmac_md5(a, e) {
    return binl2str(core_hmac_md5(a, e))
}

function md5_vm_test() {
    return "900150983cd24fb0d6963f7d28e17f72" == hex_md5("abc")
}

function core_md5(a, e) {
    a[e >> 5] |= 128 << e % 32;
    a[(e + 64 >>> 9 << 4) + 14] = e;
    for (var b = 1732584193, f = -271733879, g = -1732584194, h = 271733878, k = 0; k < a.length; k += 16) var l = b,
        m = f,
        n = g,
        o = h,
        b = md5_ff(b, f, g, h, a[k + 0], 7, -680876936),
        h = md5_ff(h, b, f, g, a[k + 1], 12, -389564586),
        g = md5_ff(g, h, b, f, a[k + 2], 17, 606105819),
        f = md5_ff(f, g, h, b, a[k + 3], 22, -1044525330),
        b = md5_ff(b, f, g, h, a[k + 4], 7, -176418897),
        h = md5_ff(h, b, f, g, a[k + 5], 12, 1200080426),
        g = md5_ff(g, h, b, f, a[k + 6], 17, -1473231341),
        f = md5_ff(f, g, h, b, a[k + 7], 22, -45705983),
        b = md5_ff(b, f, g, h, a[k + 8], 7,
            1770035416),
        h = md5_ff(h, b, f, g, a[k + 9], 12, -1958414417),
        g = md5_ff(g, h, b, f, a[k + 10], 17, -42063),
        f = md5_ff(f, g, h, b, a[k + 11], 22, -1990404162),
        b = md5_ff(b, f, g, h, a[k + 12], 7, 1804603682),
        h = md5_ff(h, b, f, g, a[k + 13], 12, -40341101),
        g = md5_ff(g, h, b, f, a[k + 14], 17, -1502002290),
        f = md5_ff(f, g, h, b, a[k + 15], 22, 1236535329),
        b = md5_gg(b, f, g, h, a[k + 1], 5, -165796510),
        h = md5_gg(h, b, f, g, a[k + 6], 9, -1069501632),
        g = md5_gg(g, h, b, f, a[k + 11], 14, 643717713),
        f = md5_gg(f, g, h, b, a[k + 0], 20, -373897302),
        b = md5_gg(b, f, g, h, a[k + 5], 5, -701558691),
        h = md5_gg(h, b, f, g, a[k +
            10], 9, 38016083),
        g = md5_gg(g, h, b, f, a[k + 15], 14, -660478335),
        f = md5_gg(f, g, h, b, a[k + 4], 20, -405537848),
        b = md5_gg(b, f, g, h, a[k + 9], 5, 568446438),
        h = md5_gg(h, b, f, g, a[k + 14], 9, -1019803690),
        g = md5_gg(g, h, b, f, a[k + 3], 14, -187363961),
        f = md5_gg(f, g, h, b, a[k + 8], 20, 1163531501),
        b = md5_gg(b, f, g, h, a[k + 13], 5, -1444681467),
        h = md5_gg(h, b, f, g, a[k + 2], 9, -51403784),
        g = md5_gg(g, h, b, f, a[k + 7], 14, 1735328473),
        f = md5_gg(f, g, h, b, a[k + 12], 20, -1926607734),
        b = md5_hh(b, f, g, h, a[k + 5], 4, -378558),
        h = md5_hh(h, b, f, g, a[k + 8], 11, -2022574463),
        g = md5_hh(g, h, b, f, a[k +
            11], 16, 1839030562),
        f = md5_hh(f, g, h, b, a[k + 14], 23, -35309556),
        b = md5_hh(b, f, g, h, a[k + 1], 4, -1530992060),
        h = md5_hh(h, b, f, g, a[k + 4], 11, 1272893353),
        g = md5_hh(g, h, b, f, a[k + 7], 16, -155497632),
        f = md5_hh(f, g, h, b, a[k + 10], 23, -1094730640),
        b = md5_hh(b, f, g, h, a[k + 13], 4, 681279174),
        h = md5_hh(h, b, f, g, a[k + 0], 11, -358537222),
        g = md5_hh(g, h, b, f, a[k + 3], 16, -722521979),
        f = md5_hh(f, g, h, b, a[k + 6], 23, 76029189),
        b = md5_hh(b, f, g, h, a[k + 9], 4, -640364487),
        h = md5_hh(h, b, f, g, a[k + 12], 11, -421815835),
        g = md5_hh(g, h, b, f, a[k + 15], 16, 530742520),
        f = md5_hh(f, g, h,
            b, a[k + 2], 23, -995338651),
        b = md5_ii(b, f, g, h, a[k + 0], 6, -198630844),
        h = md5_ii(h, b, f, g, a[k + 7], 10, 1126891415),
        g = md5_ii(g, h, b, f, a[k + 14], 15, -1416354905),
        f = md5_ii(f, g, h, b, a[k + 5], 21, -57434055),
        b = md5_ii(b, f, g, h, a[k + 12], 6, 1700485571),
        h = md5_ii(h, b, f, g, a[k + 3], 10, -1894986606),
        g = md5_ii(g, h, b, f, a[k + 10], 15, -1051523),
        f = md5_ii(f, g, h, b, a[k + 1], 21, -2054922799),
        b = md5_ii(b, f, g, h, a[k + 8], 6, 1873313359),
        h = md5_ii(h, b, f, g, a[k + 15], 10, -30611744),
        g = md5_ii(g, h, b, f, a[k + 6], 15, -1560198380),
        f = md5_ii(f, g, h, b, a[k + 13], 21, 1309151649),
        b = md5_ii(b,
            f, g, h, a[k + 4], 6, -145523070),
        h = md5_ii(h, b, f, g, a[k + 11], 10, -1120210379),
        g = md5_ii(g, h, b, f, a[k + 2], 15, 718787259),
        f = md5_ii(f, g, h, b, a[k + 9], 21, -343485551),
        b = safe_add(b, l),
        f = safe_add(f, m),
        g = safe_add(g, n),
        h = safe_add(h, o);
    return [b, f, g, h]
}

function md5_cmn(a, e, b, f, g, h) {
    return safe_add(bit_rol(safe_add(safe_add(e, a), safe_add(f, h)), g), b)
}

function md5_ff(a, e, b, f, g, h, k) {
    return md5_cmn(e & b | ~e & f, a, e, g, h, k)
}

function md5_gg(a, e, b, f, g, h, k) {
    return md5_cmn(e & f | b & ~f, a, e, g, h, k)
}

function md5_hh(a, e, b, f, g, h, k) {
    return md5_cmn(e ^ b ^ f, a, e, g, h, k)
}

function md5_ii(a, e, b, f, g, h, k) {
    return md5_cmn(b ^ (e | ~f), a, e, g, h, k)
}

function core_hmac_md5(a, e) {
    var b = str2binl(a);
    16 < b.length && (b = core_md5(b, a.length * chrsz));
    for (var f = Array(16), g = Array(16), h = 0; 16 > h; h++) f[h] = b[h] ^ 909522486, g[h] = b[h] ^ 1549556828;
    b = core_md5(f.concat(str2binl(e)), 512 + e.length * chrsz);
    return core_md5(g.concat(b), 640)
}

function safe_add(a, e) {
    var b = (a & 65535) + (e & 65535);
    return (a >> 16) + (e >> 16) + (b >> 16) << 16 | b & 65535
}

function bit_rol(a, e) {
    return a << e | a >>> 32 - e
}

function str2binl(a) {
    for (var e = [], b = (1 << chrsz) - 1, f = 0; f < a.length * chrsz; f += chrsz) e[f >> 5] |= (a.charCodeAt(f / chrsz) & b) << f % 32;
    return e
}

function binl2str(a) {
    for (var e = "", b = (1 << chrsz) - 1, f = 0; f < 32 * a.length; f += chrsz) e += String.fromCharCode(a[f >> 5] >>> f % 32 & b);
    return e
}

function binl2hex(a) {
    for (var e = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", b = "", f = 0; f < 4 * a.length; f++) b += e.charAt(a[f >> 2] >> 8 * (f % 4) + 4 & 15) + e.charAt(a[f >> 2] >> 8 * (f % 4) & 15);
    return b
}

function binl2b64(a) {
    for (var e = "", b = 0; b < 4 * a.length; b += 3)
        for (var f = (a[b >> 2] >> 8 * (b % 4) & 255) << 16 | (a[b + 1 >> 2] >> 8 * ((b + 1) % 4) & 255) << 8 | a[b + 2 >> 2] >> 8 * ((b + 2) % 4) & 255, g = 0; 4 > g; g++) e = 8 * b + 6 * g > 32 * a.length ? e + b64pad : e + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(f >> 6 * (3 - g) & 63);
    return e
}

function utf8_decode(strData) { // eslint-disable-line camelcase
    //  discuss at: https://locutus.io/php/utf8_decode/
    // original by: Webtoolkit.info (https://www.webtoolkit.info/)
    //    input by: Aman Gupta
    //    input by: Brett Zamir (https://brett-zamir.me)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Norman "zEh" Fuchs
    // bugfixed by: hitwork
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: kirilloid
    // bugfixed by: w35l3y (https://www.wesley.eti.br)
    //   example 1: utf8_decode('Kevin van Zonneveld')
    //   returns 1: 'Kevin van Zonneveld'

    var tmpArr = []
    var i = 0
    var c1 = 0
    var seqlen = 0

    strData += ''

    while (i < strData.length) {
        c1 = strData.charCodeAt(i) & 0xFF
        seqlen = 0

        // https://en.wikipedia.org/wiki/UTF-8#Codepage_layout
        if (c1 <= 0xBF) {
            c1 = (c1 & 0x7F)
            seqlen = 1
        } else if (c1 <= 0xDF) {
            c1 = (c1 & 0x1F)
            seqlen = 2
        } else if (c1 <= 0xEF) {
            c1 = (c1 & 0x0F)
            seqlen = 3
        } else {
            c1 = (c1 & 0x07)
            seqlen = 4
        }

        for (var ai = 1; ai < seqlen; ++ai) {
            c1 = ((c1 << 0x06) | (strData.charCodeAt(ai + i) & 0x3F))
        }

        if (seqlen === 4) {
            c1 -= 0x10000
            tmpArr.push(String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF)))
            tmpArr.push(String.fromCharCode(0xDC00 | (c1 & 0x3FF)))
        } else {
            tmpArr.push(String.fromCharCode(c1))
        }

        i += seqlen
    }

    return tmpArr.join('')
}
'////////////////////////////////////////////////////////////////////////end pack -code//////////////////////////////////////////////////////////////////////////////////'

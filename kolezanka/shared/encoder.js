var encrypt = function (i, d) {
    if (null == d || 0 >= d.length) return null;
    for (var a = "", b = 0; b < d.length; b++) a += d.charCodeAt(b).toString();
    var b = Math.floor(a.length / 5),
            g = parseInt(a.charAt(b) + a.charAt(2 * b) + a.charAt(3 * b) + a.charAt(4 * b) + a.charAt(5 * b), 10),
            j = Math.ceil(d.length / 2),
            h = Math.pow(2, 31) - 1;
    if (2 > g) return null;
    for (var c = Math.round(1E9 * Math.random()) % 1E8, a = a + c; 10 < a.length;) a = (parseInt(a.substring(0, 10), 10) + parseInt(a.substring(10, a.length), 10)).toString();
    for (a = (g * a + j) % h, e = "", f = "", b = 0; b < i.length; b++) e = parseInt(i.charCodeAt(b) ^ Math.floor(255 * (a / h)), 10), f = 16 > e ? f + ("0" + e.toString(16)) : f + e.toString(16), a = (g * a + j) % h;
    for (c = c.toString(16); 8 > c.length;) c = "0" + c;
    return f + c
};
var decrypt = function (c, e) {
    if (null == c || 8 > c.length) return null;
    if (null == e || 0 >= e.length) return null;
    for (var a = "", b = 0; b < e.length; b++) a += e.charCodeAt(b).toString();
    for (d = Math.floor(a.length / 5), d = parseInt(a.charAt(d) + a.charAt(2 * d) + a.charAt(3 * d) + a.charAt(4 * d) + a.charAt(5 * d), 10), h = Math.round(e.length / 2), f = Math.pow(2, 31) - 1, b = parseInt(c.substring(c.length - 8, c.length), 16), c = c.substring(0, c.length - 8), a += b; 10 < a.length;) a = (parseInt(a.substring(0, 10), 10) + parseInt(a.substring(10, a.length), 10)).toString();
    for (var a = (d * a + h) % f, i = "", g = "", b = 0; b < c.length; b += 2) i = parseInt(parseInt(c.substring(b, b + 2), 16) ^ Math.floor(255 * (a / f)), 10), g += String.fromCharCode(i), a = (d * a + h) % f;
    return g
};

key = "secret"

var Bits = 512;

exports("DecipherSource", (message, key) => {
    let rsaKey = cryptico.generateRSAKey("hama_"+key, Bits)
    let DecryptionResult = cryptico.decrypt(message, rsaKey)
    return decodeURI(DecryptionResult.plaintext)
    // return decrypt(decodeURI(message), "japierdole_ale_kluczyk_"+key)
})

if(IsDuplicityVersion()) {
    const luamin = require("./server/luamin");
    exports("CipherSource", (message, key) => {
        let rsaKey = cryptico.generateRSAKey("hama_"+key, Bits)
        let minifiedMessage = luamin.minify(message)
        let EncryptionResult = cryptico.encrypt(encodeURI(minifiedMessage), cryptico.publicKeyString(rsaKey))
        return EncryptionResult.cipher
        // return encrypt(encodeURI(message), "japierdole_ale_kluczyk_"+key) 
    })
}
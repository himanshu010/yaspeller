var yaspeller = require('../lib/yaspeller'),
    assert = require('chai').assert,
    fs = require('fs'),
    url404 = 'https://raw.githubusercontent.com/asd9qi9e91ke9k2k193k19',
    urlGH = 'https://raw.githubusercontent.com/hcodes/yaspeller/master/test/texts/',
    getFile = function(name) {
        return fs.readFileSync(name).toString('utf-8');
    };

describe('API', function() {
    it('checkFile', function(done) {
        yaspeller.checkFile('./test/texts/repeat_words.txt', function(err, data) {
            assert.equal(err, false);
            assert.equal(data.data.length, 2);
            done();
        }, {lang: 'ru', format: 'plain'});
    });

    it('checkFile with window 1251', function(done) {
        yaspeller.checkFile('./test/texts/repeat_words_win1251.txt', function(err, data) {
            assert.equal(err, true);
            done();
        });
    });

    it('checkFile with unknow file', function(done) {
        yaspeller.checkFile('./test/texts/unknow.txt', function(err, data) {
            assert.equal(err, true);
            done();
        });
    });

    it('checkFile with dir', function(done) {
        yaspeller.checkFile('./test/texts/checkdir', function(err, data) {
            assert.equal(err, true);
            done();
        });
    });

    it('checkFile without settings', function(done) {
        yaspeller.checkFile('./test/texts/repeat_words.txt', function(err, data) {
            assert.equal(err, false);
            assert.equal(data.data.length, 2);
            done();
        });
    });

    yaspeller.setParams({
        fileExtensions: ['txt']
    });

    it('checkDir', function(done) {
        yaspeller.checkDir('./test/texts/checkdir', function(data) {
            data.forEach(function(el) {
                assert.equal(el[0], false);
                assert.equal(el[1].data.length, 2);
            });
            done();
        });
    });

    it('checkDir with unknow dir', function(done) {
        yaspeller.checkDir('./test/texts/unknowndir', function(data) {
            data.forEach(function(el) {
                assert.equal(el[0], true);
            });
            done();
        });
    });

    it('checkDir as file', function(done) {
        yaspeller.checkDir('./test/texts/repeat_words.txt', function(data) {
            data.forEach(function(el) {
                assert.equal(el[0], false);
                assert.equal(el[1].data.length, 2);
            });
            done();
        });
    });

    it('checkUrl', function(done) {
        yaspeller.checkUrl(urlGH + 'repeat_words.txt', function(err, data) {
            assert.equal(err, false);
            assert.equal(data.data.length, 2);
            done();
        });
    });

    it('checkUrl 404', function(done) {
        yaspeller.checkUrl(url404, function(err, data) {
            assert.equal(err, true);
            done();
        });
    });

    it('checkSitemap 404', function(done) {
        yaspeller.checkSitemap(urlGH + 'unknow_sitemap.xml', function(data) {
            assert.equal(data[0][0], true);
            done();
        });
    });

    it('checkSitemap incorrect', function(done) {
        yaspeller.checkSitemap(urlGH + 'incorrect_sitemap.xml', function(data) {
            assert.equal(data[0][0], true);
            done();
        });
    });

    it('checkSitemap', function(done) {
        yaspeller.checkSitemap(urlGH + 'sitemap.xml', function(data) {
            data.forEach(function(el) {
                assert.equal(el[0], false);
                assert.equal(el[1].data.length, 2);
            });
            done();
        });
    });

    it('checkText', function(done) {
        var text = fs.readFileSync('./test/texts/repeat_words.txt').toString('utf-8');
        yaspeller.checkText(text, function(err, data) {
            assert.equal(err, false);
            assert.equal(data.length, 2);
            done();
        }, {lang: 'ru', format: 'plain'});
    });

    describe('Options', function() {
        it('ignoreUppercase on', function(done) {
            var text = getFile('./test/texts/ignore_uppercase.txt');
            yaspeller.checkText(text, function(err, data) {
                assert.equal(err, false);
                assert.equal(data.length, 0);
                done();
            }, {lang: 'ru', format: 'plain', options: {ignoreUppercase: true}});
        });
        
        it('ignoreUppercase off', function(done) {
            var text = getFile('./test/texts/ignore_uppercase.txt');
            yaspeller.checkText(text, function(err, data) {
                assert.equal(err, false);
                assert.equal(data.length, 1);
                done();
            }, {lang: 'ru', format: 'plain'});
        });
        
        it('ignoreDigits on', function(done) {
            var text = getFile('./test/texts/ignore_digits.txt');
            yaspeller.checkText(text, function(err, data) {
                assert.equal(err, false);
                assert.equal(data.length, 0);
                done();
            }, {lang: 'ru', format: 'plain', options: {ignoreDigits: true}});
        });
        
        it('ignoreDigits off', function(done) {
            var text = getFile('./test/texts/ignore_digits.txt');
            yaspeller.checkText(text, function(err, data) {
                assert.equal(err, false);
                assert.equal(data.length, 1);
                done();
            }, {lang: 'ru', format: 'plain'});
        });
        
        it('ignoreLatin on', function(done) {
            var text = getFile('./test/texts/ignore_latin.txt');
            yaspeller.checkText(text, function(err, data) {
                assert.equal(err, false);
                assert.equal(data.length, 0);
                done();
            }, {lang: 'en,ru', format: 'plain', options: {ignoreLatin: true}});
        });
        
        it('ignoreLatin off', function(done) {
            var text = getFile('./test/texts/ignore_latin.txt');
            yaspeller.checkText(text, function(err, data) {
                assert.equal(err, false);
                assert.equal(data.length, 1);
                done();
            }, {lang: 'en,ru', format: 'plain'});
        });        
        
        it('ignoreUrls on', function(done) {
            var text = getFile('./test/texts/ignore_urls.txt');
            yaspeller.checkText(text, function(err, data) {
                assert.equal(err, false);
                assert.equal(data.length, 0);
                done();
            }, {lang: 'en,ru', format: 'plain', options: {ignoreUrls: true}});
        });
        
        it('ignoreUrls off', function(done) {
            var text = getFile('./test/texts/ignore_urls.txt');
            yaspeller.checkText(text, function(err, data) {
                assert.equal(err, false);
                assert.equal(data.length, 2);
                done();
            }, {lang: 'en,ru', format: 'plain'});
        });
        
        it('ignoreCapitalization on', function(done) {
            var text = getFile('./test/texts/ignore_capitalization.txt');
            yaspeller.checkText(text, function(err, data) {
                assert.equal(err, false);
                assert.equal(data.length, 0);
                done();
            }, {lang: 'ru', format: 'plain', options: {ignoreCapitalization: true}});
        });
        
        it('ignoreCapitalization off', function(done) {
            var text = getFile('./test/texts/ignore_capitalization.txt');
            yaspeller.checkText(text, function(err, data) {
                assert.equal(err, false);
                assert.equal(data.length, 1);
                done();
            }, {lang: 'ru', format: 'plain'});
        });        
    
        it('findRepeatWords on', function(done) {
            var text = getFile('./test/texts/find_repeat_words.txt');
            yaspeller.checkText(text, function(err, data) {
                assert.equal(err, false);
                assert.equal(data.length, 1);
                done();
            }, {lang: 'ru', format: 'plain', options: {findRepeatWords: true}});
        });
        
        it('findRepeatWords off', function(done) {
            var text = getFile('./test/texts/find_repeat_words.txt');
            yaspeller.checkText(text, function(err, data) {
                assert.equal(err, false);
                assert.equal(data.length, 0);
                done();
            }, {lang: 'ru', format: 'plain'});
        });

        it('ignoreRomanNumerals on', function(done) {
            var text = getFile('./test/texts/ignore_roman_numerals.txt');
            yaspeller.checkText(text, function(err, data) {
                assert.equal(err, false);
                assert.equal(data.length, 0);
                done();
            }, {lang: 'en,ru', format: 'plain', options: {ignoreRomanNumerals: true}});
        });
        
        it('ignoreRomanNumerals off', function(done) {
            var text = getFile('./test/texts/ignore_roman_numerals.txt');
            yaspeller.checkText(text, function(err, data) {
                assert.equal(err, false);
                assert.equal(data.length, 1);
                done();
            }, {lang: 'en,ru', format: 'plain'});
        });
        
        it('flagLatin on', function(done) {
            var text = getFile('./test/texts/flag_latin.txt');
            yaspeller.checkText(text, function(err, data) {
            console.log(err,data);
                assert.equal(err, false);
                assert.equal(data.length, 1);
                done();
            }, {lang: 'ru', format: 'plain', options: {flagLatin: true}});
        });
        
        it('flagLatin off', function(done) {
            var text = getFile('./test/texts/flag_latin.txt');
            yaspeller.checkText(text, function(err, data) {
                console.log(err,data);
                assert.equal(err, false);
                assert.equal(data.length, 0);
                done();
            }, {lang: 'ru', format: 'plain'});
        });
    });
});

// Generated by CoffeeScript 1.6.3
(function() {
  var BigBuffer, KB, MB, bb, fs, testFile;

  require("should");

  BigBuffer = require("../lib/bigBuffer.coffee");

  fs = require("fs");

  KB = 1024;

  MB = 1024 * KB;

  bb = null;

  testFile = "./500M";

  describe("test bigbuffer", function() {
    it("create test file", function(done) {
      var GB, buff, fd, filename, size, str;
      return;
      console.log("!!!!");
      console.log(done, "~~~");
      KB = 1024;
      MB = 1024 * KB;
      GB = 1024 * MB;
      filename = testFile;
      size = 5 * MB;
      str = new Array(MB).join("0123456789");
      buff = new Buffer(str);
      fd = fs.openSync(filename, "w");
      while (size > 0) {
        fs.writeSync(fd, buff, 0, str.length, null);
        size -= str.length;
      }
      return fs.closeSync(fd);
    });
    it("read big buffer from file", function(done) {
      return BigBuffer.fromFile(testFile, function(err, _bb) {
        bb = _bb;
        console.assert(!err);
        console.assert(bb.length);
        return done();
      });
    });
    it("should be the same size", function(done) {
      var stat;
      stat = fs.statSync(testFile);
      bb.length.should.be.equal(stat.size);
      return done();
    });
    return it("slice test", function(done) {
      var end, index, sliceString, start, _i;
      start = Math.floor(303 * bb.blockSize / 10) * 10;
      end = start + 10;
      sliceString = bb.slice(start, end).toString();
      for (index = _i = 0; _i <= 9; index = ++_i) {
        String.fromCharCode(bb.byteAt(start + index)).should.equal(sliceString[index]);
      }
      sliceString.should.equal("0123456789");
      return done();
    });
  });

}).call(this);

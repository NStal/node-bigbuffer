require "should"
BigBuffer = require "../lib/bigBuffer.coffee"
fs = require "fs"
KB = 1024
MB = 1024 * KB
bb = null
testFile = "./500M"
describe "test bigbuffer",()->
    it "read big buffer from file",(done)->
        BigBuffer.fromFile testFile,(err,_bb)->
            bb = _bb
            console.assert not err
            console.assert bb.length
            done()
    it "should be the same size",(done)->
        stat = fs.statSync(testFile)
        bb.length.should.be.equal(stat.size)
        done()    
    it "slice test",(done)->
        start = Math.floor(303*bb.blockSize/10)*10
        #start = bb.blockSize-1 
        end = start+10
        sliceString = bb.slice(start,end).toString()
        for index in [0..9]
            String.fromCharCode(bb.byteAt(start+index)).should.equal(sliceString[index])
        sliceString.should.equal("0123456789")
        done()
    
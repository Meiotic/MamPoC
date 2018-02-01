var Mam = require('mam.client/lib/mam.node.js')
var IOTA = require('iota.lib.js')

var iota = new IOTA({ provider: `http://iotanode.party:14265` })


let root = 'VEZZLUHDIXFIBCPTBKKR9HRKQEXIXY9YCIVLVNNFQDRRIMOIRBHGZRDJCXDO99QVZMHLCPTEVUZSGKLVO'

var mamState = Mam.init(iota)

const logData = data => console.log(JSON.parse(iota.utils.fromTrytes(data)))

const execute = async () => {
  var resp = await Mam.fetch(root, 'public', null, logData)
  console.log(resp)
}

execute()
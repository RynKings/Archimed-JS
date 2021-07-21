
__author__   = "Anysz"
__modified__ = "Ryns"
__email__    = "ryanaldi383@gmail.com"
__status__   = "Ready, send bug to the email"

// Free to use, all creadits belong to me Anysz
// Feel free to report bugs :D
// Run:
// 		node achimed.js
//   or
//   	node
//   	> const { Archimed } = require('./archimed.js')
//   	> x = new Archimed("1-5", range(8)).parse() // You need to define range function

function range(start, stop, step) { //https://stackoverflow.com/questions/8273047/javascript-function-similar-to-python-range
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};

class Archimed {

	constructor(logic, datalist){
		this.datalist = datalist
		this.logic = logic
		this.data_array = []
	}

	parse(){
		var logics = this.parse_comma(this.logic)
		var theresult = []
		logics.forEach(logic => {
			console.log(logic)
			if (logic.includes(">")){
				var res01 = this.do_logic(logic)
				this.util_append(res01, theresult)
			} else if (logic.includes("<")){
				var res02 = this.do_logic(logic)
				this.util_append(res02, theresult)
			} else if (logic.includes("-")){
				var res03 = this.do_range(logic)
				this.util_append(res03, theresult)
			} else {
				var res04 = this.do_logic(logic)
				this.util_append(res04, theresult)
			}
		})
		var last_step = this.util_filter_doubled(theresult)
		last_step.sort()
		return last_step
	}

	util_filter_doubled(nestlists){
		// [ [2,3,4,5] , [2] , [3,4,7] ]
		var dmp = []
		nestlists.forEach(reslist => {
			reslist.forEach(item => {
				if (!dmp.includes(item)){
					dmp.push(item)
				}
			})
		})
		return dmp
	}

	util_append(data, thelist){
		if (data !== null){
			thelist.push(data)
		}
	}

	do_append(logic){
		try {
			var number = Number(logic)
			if (this.datalist.includes(number)){
				return [number]
			} else {
				return null
			}
		} catch {
			return null
		}
	}

	do_logic(logic){
		var dmp = []
		this.datalist.forEach(d => {
			var tog = String(`${d}${logic}`)
			var state = eval(tog)
			if (state){
				dmp.append(d)
			}
		})
		return dmp
	}

	do_range(logic){
		var rangedata = this.parse_minus(logic)
		if (rangedata.length === 1){
			return null
		} else if (rangedata.length === 2){
			var the_min = Math.min( Number(rangedata[0]), Number(rangedata[1]))
			var the_max = Math.max( Number(rangedata[0]), Number(rangedata[1]))
			var listrange = range(the_min, the_max+1)
			var dmp = []
			this.datalist.forEach(iter => {
				if (listrange.includes(iter)){
					dmp.push(iter)
				}
			})
			return dmp
		}
	}

	parse_minus(logic){
		logic = logic.split('-')
		return logic
	}

	parse_comma(logic){
		var dat = logic.split(',')
		var dmp = []
		dat.forEach(item => {
			if (item !== ''){
				dmp.push(item)
			}
		})
		return dmp
	}
}

module.exports = {
	Archimed: Archimed
}
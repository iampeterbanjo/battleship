var Test = Test || function() {
	return {
		assert: function(test, description) {
			var status = !!test ? 'PASSED' : 'FAILED';
			console[ !!test ? 'info': 'warn' ]('%s : %s', status, description);
		}
	}
}

if ((window.outerHeight - window.innerHeight) > 100) {
	console.log('** Docked inspector open >> running tests << **');
	
	var test = new Test();
	
	test.assert(true, 'sanity check');
	
	// run all tests
	for(var t in test) {
		if(typeof test[t] == 'function'
		&& test.hasOwnProperty(t)
		&& t != 'assert') {
			test[t]();
		}
	}
}
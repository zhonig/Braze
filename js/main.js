var trackedIntegers = [],
	integer = ko.observable(),
	outputArray = ko.observableArray(),
	model = {
		integer: integer,
		output: ko.computed(function () {
			var tempOutput = ko.unwrap(outputArray);
			return tempOutput.join('\n');
		}),
		trackInteger: function (data, event) {
			event.preventDefault();
			
			var tempNumber = ko.unwrap(integer);
			if(tempNumber) {
				tempNumber = parseInt(tempNumber, 10);
				track(tempNumber);
				integer('');
				outputArray.push('Added Tracking Integer: ' + tempNumber);
			}
		},
		get_max: function (data, event) {
			event.preventDefault();
			
			get_max();
		},
		get_min: function (data, event) {
			event.preventDefault();
			
			get_min();
		},
		get_mean: function (data, event) {
			event.preventDefault();
			
			get_mean();
		},
		get_mode: function (data, event) {
			event.preventDefault();
			
			get_mode();
		}
	};
	
ko.applyBindings(model, document.getElementsByTagName('body')[0]);
	
function track(value) {
	trackedIntegers.push(value);
}
function get_max() {
	if(!trackedIntegers.length) {
		alert ("A minimum of one integer must be tracked");
		return;
	}
	var maxInteger = Math.max.apply(null, trackedIntegers);
	outputArray.push('Max of all tracked integers: ' + maxInteger);
	return maxInteger;
}
function get_min() {
	if(!trackedIntegers.length) {
		alert ("A minimum of one integer must be tracked");
		return;
	}
	var minInteger = Math.min.apply(null, trackedIntegers);
	outputArray.push('Min of all tracked integers: ' + minInteger);
	return minInteger;
}
function get_mean() {
	if(!trackedIntegers.length) {
		alert ("A minimum of one integer must be tracked");
		return;
	}
	
	var sum = 0,
		mean,
		arrayLength = trackedIntegers.length || 0;
		
	for(var i = 0; i < arrayLength; i++){
		sum += parseInt(trackedIntegers[i], 10);
	}
	mean = sum/arrayLength;
	outputArray.push('Mean of all tracked integers: ' + mean);
	return mean;
}
function get_mode() {
	if(!trackedIntegers.length) {
		alert ("A minimum of one integer must be tracked");
		return;
	}
	
	var modes = [],
		count = [],
		tempNumber,
		maxIndex = 0;
 
    for (var i = 0; i < trackedIntegers.length; i+=1) {
        tempNumber = trackedIntegers[i];
        count[tempNumber] = (count[tempNumber] || 0) + 1;
        if (count[tempNumber] > maxIndex) maxIndex = count[tempNumber];
    }
 
    for (var i in count) {
        if (count.hasOwnProperty(i)) {
            if (count[i] === maxIndex) modes.push(Number(i));
        }
	}
	outputArray.push('Mode of all tracked integers: ' + modes.join(','));
    return modes;
}
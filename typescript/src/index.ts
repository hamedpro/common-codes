export var custom_find_unique = (
	array: Array<any>,
	custom_compare_function: undefined | ((item1: any, item2: any) => boolean)
) => {
	if (custom_compare_function === undefined) {
		//using === as custom_compare_function
		return array.filter((item, index) => {
			return array.indexOf(item) === index;
		});
	}

	var cloned_array = [...array];
	function find_duplicate_pairs() {
		if (custom_compare_function === undefined) {
			throw "internal error. we were sure custom_compare_function !== undefined but it is not.";
		}
		var all_pairs: number[][] = [];
		for (var i = 0; i < cloned_array.length; i++) {
			for (var j = 0; j < cloned_array.length; j++) {
				if (j !== i) {
					all_pairs.push([i, j]);
				}
			}
		}
		return all_pairs.filter(
			(pair) => custom_compare_function(cloned_array[pair[0]], cloned_array[pair[1]]) === true
		);
		//returns an array like this : [[1,2] , [5,3]] ->
		//it means in index 1 and index 2 of cloned array are the same according to custom_compare_function
		//and the same is true about cloned_array[5] and cloned_array[3]
	}
	while (find_duplicate_pairs().length !== 0) {
		cloned_array.splice(find_duplicate_pairs()[0][1], 1);
	}

	return cloned_array;
};

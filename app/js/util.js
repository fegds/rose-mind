'use strict';

(function(){

window.getUser = function(uid){
	var name,
		user = Users[uid],
		firstname = user.firstname,
		avatar = user.avatar;

	if(avatar){
		avatar += '.jpg';
	}else{
		avatar = 'default.png';
	}

	if(/[\u3400-\u9FBF]/.test(firstname)){
		name = user.lastname + firstname;
	}else{
		name = firstname + ' ' + user.lastname;
	}
	return {
		name: name,
		avatar: 'img/avatar/' + avatar
	};
};

window.log = function(text){
	console.log(text);
}

window.shuffle = function(array){
	// array.sort(function() { return 0.5 - Math.random() });

	for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
}

})();

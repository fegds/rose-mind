'use strict';

(function(){

window.getUser = function(uid){
	var user = Users[uid],
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

})();

'use strict';

(function(){

window.getUsername = function(uid){
	var user = Users[uid];

	return user.firstname + ' ' + user.lastname;
};

})();

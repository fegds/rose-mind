'use strict';

var CONS = {
};

var	Route = {
	signin: {
		id: 'SigninCtrl',
		template: 'sign-in.html',
		url: '/sign-in'
	},
	tasks: {
		id: 'TasksCtrl',
		template: 'tasks.html',
		url: '/tasks'
	},
	task: {
		id: 'TaskCtrl',
		template: 'task.html',
		url: '/tasks/:id'
	},
	times: {
		id: 'TimesCtrl',
		template: 'times.html',
		url: '/times'
	}

			/*
	redmine: {
		id: 'RedmineCtrl',
		template: 'redmine.html',
		url: '/redmine'
	},
	workflow: {
		id: 'WorkflowCtrl',
		template: 'workflow.html',
		url: '/workflow'
	},
	bootstrap: {
		id: 'BootstrapCtrl',
		template: 'bootstrap.html',
		url: '/bootstrap'
	},
	htmlcssStyleGuide: {
		id: 'HtmlcssStyleGuideCtrl',
		template: 'htmlcss_style_guide.html',
		url: '/htmlcss-style-guide'
	},
	javascriptStyleGuide: {
		id: 'JavascriptStyleGuideCtrl',
		template: 'javascript_style_guide.html',
		url: '/javascript-style-guide'
	}
	*/
};


(function(){

var i, item,
	redmine_api_url = '/rose-mind/redmine-api/',
	redmine_api = {
		user: {
			current: redmine_api_url + 'users/current.json',
			item: redmine_api_url + 'users/'
		},
		task: {
			list: redmine_api_url + 'issues.json',
			item: redmine_api_url + 'issues/'
		},
		times: redmine_api_url + 'time_entries.json'
	},
	redmine_api_raw = [
		// [ 'signin', 'login' ],
		[ 'time', 'time_entries.json' ]
	]
	;

for(i=0; i<redmine_api_raw.length; i++){
	item = redmine_api_raw[i];
	redmine_api[item[0]] = redmine_api_url + item[1];
}

window.URL = {
	redmine_api: redmine_api
}

})();

var Users = {
	"f2e": [ 5, 9, 10, 11, 14, 17 ],
   "3":{
      "firstname":"Whiskey",
      "lastname":"Yang",
      "created_on":"2013-06-05T03:52:12Z",
      "mail":"yangsw@cf-ec.com"
   },
   "4":{
      "firstname":"耿标",
      "lastname":"赖",
      "created_on":"2013-06-05T12:59:23Z",
      "mail":"laigb@cf-ec.com"
   },
   "5":{
      "firstname":"alex",
      "lastname":"hu",
      "created_on":"2013-06-05T13:00:27Z",
      "mail":"huyh@cf-ec.com",
	  "avatar": "alex"
   },
   "6":{
      "firstname":"杰",
      "lastname":"李",
      "created_on":"2013-06-05T15:50:23Z",
      "mail":"lijie@cf-ec.com"
   },
   "7":{
      "firstname":"玉纯",
      "lastname":"林",
      "created_on":"2013-06-05T15:52:33Z",
      "mail":"linych@cf-ec.com"
   },
   "8":{
      "firstname":"军",
      "lastname":"钟",
      "created_on":"2013-06-05T20:23:26Z",
      "mail":"zhongj@cf-ec.com"
   },
   "9":{
      "firstname":"Angus",
      "lastname":"Young",
      "created_on":"2013-06-05T22:02:21Z",
      "mail":"yangxx@cf-ec.com"
	  // "avatar": "angus"
   },
   "10":{
      "firstname":"vfasky",
      "lastname":"(黄荣发)",
      "created_on":"2013-06-05T22:02:37Z",
      "mail":"vfasky@gmail.com",
	  "avatar": "fa"
   },
   "11":{
      "firstname":"本霞",
      "lastname":"卢",
      "created_on":"2013-06-06T13:10:36Z",
      "mail":"lubx@cf-ec.com",
	  "avatar": "benxia"
   },
   "12":{
      "firstname":"吴",
      "lastname":"嘉林",
      "created_on":"2013-06-06T14:11:16Z",
      "mail":"wujl@cf-ec.com"
   },
   "13":{
      "firstname":"跃波",
      "lastname":"曹",
      "created_on":"2013-06-06T14:37:23Z",
      "mail":"51855359@qq.com"
   },
   "14":{
      "firstname":"伦冰",
      "lastname":"莫",
      "created_on":"2013-06-06T14:37:31Z",
      "mail":"molb@cf-ec.com"
   },
   "15":{
      "firstname":"秉钺",
      "lastname":"张",
      "created_on":"2013-06-06T14:39:24Z",
      "mail":"155169553@qq.com"
   },
   "16":{
      "firstname":"志强",
      "lastname":"潘",
      "created_on":"2013-06-06T15:02:09Z",
      "mail":"panzhq@cf-ec.com"
   },
   "17":{
      "firstname":"sam",
      "lastname":"zhou",
      "created_on":"2013-06-06T15:19:17Z",
      "mail":"zhoumsh@cf-ec.com"
   },
   "18":{
      "firstname":"加其",
      "lastname":"黄",
      "created_on":"2013-06-06T15:34:25Z",
      "mail":"303961279@qq.com"
   },
   "19":{
      "firstname":"小龙",
      "lastname":"李",
      "created_on":"2013-06-06T15:34:27Z",
      "mail":"149614413@qq.com"
   },
   "20":{
      "firstname":"小俊",
      "lastname":"贺",
      "created_on":"2013-06-06T15:34:31Z",
      "mail":"253662727@qq.com"
   },
   "21":{
      "firstname":"Kamen",
      "lastname":"Lai",
      "created_on":"2013-06-06T15:34:40Z",
      "mail":"laixm@cf-ec.com"
   },
   "22":{
      "firstname":"宏贵",
      "lastname":"邹",
      "created_on":"2013-06-06T15:35:28Z",
      "mail":"zouhg@cf-ec.com"
   },
   "23":{
      "firstname":"辉",
      "lastname":"詹",
      "created_on":"2013-06-06T15:36:07Z",
      "mail":"zhanh@cf-ec.com"
   },
   "24":{
      "firstname":"李",
      "lastname":"楠",
      "created_on":"2013-06-06T15:36:08Z",
      "mail":"lin@cf-ec.com"
   },
   "25":{
      "firstname":"钱",
      "lastname":"智涛",
      "created_on":"2013-06-06T15:36:20Z",
      "mail":"qianzt@cf-ec.com"
   },
   "26":{
      "firstname":"庆祥",
      "lastname":"卢",
      "created_on":"2013-06-06T15:36:25Z",
      "mail":"luqx@cf-ec.com"
   },
   "27":{
      "firstname":"zhenhua",
      "lastname":"wang",
      "created_on":"2013-06-06T15:38:45Z",
      "mail":"631418535@qq.com"
   },
   "28":{
      "firstname":"舜",
      "lastname":"肖",
      "created_on":"2013-06-06T15:40:03Z",
      "mail":"xiaos@cf-ec.com"
   },
   "29":{
      "firstname":"陈",
      "lastname":"璐欣",
      "created_on":"2013-06-06T15:44:01Z",
      "mail":"chenlx@cf-ec.com"
   },
   "30":{
      "firstname":"鲜林",
      "lastname":"叶",
      "created_on":"2013-06-06T17:25:05Z",
      "mail":"samlinye@163.com"
   },
   "31":{
      "firstname":"yongchao",
      "lastname":"guo",
      "created_on":"2013-06-06T17:51:51Z",
      "mail":"yongchao.guo@pcitc.com"
   },
   "32":{
      "firstname":"茵瑜",
      "lastname":"黄",
      "created_on":"2013-06-06T18:59:15Z",
      "mail":"huangyy@cf-ec.com"
   },
   "33":{
      "firstname":"张",
      "lastname":"淑怡",
      "created_on":"2013-06-06T21:25:28Z",
      "mail":"zhangshy@cf-ec.com"
   },
   "34":{
      "firstname":"明",
      "lastname":"罗",
      "created_on":"2013-06-07T12:46:29Z",
      "mail":"luom@cf-ec.com"
   },
   "35":{
      "firstname":"王",
      "lastname":"钜辉",
      "created_on":"2013-06-07T13:24:52Z",
      "mail":"wangjh@cf-ec.com"
   },
   "36":{
      "firstname":"聪",
      "lastname":"吴",
      "created_on":"2013-06-07T13:48:28Z",
      "mail":"wuc@cf-ec.com"
   },
   "37":{
      "firstname":"陈嘉祺",
      "lastname":"陈",
      "created_on":"2013-06-07T14:00:45Z",
      "mail":"chenjq@cf-ec.com"
   },
   "38":{
      "firstname":"Shijin",
      "lastname":"Li",
      "created_on":"2013-06-07T19:03:09Z",
      "mail":"lisj@cf-ec.com"
   },
   "39":{
      "firstname":"婷",
      "lastname":"周",
      "created_on":"2013-06-19T14:33:13Z",
      "mail":"zhout@cf-ec.com"
   },
   "40":{
      "firstname":"马",
      "lastname":"锦涛",
      "created_on":"2013-07-01T21:06:04Z",
      "mail":"578051996@qq.com"
   },
   "41":{
      "firstname":"渝畅",
      "lastname":"谢",
      "created_on":"2013-07-02T11:52:08Z",
      "mail":"xieyc@cf-ec.com"
   },
   "42":{
      "firstname":"勃",
      "lastname":"彭",
      "created_on":"2013-07-03T15:49:16Z",
      "mail":"pengb@cf-ec.com"
   },
   "43":{
      "firstname":"志杰",
      "lastname":"邓",
      "created_on":"2013-07-03T15:49:47Z",
      "mail":"dengzj@cf-ec.com"
   },
   "44":{
      "firstname":"志勇",
      "lastname":"黄",
      "created_on":"2013-07-03T20:47:36Z",
      "mail":"huangzy@cf-ec.com"
   },
   "45":{
      "firstname":"昊伟",
      "lastname":"王",
      "created_on":"2013-07-10T21:40:12Z",
      "mail":"wanghw@cf-ec.com"
   },
   "46":{
      "firstname":"晶莹",
      "lastname":"李",
      "created_on":"2013-07-18T14:43:28Z",
      "mail":"lijy@cf-ec.cn"
   },
   "47":{
      "firstname":"益明",
      "lastname":"黄",
      "created_on":"2013-07-22T18:39:48Z",
      "mail":"huangym@cf-ec.cn"
   }
}

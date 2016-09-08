/* overall search equip */
var OverallSearchAct = 'overall_search_pet';
var PetSkills = [
	[571, '������ɽ'],
	[554, '�ƶ��б�'],
	[552, '�����ٻ�'],
	[661, '��������'],
	[595, '���ݻ���'],
	[579, '��������'],
	[639, '���ܼ���'],
	[638, '��������'],
	[597, '�����ķ�'],
	[599, '�ƻ���ľ'],
	[553, '�Ϲ����'],
	[505, '�ٶ�'],
	[596, '��Ѫ׷��'],

	[404, '�߼���Ѫ'],
	[416, '�߼���ɱ'],
	[425, '�߼�͵Ϯ'],
	[405, '�߼�����'],
	[407, '�߼�����'],
	[422, '�߼�����'],
	[411, '�߼����Ӹ���'],
	[412, '�߼������'],
	[424, '�߼�ħ֮��'],
	[573, '�߼���������'],
	[577, '�߼���������'],
	[578, '�߼���������'],

	[434, '�߼�ǿ��'],
	[413, '�߼�����'],
	[435, '�߼�����'],
	[414, '�߼���'],
	[406, '�߼�����'],
	[410, '�߼�ڤ˼'],
	[415, '�߼��۸�'],
	[627, '�߼������ֿ�'],
	[430, '�߼�����������'],
	[431, '�߼�����������'],
	[432, '�߼�ˮ��������'],
	[433, '�߼�����������'],

	[401, '�߼�ҹս'],
	[408, '�߼���֪'],
	[641, '�߼�����'],
	[629, '�߼�����'],
	[403, '�߼�����'],
	[417, '�߼�����'],
	[418, '�߼�������'],
	[419, '�߼���'],
	[426, '������'],
	[427, '̩ɽѹ��'],
	[428, 'ˮ����ɽ'],
	[429, '�����һ�'],

	[301, 'ҹս'],
	[308, '��֪'],
	[640, '����'],
	[628, '����'],
	[303, '����'],
	[317, '����'],
	[318, '������'],
	[319, '��'],
	[326, '�׻�'],
	[327, '����'],
	[328, 'ˮ��'],
	[329, '�һ�'],

	[304, '��Ѫ'],
	[316, '��ɱ'],
	[325, '͵Ϯ'],
	[305, '����'],
	[307, '����'],
	[322, '����'],
	[311, '���Ӹ���'],
	[312, '�����'],
	[324, 'ħ֮��'],
	[510, '��������'],
	[575, '��������'],
	[576, '��������'],

	[334, 'ǿ��'],
	[313, '����'],
	[335, '����'],
	[314, '��'],
	[306, '����'],
	[310, 'ڤ˼'],
	[315, '�۸�'],
	[626, '�����ֿ�'],
	[330, '����������'],
	[331, '����������'],
	[332, 'ˮ��������'],
	[333, '����������'],

	[402, '�߼�����'],
	[420, '�߼��м�'],
	[421, '�߼�����'],
	[409, '�߼�����'],
	[423, '�߼�������'],
	[593, '���׷���'],
	[624, '����'],
	[572, 'ҹ�����'],
	[551, '����һ��'],
	[302, '����'],
	[320, '�м�'],
	[321, '����'],
	[309, '����'],
	[323, '������'],
	[650, '���ŭ��'],
	[663, '�콵���'],
	[667, '������']
];

var ServerTypes = [
	[3, '3�����Ϸ�'],
	[2, '1��3���'],
	[1, '1���ڷ�']
];

var FairShowStatus = [
	[1, '���ϼ�'],
	[0, '��ʾ��']
];

var FrontStatus= [
	['pass_fair_show', '���ϼ�'],
	['fair_show', '��ʾ��'],
	['bidding', '������'],
	['open_buy', '������']
]

var HighNeidans = [
	[935, '������'], 
	[924, '�����'], 
	[927, '˫�Ǳ�'], 
	[928, '������'], 
	[916, '������'], 
	[919, '�����'], 
	[930, '�����'], 
	[934, 'Ѫծ��'], 
	[914, '�����'], 
	[917, '������'], 
	[915, '��Ų��'], 
	[918, '������'], 
	[920, '������'], 
	[921, '������'], 
	[925, '�����'], 
	[926, 'ͨ�鷨'],
	[937, '��ȸ��']
];

var LowNeidans = [
	[901, 'Ѹ��'], 
	[902, '��ŭ'], 
	[904, '����'], 
	[907, '�ý�'], 
	[932, '����'], 
	[903, '����'], 
	[906, '����'], 
	[905, '����'], 
	[908, '��˼'], 
	[909, '�ֻ�'], 
	[910, '���'], 
	[913, 'ײ��'], 
	[922, '��η'], 
	[923, '�ߺ�'], 
	[929, '�㶾'], 
	[931, '�Ѵ�'], 
	[933, 'ʥ��'], 
	[936, '���'], 
	[912, '����']
];

var Colors = [
	[1, '&nbsp;1&nbsp;'],
	[2, '&nbsp;2&nbsp;']
];

var TexingTypes = [
	[701,"ʶҩ"],
	[702,"����"],
	[703,"�ɾ�"],
	[704,"����"],
	[705,"����"],
	[706,"����"],
	[707,"����"],
	[708,"˱ħ"],
	[709,"߱��"],
	[710,"����"],
	[711,"����"],
	[712,"˳��"],
	[713,"����"],
	[714,"ŭ��"],
	[715,"����"],
	[716,"˲��"],
	[717,"˲��"],
	[718,"����"],
	[719,"�鷨"],
	[720,"���"],
	[721,"�澳"],
	[722,"Ԥ֪"],
	[723,"����"],
	[724,"�鶯"],
	[725,"ʶ��"],
	[726,"����"],
	[727,"����"]
];

var FightLevels = [
	[65, "��ս45-65"],
	[66, "��ս75-105"],
	[67, "��ս125-145"],
	[68, "����120-155"],
	[69, "�ɽ�155-175"],
	[70, "���Գ�"],
	[71, "����"]
];

var OVERALL_SEARCH_PET_ARGS_CONFIG = [
	['level', '�ȼ�', 'slider'],
	['skill', '����', 'list', '#pet_skill_panel li'],
	['front_status', '����״̬', 'list', '#fair_show_panel li'],
	['server_type', '����ʱ��', 'list', '#server_type_panel li'],
	['color', '��������', 'list', '#color_panel li'],
	['texing', '����', 'list', '#texing_panel li'],
	['kindid', '��ս�ȼ�', 'list', '#fight_level_panel li'],
	['skill_num', '��������'],
	['attack_aptitude', '��������'],
	['defence_aptitude', '��������'],
	['physical_aptitude', '��������'],
	['magic_aptitude', '��������'],
	['speed_aptitude', '�ٶ�����'],
	['price', '�۸�', 'range'],
	['max_blood', '��Ѫ'],
	['attack', '����'],
	['defence', '����'],
	['speed', '�ٶ�'],
	['wakan', '����'],
	['lingxing', '����'],
	['growth', '�ɳ�'],
	['skill_with_suit', '����װ����', 'checkbox'],
	['is_baobao', '����', 'checkbox'],
	['summon_color', 'Ⱦɫ', 'checkbox'],
	['neidan', '�߼��ڵ�', 'list', '#high_neidan_panel li'],
	['neidan', '�ͼ��ڵ�', 'list', '#low_neidan_panel li'],
	['type', '����', 'autocomplete', 'pet_select_box', SaleablePetNameInfo]
];

var OverallPetSearcher = new Class({
	initialize: function(){
		this.skill_checker = new PetSkillButtonChecker(PetSkills.slice(0,42), $('pet_skill_panel'));
		this.server_type_checker = new ButtonChecker(ServerTypes, $('server_type_panel'));
		this.front_status_checker = new ButtonChecker(FrontStatus, $('fair_show_panel'));
		this.high_neidan_checker = new ButtonChecker(HighNeidans, $('high_neidan_panel'));
		this.low_neidan_checker = new ButtonChecker(LowNeidans, $('low_neidan_panel'));
		this.color_checker = new ButtonChecker(Colors, $('color_panel'));
		this.select_server = new DropSelectServer($('sel_area'), $('sel_server'));
		this.init_level_slider();
		this.init_pet_select_box();
		this.reg_event();
		this.init_search_btn();
		this.init_reset_btn();
		this.texing_checker = new ButtonChecker(TexingTypes, $('texing_panel'));
		
		this.fight_level_checker = new ButtonChecker(FightLevels, $('fight_level_panel'));
	},

	init_reset_btn: function(){
		var __this = this;
		$('reset_basic').addEvent('click', function(){
			__this.reset_basic();
		});

		$('reset_detail').addEvent('click', function(){
			__this.reset_detail();
		});

		$('reset_server_info').addEvent('click', function(){
			__this.reset_server_info();
		});

		$('reset_all').addEvent('click', function(){
			__this.reset_basic();
			__this.reset_detail();
			__this.reset_server_info();
		});
	},

	reset_basic: function(){
		var checkers = [
			this.level_slider,
			this.skill_checker,
			this.front_status_checker,
			this.fight_level_checker
		];
		var txt_inputs = [
			$('pet_select_box'),
			$('txt_skill_num'),
			$('txt_growth'),
			$('txt_attack_aptitude'),
			$('txt_defence_aptitude'),
			$('txt_physical_aptitude'),
			$('txt_magic_aptitude'),
			$('txt_speed_aptitude'),
			$('txt_price_min'),
			$('txt_price_max')
		];
		this.reset(checkers, txt_inputs);
		$('chk_skill_with_suit').checked = false;
	},

	reset_detail: function(){
		var checkers = [
			this.high_neidan_checker,
			this.low_neidan_checker,
			this.color_checker,
			this.texing_checker
		];
		var txt_inputs = [
			$('txt_max_blood'),
			$('txt_attack'),
			$('txt_defence'),
			$('txt_speed'),
			$('txt_wakan'),
			$('txt_lingxing')
		];
		this.reset(checkers, txt_inputs);
		$('chk_is_baobao').checked = false;
		$('chk_summon_color').checked = false;
	},

	reset_server_info: function(){
		var checkers = [
			this.server_type_checker,
			this.select_server
		];
		this.reset(checkers, []);
	},

	reset: function(checkers, txt_inputs){
		for(var i=0; i<checkers.length; i++){
			checkers[i].reset_value();	
		}
		for(var i=0; i<txt_inputs.length; i++){
			txt_inputs[i].set('value', '');
		}
	},

	init_level_slider: function(){
		this.level_slider = new LevelSlider($('level_slider'), {
			grid: 20,
			offset: -23,
			range: [0, 180],
			step: 10,
			default_value: [0, 180]
		});
	},

	init_pet_select_box: function(){ 
		var handle_pet_search = function(keyword){
			var result = new Array();
			for (var pet_type in SaleablePetNameInfo) {
				if (SaleablePetNameInfo[pet_type].indexOf(keyword)!= -1){
					var type_name = SaleablePetNameInfo[pet_type];
					if (result.indexOf(type_name) == -1){
	                	result.push(type_name);
					}
				}
			}
			return result;
		};
		new AutoComplete($('pet_select_box'),{
			"startPoint" : 1,
			"promptNum" : 20,
			"handle_func" : handle_pet_search,
			"callback": function(){}
		});
	},

	get_pet_type_value: function(){
		var result = [];
		var pet_name = $('pet_select_box').value;			
		if(!pet_name){
			return null;
		}
		for(var pet_type in SaleablePetNameInfo){
			if(SaleablePetNameInfo[pet_type].indexOf(pet_name) != -1){
				result.push(pet_type);
			}
		}
		return result.join(',');
	},

	reg_event: function(){
		var __this = this;
		$('btn_all_skill').addEvent('click', function(){
			if($(this).retrieve('spread')){
				return;
			}
			__this.skill_checker.extend(PetSkills.slice(42));
			$(this).store('spread', true);
			$(this).setStyle('display', 'none');
			
		});
	},

	init_search_btn: function(){
		var __this = this;
		$('btn_pet_search').addEvent('click', function(){
			__this.search();
		});
	},

	search: function(){
		var arg = {};
		if($('pet_select_box').value){
			var pet_type = this.get_pet_type_value();
			if(!pet_type){
				alert('��������Ҫ�ѵ��ٻ�������');
				return false;
			}
			arg['type'] = pet_type;
		}
		arg['level_min'] = this.level_slider.value.min;
		arg['level_max'] = this.level_slider.value.max;
		var check_items = [
			['skill', this.skill_checker, false],
			['front_status', this.front_status_checker, true],
			['server_type', this.server_type_checker, true],
			['color', this.color_checker, false],
			['texing', this.texing_checker, false],
			['kindid', this.fight_level_checker, true]
		];
		for(var i=0; i<check_items.length; i++){
			var item = check_items[i];
			if(item[2] && item[1].is_check_all()){
				continue;
			}
			var value = item[1].get_value();
			if(value){
				arg[item[0]] = value;
			}
		}

		var neidan_values = [
			this.high_neidan_checker.get_value(),
			this.low_neidan_checker.get_value()
		].filter(function(x){ return x!='';});
		if(neidan_values.length > 0){
			arg['neidan'] = neidan_values.join(',');
		}

		if($('chk_skill_with_suit').checked){
			arg['skill_with_suit'] = 1;
		}
		if($('chk_is_baobao').checked){
			arg['is_baobao'] = 1;
		}
		if($('chk_summon_color').checked){
			arg['summon_color'] = 1;
		}
		var txt_int_items = [
			['skill_num', 0, 10000, '��������'],
			['attack_aptitude', 0, 10000, '��������'],
			['defence_aptitude', 0, 10000, '��������'],
			['physical_aptitude', 0, 10000, '��������'],
			['magic_aptitude', 0, 10000, '��������'],
			['speed_aptitude', 0, 10000, '�ٶ�����'],
			['price_min', 0, MaxTradeYuan, '�۸�'],
			['price_max', 0, MaxTradeYuan, '�۸�'],
			['max_blood', 0, 20000, '��Ѫ'],
			['attack', 0, 4000, '����'],
			['defence', 0, 4000, '����'],
			['speed', 0, 2000, '�ٶ�'],
			['wakan', 0, 2000, '����'],
			['lingxing', 0, 10000, '����']
		];
		var intReg = /^\d+$/;
		for(var i=0; i<txt_int_items.length; i++){
			var item = txt_int_items[i];
			var el = $('txt_'+item[0]);
			var value = el.value;
			if(!value){continue;}
			if(!intReg.test(value)){
				alert(item[3]+'����������');
				el.focus();
				return;
			}
			if(!(item[1]<=parseInt(value) && parseInt(value)<=item[2])){
				alert(item[3]+'����ȡֵ��Χ:' + item[1] + '-' + item[2]);
				el.focus();
				return;
			} 
			arg[item[0]] = parseInt(value);
		}
		if(arg['price_min'] > arg['price_max']){
			alert('��ͼ۸��ܴ�����߼۸�');
			return;
		}
		if(arg['price_min']){
			arg['price_min'] = arg['price_min'] * 100;
		}
		if(arg['price_max']){
			arg['price_max'] = arg['price_max'] * 100;
		}
		var growth = $('txt_growth').value;
		if(growth){
			if(!/^\d\.\d{1,3}$/.test(growth)){
				alert('�ɳ�ֵ����, ���3λС��');
				return False;
			} else {
				arg['growth'] = parseInt(parseFloat(growth) * 1000);
			}
		}
		/*
		if($('sel_server').value){
			arg['switchto_serverid'] = $('sel_server').value;
		}
		*/
		if ($("user_serverid") && $("user_serverid").value){
			arg['cross_buy_serverid'] = $("user_serverid").value;		
		}
		
		go_overall_search(arg);
	}
});

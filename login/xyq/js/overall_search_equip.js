/* overall search equip */
var OverallSearchAct = 'overall_search_equip';
var EquipKinds = [
	[10, '��'],
	[6, '��'],
	[14, '��'],
	[5, '��'],
	[15, '��'],
	[4, 'ǹ'],
	[13, '˫��'],
	[7, '˫��'],
	[12, '����'],
	[9, 'צ��'],
	[11, 'ħ��'],
	[8, 'Ʈ��'],
	[52, '����'],
	[53, '����'],
	[54, '����'],
	[18, '����'],
	[59, 'Ů��'],
	[17, '��ͷ'],
	[58, 'Ůͷ'],
	[20, '����'],
	[19, 'Ь��'],
	[21, '��Ʒ']
];

var SpecialEffects = [
	[1, "�޼���"],
	[2, "����"],
	[3, "��ŭ"],
	[4, "��ŭ"],
	[5, "����ĥ��"],
	[6, "��ũ"],
	[7, "����"],

	[8, "����"],
	[9, "���"],
	[10, "����"],
	[11, "��ɱ"],
	[12, "רע"],
	[13, "αװ"],
	[14, "������"],
	[15, "����"],
	[16, "����"],
	[17, "����"],
	[18, "�䱦"]
];

var SpecialSkills = [
	[1027, "�޺�����"],
	[1015, "�����"],
	[1014, "�����"],
	[1012, "ˮ���"],
	[1018, "Ц��ص�"],
	[1024, "���ƾ�"],
	[1034, "������"],
	[1036, "��Ѫ��"],
	[1042, "������˫"],
	[1037, "�������"],
	[1020, "Ұ��֮��"],
	[1030, "��������"],
	[1032, "�Ƽ���"],
	[1010, "��������"],
	[1008, "�ĺ���ƽ"],
	[2004, "ȼ��֮��"],
	[1033, "�����"],
	[1011, "�Ⱥ��ն�"],
	[1045, "���֮��"],
	[1022, "���֮��"],
	[1023, "ʥ��֮��"],

	[1001, "������"],
	[1002, "������"],
	[1003, "������"],
	[1004, "������"],
	[1005, "�����"],
	[1006, "������"],
	[1007, "������"],
	[1009, "�ػ���"],
	[1013, "�����"],
	[1016, "����֮��"],
	[1017, "����֮��"],
	[1019, "����ħ��"],
	[1021, "ħ��֮ӡ"],
	[1025, "Х���"],
	[1026, "̫������"],
	[1028, "������"],
	[1029, "�����޷�"],
	[1031, "�Ӷ�ʨ��"],
	[1035, "ͣ����"],
	[1038, "��Ѫ"],
	[1039, "����"],
	[1040, "ڤ����ɱ"],
	[1041, "Ǭ��ն"],
	[1043, "������˫"],
	[1044, "٤����˫"],
	[1046, "����֮��"],
	[1047, "����֮��"],
	[1048, "��������"],
	[1049, "��������"], [1050, "���λ�Ӱ"],
	[2001, "���ľ�"], [2002, "�۾�����"], [2003, "�ȷ����� "], 
	[2005, "����֮��"], [2006, "��ղ���"], [2007, "��������"]
];

var SuitEffects = [
	[4011, "����"],
	[4002, "����"],
	[4005, "����"],
	[4008, "��ڤ����"],
	[4016, "һέ�ɽ�"],
	[4004, "��ջ���"],
	[4015, "ɱ����"],

	[4001, "��˿��"],
	[4013, "��������"],
	[4009, "��������"],
	[4012, "�ն�����"],
	[4006, "����֮Ȫ"],
	//[4003, "���ȷ��"],
	[4007, "ħ������"],
	[3011, "���컨��"],
	[3033, "��ɨǧ��"],
	[4017, "���Ǿ�"],
	[3050, "��ӿ"]
];

var SuitAddedStatus = {
	'����':4011,
	'������':4002,
	'����':4005,
	'��ڤ����':4008,
	'һέ�ɽ�':4016,
	'��˿��':4001,
	'���ȷ��':4003,
	'��ջ���':4004,
	'����֮Ȫ':4006,
	'ħ������':4007,
	'��������':4009,
	'�ٶ�����':4010,
	'�ն�����':4012,
	'��������':4013,
	'��������':4014,
	'ɱ����':4015,
	'���Ǿ�':4017,
	'���ⱦ��':4018
};

var SuitAppendSkills = {
	'���컨��':3011,'֪��֪��':3001,'����':3002,'�������':3003,'ħ�����':3004,'��������':3005,'����':3006,'���߷�':3007,'ʧ�ķ�':3008,
	'���Ƿ�':3009,'�����':3010,'��������':3012,'ʬ����':3013,'����':3014,'����':3015,'����ͬ��':3016,'��������':3017,'�������':3018,
	'����':3019,'����':3020,'������':3021,'��ɰ��ʯ':3022,'�������':3023,'������':3024,'�й���':3025,'������':3026,'�չ⻪':3027,
	'��׺�':3028,'������':3029,'��ã��':3030,'���ѻ�':3031,'������':3032,'��ɨǧ��':3033,'����Ǭ��':3034,'�޵�ţʭ':3035,
	'�׻�':3036,'����':3037,
	'ˮ��':3038,'�һ�':3039,'������':3040,'̩ɽѹ��':3041,'ˮ����ɽ':3042,'�����һ�':3043,'��Ҷ����':3044,
	'������':3045,'������':3046,'����ŭ':3047,'������':3048,'������':3049,'��ӿ':3050,'��ʯ':3051
};

var SuitTransformSkills = {
	'����':1001,'�󺣹�':1002,'����':1003,'����':1004,'��ͽ':1005,'ǿ��':1006,'��ë��':1007,'������':1008,'ɽ��':1009,
	'Ұ��':1010,'���ù�':1011,'��ͷ��':1012,'��󡾫':1013,'���꾫':1014,'�ϻ�':1015,'����':1016,'����':1017,
	'ţ��':1018,'С��Ů':1019,'Ұ��':1020,'��':1021,'Ϻ��':1022,'з��':1023,'��ة��':1024,'���ӹ�':1025,
	'֩�뾫':1026,'���ܾ�':1027,'��ʬ':1028,'ţͷ':1029,'����':1030,'������':1031,'��������':1032,'�Ŵ�����':1033,
	'����':1034,'��ɽ����':1035,'���':1036,'�콫':1037,'����ս��':1038,'�粮':1039,'���':1040,'����':1041,'��ʦ':1042,
	'��������':1043,'ܽ������':1044,'Ѳ������':1045,'��������':1046,'����':1047,'��':1048,'��Ѫ��':1049,'��ƿŮ�':1050,
	'�ɷ�Ů�':1051,'���Ů�':1052,'����':1053,'��ө����':1054,'�������':1055,'������':1056,'���':1057,'ҹ��ɲ':1058,
	'��ħ��':1059,'���컢':1060,'̤����':1061,'��������':1062,'����':1063,'������':1064,'������':1065,'����':1066,
	'����':1067,'��«����':1069,'è�飨���ͣ�':1070,'�񱪣����ͣ�':1071,'Ы�Ӿ�':1072,'������':1073,'��ü���':1074,
	'������Գ':1075,'���޿��ܹ�':1076,'���޿�����':1077,'�����޺�':1078,'��������':1079,'����ɳ��':1080,'������':1081
};

var SuitTransformCharms = {
	'����':2001,'�󺣹�':2002,'����':2003,'��ë��':2004,'������':2005,'��ͷ��':2006,'��󡾫':2007,
	'���꾫':2008,'�ϻ�':2009,'����':2010,'����':2011,'ţ��':2012,'С��Ů':2013,'Ұ��':2014,
	'��':2015,'Ϻ��':2016,'з��':2017,'��ة��':2018,'���ӹ�':2019,'֩�뾫':2020,'���ܾ�':2021,
	'��ʬ':2022,'ţͷ':2023,'����':2024,'������':2025,'��������':2026,'�Ŵ�����':2027,'����':2028,
	'��ɽ����':2029,'���':2030,'�콫':2031,'����ս��':2032,'�粮':2033,'���':2034,'����':2035,
	'��ʦ':2036,'��������':2037,'ܽ������':2038,'Ѳ������':2039,'��������':2040
};

var SumAttrs = [
	['physique', '����'],
	['endurance', '����'],
	['dex', '����'],
	['magic', 'ħ��'],
	['power', '����']
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
];

var Gems = [
	[1, '�����'],
	[2, '̫��ʯ'],
	[3, '������'],
	[4, '��âʯ'],
	[5, '����ʯ'],
	[6, '�ڱ�ʯ'],
	[7, '����ʯ']
];

var ProduceFroms = [
	[1, 'ϵͳ����'],
	[2, '����']
];

var OVERALL_SEARCH_EQUIP_ARGS_CONFIG = [
	['special_mode', '�ؼ�/��Ч', 'radio', '#check_mode_panel input'],
	['kindid', '����', 'list', '#kind_check_panel li'],
	['special_effect', '��Ч', 'list', '#special_effect_panel li'],
	['special_skill', '�ؼ�', 'list', '#special_skill_panel li'],
	['front_status', '����״̬', 'list', '#fair_show_panel li'],
	['server_type', '����ʱ��', 'list', '#server_type_panel li'],
	['gem_value', '��Ƕ��ʯ', 'list', '#gem_panel li'],
	['produce_from', 'װ������', 'list', '#produce_from_panel li'],
	['sum_attr_type', '��������', 'list', '#sum_attr_panel li'],
	['init_damage', '���ˣ��������У�'],
	['init_damage_raw', '���ˣ��������У�'],
	['all_damage', '����'],
	['damage', '�˺�'],
	['init_defense', '����'],
	['init_hp', '��Ѫ'],
	['init_dex', '����'],
	['init_wakan', '����'],
	['sum_attr_value', '�����ܺ�'],
	['price', '�۸�', 'range'],
	['gem_level', '��ʯ�����ȼ�'],
	['hole_num', 'װ��������Ŀ'],
	['repair_fail', '����ʧ�ܴ���'],
	['star', '��λ', 'checkbox'],
	['level', '�ȼ�', 'slider'],
	['suit_effect', '��װ', 'func', get_suit_name_by_value, function(val){
		if($('suit_effect_panel').suit_value_getter){
			$('suit_effect_panel').suit_value_getter.set_value(val);
		}
	}]
]

var OverallEquipSearcher = new Class({
	initialize: function(){
		this.kind_checker = new ButtonChecker(EquipKinds, $('kind_check_panel'));
		this.special_effect_checker = new ButtonChecker(SpecialEffects, $('special_effect_panel'));
		this.special_skill_checker = new ButtonChecker(SpecialSkills.slice(0,28), $('special_skill_panel'));
		this.sum_attr_checker = new ButtonChecker(SumAttrs, $('sum_attr_panel'));
		this.server_type_checker = new ButtonChecker(ServerTypes, $('server_type_panel'));
		this.front_status_checker = new ButtonChecker(FrontStatus, $('fair_show_panel'));
		this.gem_checker = new ButtonChecker(Gems, $('gem_panel'));
		this.produce_from_checker = new ButtonChecker(ProduceFroms, $('produce_from_panel'));
		this.select_server = new DropSelectServer($('sel_area'), $('sel_server'));
		this.init_check_mode();
		this.init_level_slider();
		this.init_suit();
		this.reg_event();
		this.init_search_btn();
		this.init_reset_btn();
	},

	init_reset_btn: function(){
		var __this = this;
		$('reset_equip_attr').addEvent('click', function(){
			__this.reset_equip_attr();
		});

		$('reset_server_info').addEvent('click', function(){
			__this.reset_server_info();
		});

		$('reset_all').addEvent('click', function(){
			__this.reset_equip_attr();
			__this.reset_server_info();
		});
	},

	init_suit: function(){
		var sel_el = $('sel_short_cut');
		for(var i=0; i<SuitEffects.length; i++){
			var item = SuitEffects[i];
			sel_el.grab(new Element('option', {'value': item[0], 'html': item[1]}));
		}
		this.suit_value_getter = new SuitValueGetter();
		$('suit_effect_panel').suit_value_getter = this.suit_value_getter;
	},

	reset_equip_attr: function(){
		var checkers = [
			this.level_slider,
			this.kind_checker,
			this.special_effect_checker,
			this.special_skill_checker,
			this.sum_attr_checker,
			this.gem_checker,
			this.produce_from_checker,
			this.front_status_checker
		];
		var txt_inputs = [
			$('txt_init_damage'),
			$('txt_init_defense'),
			$('txt_init_hp'),
			$('txt_init_dex'),
			$('txt_init_wakan'),
			$('txt_all_damage'),
			$('txt_damage'),
			$('txt_sum_attr_value'),
			$('txt_gem_level'),
			$('txt_hole_num'),
			$('txt_repair_fail'),
			$('txt_price_min'),
			$('txt_price_max'),
			$('txt_added_status'),
			$('txt_append_skill'),
			$('txt_transform_skill'),
			$('txt_transform_charm')
		];
		this.reset(checkers, txt_inputs);
		this.reset_check_mode();
		$('chk_star').checked = false;
		$('sel_short_cut').options[0].selected = true;
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

	reset_check_mode: function(){
		if(this.check_mode != 'or'){
			return;
		}
		$$('#check_mode_panel input').each(function(el, i){
			if(el.value == 'or'){
				el.checked = false;
			} else {
				el.checked = true;
			}
		});
		this.check_mode = 'and';
		this.set_check_mode();
	},

	init_level_slider: function(){
		this.level_slider = new LevelSlider($('level_slider'), {
			grid: 20,
			offset: -23,
			range: [60, 160],
			step: 10,
			default_value: [60, 160]
		});
	},

	init_check_mode: function(){
		var check_mode = null;
		$$('#check_mode_panel input').each(function(el, i){
			if(el.checked){
				check_mode = el.value;
			}
		});
		this.set_check_mode(check_mode);
	},

	set_check_mode: function(check_mode){
		if(check_mode == 'or'){
			this.special_effect_checker.set_max_num(null);
			this.special_skill_checker.set_max_num(null);
		} else {
			this.special_effect_checker.set_max_num(16);
			this.special_skill_checker.set_max_num(1);
		}
		this.check_mode = check_mode;
	},

	reg_event: function(){
		var __this = this;
		$('btn_all_special_skill').addEvent('click', function(){
			if($(this).retrieve('spread')){
				return;
			}
			__this.special_skill_checker.extend(SpecialSkills.slice(28));
			$(this).store('spread', true);
			$(this).setStyle('display', 'none');
			
		});
		$$('#check_mode_panel input').addEvent('click', function(){
			var check_mode = this.value;		
			if(check_mode == __this.check_mode){return;}
			__this.set_check_mode(check_mode);
		});
	},

	init_search_btn: function(){
		var __this = this;
		$('btn_equip_search').addEvent('click', function(){
			__this.search();
		});
	},

	search: function(){
		var arg = {};
		arg['level_min'] = this.level_slider.value.min;
		arg['level_max'] = this.level_slider.value.max;
		//[name, checker, empty if check all]
		var check_items = [
			['kindid', this.kind_checker, true],
			['special_effect', this.special_effect_checker, false],
			['special_skill', this.special_skill_checker, false],
			['front_status', this.front_status_checker, true],
			['server_type', this.server_type_checker, true],
			['gem_value', this.gem_checker, false],
			['produce_from', this.produce_from_checker, true]
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
		arg['special_mode'] = this.check_mode;
		var sum_attr_type = this.sum_attr_checker.get_value();
		if(sum_attr_type){
			arg['sum_attr_type'] = sum_attr_type;
		}
		var txt_int_items = [
			['init_damage', 0, 10000, '���ˣ��������У�'],
			['init_damage_raw', 0, 10000, '���ˣ��������У�'],
			['all_damage', 0, 10000, '����'],
			['damage', 0, 10000, '�˺�'],
			['init_defense', 0, 10000, '����'],
			['init_hp', 0, 10000, '��Ѫ'],
			['init_dex', 0, 10000, '����'],
			['init_wakan', 0, 10000, '����'],
			['sum_attr_value', 0, 10000, '�����ܺ�'],
			['price_min', 0, MaxTradeYuan, '�۸�'],
			['price_max', 0, MaxTradeYuan, '�۸�'],
			['gem_level', 0, 20, '��ʯ�����ȼ�'],
			['hole_num', 0, 5, 'װ��������Ŀ'],
			['repair_fail', 0, 5, '����ʧ�ܴ���']
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
		if($('chk_star').checked){
			arg['star'] = 1;
		}
		/*
		if($('sel_server').value){
			arg['switchto_serverid'] = $('sel_server').value;
		}
		*/

		var suit_effect_ret = this.suit_value_getter.get_value();
		if(!suit_effect_ret.valid){
			alert(suit_effect_ret.value);
			return;
		}
		if(suit_effect_ret.value){
			arg['suit_effect'] = suit_effect_ret.value;
		}

		if ($("user_serverid") && $("user_serverid").value){
			arg['cross_buy_serverid'] = $("user_serverid").value;		
		}
		
		go_overall_search(arg)
	}
});

var SuitInputAutor = new Class({
	initialize: function(tagid, values, text, getter){
		this.tagid = tagid;
		this.values = values;
		this.text = text;
		this.getter = getter;
		this.init();
		var that = this;
		$('radio_' + this.tagid).addEvent('click', function(){
			that.getter.chose(that);
		});
		$('txt_' + this.tagid).addEvent('click', function(){
			that.getter.chose(that);
		});
	},

	init: function(){
		var dom_id = 'txt_' + this.tagid;
		var values = this.values;
		new AutoComplete($(dom_id),{
			"startPoint" : 1,
			"promptNum" : 20,
			"handle_func" : function(keyword){
				var result = new Array();
				for(var p in values){
					if(p.indexOf(keyword) != -1){
						result.push(p);	
					}
				}
				return result;
			},
			"callback": function(){}
		});
	},

	isChose: function(){
		var radio_id = 'radio_' + this.tagid;
		if($(radio_id).checked){return true;} else {return false;}
	},

	get_value: function(){
		var dom_id = 'txt_' + this.tagid;
		var values = this.values;
		var keyword = $(dom_id).value;
		if(!keyword || keyword.trim() == ''){
			return [true, null];
		}
		var result = [];
		for(var p in values){
			if(p.indexOf(keyword) != -1){
				result.push(values[p]);
			}
		}
		if (result.length == 0){
			return [false, this.text + keyword + 'û��ƥ��Ľ��'];
		}
		return [true, result.join(',')];
	},

	set_value: function(val){
		var dom_id = 'txt_' + this.tagid;
		var radio_id = 'radio_' + this.tagid;

		for(var p in this.values){
			if(val == this.values[p]){
				$(dom_id).set('value', p);
				$(radio_id).checked = true;
				this.getter.chose(this);
				return true;
			}
		}

		return false;
	},

	reset: function(){
		$('txt_' + this.tagid).set('value', '');
	}
});

var SuitSelectAutor = new Class({
	initialize: function(tagid, getter){
		this.tagid = tagid;
		this.getter = getter;
		var that = this;
		$('radio_' + this.tagid).addEvent('click', function(){
			that.getter.chose(that);
		});
		$('sel_' + this.tagid).addEvent('click', function(){
			that.getter.chose(that);
		});
	},

	isChose: function(){
		var radio_id = 'radio_' + this.tagid;
		if($(radio_id).checked){return true;} else {return false;}
	},

	get_value: function(){
		return [true, $('sel_' + this.tagid).value];
	},

	set_value: function(val){
		var options = $$('#sel_' + this.tagid + ' option');

		for(var i=0;i<options.length;i++){
			var el = options[i];
			if(el.value == val){
				el.selected = true;
				this.getter.chose(this);
				return true;
			}
		}

		return false;
	},

	reset: function(){
		$('sel_' + this.tagid).options[0].selected = true;
	}
});

var SuitValueGetter =new Class({
	initialize: function(){
		this.autors = [
			new SuitSelectAutor('short_cut', this),
			new SuitInputAutor('added_status', SuitAddedStatus, '����״̬', this),
			new SuitInputAutor('append_skill', SuitAppendSkills, '׷�Ӽ���', this),
			new SuitInputAutor('transform_skill', SuitTransformSkills, '�仯��֮', this),
			new SuitInputAutor('transform_charm', SuitTransformCharms, '�仯��֮', this)
		];
	},

	get_value: function(){
		for(var i=0; i<this.autors.length; i++){
			var autor = this.autors[i];
			if(!autor.isChose()){continue;}
			var autor_value = autor.get_value();
			var valid = autor_value[0];
			var msg = autor_value[1];
			if(!valid){
				return {valid:false, value: msg};
			} else {
				return {valid: true, value: msg};	
			}
		}
	},

	set_value: function(val){
		for(var i=0; i<this.autors.length; i++){
			var autor = this.autors[i];
			if(autor.set_value(val)){
				break;
			}
		}
	},

	chose: function(chose_autor){
		for(var i=0; i< this.autors.length; i++){
			if(this.autors[i] != chose_autor){
				this.autors[i].reset();
			}
		}	
	}
});

function get_suit_name_by_value(value){
	var name = get_name_from_conf(value, SuitEffects);
	if(name){return name;}
	name = get_name_from_dict(value, SuitAddedStatus);
	if(name){return name;}
	name = get_name_from_dict(value, SuitAppendSkills);
	if(name){return '׷�ӷ���' + name;}
	name = get_name_from_dict(value, SuitTransformSkills);
	if(name){return '������֮' + name;}
	name = get_name_from_dict(value, SuitTransformCharms);
	if(name){return '�仯��֮' + name;}
	return "";
}

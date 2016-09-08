/* overall search lingshi */
var OverallSearchAct = 'overall_search_lingshi';

var Kinds = [
	[61, '��ָ'],
	[62, '����'],
	[63, '����'],
	[64, '����']
];

var AddedAttr1 = [
	[1, '����'],
	[2, '�˺�'],
	[3, '�ٶ�'],
	[4, '����'],
	[5, '��'],
	[6, '������'],
	[7, '��������'],
	[8, '��ӡ'],
	[9, '���˽��'],
	[10, '����'],
	[11, '����']
];

var AddedAttr2 = [
	[12, '��Ѫ'],
	[13, '����'],
	[14, '����'],
	[15, '��������'],
	[16, '����������'],
	[17, '����'],
	[18, '��'],
	[19, '�ظ�']
];

var AddedAttrNum = [
	[2, '2��'],
	[3, '3��']
];

var AddedAttrRepeatNum = AddedAttrNum;

var ServerTypes = [
	[3, '3�����Ϸ�'],
	[2, '1��3���'],
	[1, '1���ڷ�']
];

var FairShowStatus = [
	[1, '���ϼ�'],
	[0, '��ʾ��']
];

var OVERALL_SEARCH_LINGSHI_ARGS_CONFIG = [
	['equip_level', '�ȼ�', 'slider'],
	['pass_fair_show', '����״̬', 'list', '#fair_show_panel li'],	
	['server_type', '����ʱ��', 'list', '#server_type_panel li'],	
	['kindid', '����', 'list', '#kind_panel li'],	
	['added_attr_num', '����������Ŀ', 'list', '#added_attr_num_panel li'],	
	['added_attr_repeat_num', '��ͬ������Ŀ', 'list', '#added_attr_repeat_num_panel li'],
	['added_attr_logic', '����ȫ������', 'radio', '#added_attr_logic_panel input'],
	['special_effect', '��������', 'checkbox', 'chk_has_eazy_effect'],
	['basic_attr_value', '��������'],
	['price', '�۸�', 'range'],
	['jinglian_level', '�����ȼ�'],
	[/^added_attr.(\d{1,2})$/, '��������', 'key_list', '#added_attr1_panel li'],
	[/^added_attr.(\d{1,2})$/, '��������', 'key_list', '#added_attr2_panel li']
];

function fix_overall_search_lingshi_args_config(){
	var basic_attr_config = [
		['damage', '��ָ���˺�'],
		['defense', '��ָ������'],
		['magic_damage', '���Ρ�����'],
		['magic_defense', '���Ρ�����'],
		['fengyin', '������ӡ'],
		['anti_fengyin', '��������'],
		['speed', '���Ρ��ٶ�']
	];

	for(var i=0;i<basic_attr_config.length;i++){
		var config = basic_attr_config[i];
		OVERALL_SEARCH_LINGSHI_ARGS_CONFIG.push(
			[config[0], config[1], 'func',
				function(val){return val},
				function(val){
					$('sel_basic_attr_type').set('value', this.key);
					$('txt_basic_attr_value').set('value', val);
				}.bind({'key': config[0]})
			]
		)
	}
};
fix_overall_search_lingshi_args_config();

var OverallLingshiSearcher = new Class({
	initialize: function(){
		this.server_type_checker = new ButtonChecker(ServerTypes, $('server_type_panel'));
		this.fair_show_checker = new ButtonChecker(FairShowStatus, $('fair_show_panel'));
		this.kind_checker = new ButtonChecker(Kinds, $('kind_panel'));
		this.added_attr1_checker = new ButtonChecker(AddedAttr1, $('added_attr1_panel'));
		this.added_attr2_checker = new ButtonChecker(AddedAttr2, $('added_attr2_panel'));
		this.added_attr_num_checker = new ButtonChecker(AddedAttrNum, $('added_attr_num_panel'));
		this.added_attr_repeat_num_checker = new ButtonChecker(AddedAttrNum, $('added_attr_repeat_num_panel'));
		this.select_server = new DropSelectServer($('sel_area'), $('sel_server'));
		$('sel_area').select_server = this.select_server;

		this.init_level_slider();
		this.init_search_btn();
		this.init_reset_btn();
		/*
		$("sel_basic_attr_type").addEvent("change", function(){
			var val = $(this).value;
			if (val.length > 0){
				$("txt_basic_attr_value").value = 1;
			} else {
				$("txt_basic_attr_value").value = "";			
			}
		});
		*/
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
			this.kind_checker
		];
		this.reset(checkers, []);
	},

	reset_detail: function(){
		var checkers = [
			this.fair_show_checker,
			this.added_attr1_checker,
			this.added_attr2_checker,
			this.added_attr_num_checker,
			this.added_attr_repeat_num_checker
		];
		var txt_inputs = [
			$('txt_basic_attr_value'),
			$('txt_price_min'),
			$('txt_price_max'),
			$('txt_jinglian_level')
		];
		this.reset(checkers, txt_inputs);
		$('sel_basic_attr_type').set('value', '');
		$('chk_has_eazy_effect').checked = false;
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
		this.level_slider = new LevelSlider($('equip_level_slider'), {
			grid: 40,
			offset: -23,
			range: [60, 160],
			step: 20,
			default_value: [60, 160]
		});
	},

	init_search_btn: function(){
		var __this = this;
		$('btn_lingshi_search').addEvent('click', function(){
			__this.search();
		});
	},

	search: function(){
		var arg = {};
		arg['equip_level_min'] = this.level_slider.value.min;
		arg['equip_level_max'] = this.level_slider.value.max;
		var check_items = [
			['pass_fair_show', this.fair_show_checker, true],
			['server_type', this.server_type_checker, true],
			['kindid', this.kind_checker, true],
			['added_attr_num', this.added_attr_num_checker, false],
			['added_attr_repeat_num', this.added_attr_repeat_num_checker, false]
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
		var added_attr_values = this.added_attr1_checker.get_value_array().concat(this.added_attr2_checker.get_value_array());
		
		if(added_attr_values.length>0){
			for(var i=0;i<added_attr_values.length;i++){
				var value = added_attr_values[i];
				arg['added_attr.' + value] = 1;
			}
		}
		$$('#added_attr_logic_panel input').each(function(el){
			if(el.checked){arg['added_attr_logic'] = el.value;}
		});
		if($('chk_has_eazy_effect').checked){
			arg['special_effect'] = 1;
		}
		
		var txt_int_items = [
			['basic_attr_value', 0, 10000, '��������'],
			['price_min', 0, MaxTradeYuan, '�۸�'],
			['price_max', 0, MaxTradeYuan, '�۸�'],
			['jinglian_level', 0, 16, '�۸�']
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
		
		// fix basic attr value 
		var basic_attr_type = $("sel_basic_attr_type").value;
		var basic_attr_value = $("txt_basic_attr_value").value;
		if (basic_attr_type.length > 0){
			if (basic_attr_value.length == 0){
				arg["basic_attr_value"] = 1;
			}
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
		var basic_attr_type = $('sel_basic_attr_type').value;
		if(basic_attr_type && arg.basic_attr_value){
			arg[basic_attr_type] = arg.basic_attr_value;
		}
		if(arg.basic_attr_value){
			delete arg.basic_attr_value;
		}
		if($('sel_server').value){
			arg['switchto_serverid'] = $('sel_server').value;
		}
		if ($("user_serverid") && $("user_serverid").value){
			arg['cross_buy_serverid'] = $("user_serverid").value;		
		}
		go_overall_search(arg);
	}
});

var LingshiDescParser = new Class({
	initialize: function(desc){
		this.desc = desc;
		this.parse();
	},
	
	parse: function(){
		var added_attrs = [];
		var lines = this.desc.split('#r').map(function(x){return x.trim()});
		lines = lines.filter(function(x){ return x!=''});
		for(var i=0; i<lines.length; i++){
			if (i<=1){continue;}
			var line = lines[i];
			if(line.slice(0,2) == '#G'){
				added_attrs.push(line.replace(/#G|#c[0-9A-F]{6}/g, "").replace(/^#+|#+$/g,''));
			}
		}
		this.added_attrs = added_attrs;
	},

	get_added_attr_by_index: function(i){
		if(this.added_attrs.length > i){
			return this.added_attrs[i];
		}
		return '';
	},
	
	get_all: function(){
		return this.added_attrs.join('<br />');
	}
});

function get_basic_attrs(equip){
	var basic_attrs = [];
	var keys = [
		['damage', '�˺�'],
		['defense', '����'],
		['magic_damage', '�����˺�'],
		['magic_defense', '��������'],
		['fengyin', '��ӡ���еȼ�'],
		['anti_fengyin', '�ֿ���ӡ�ȼ�'],
		['speed', '�ٶ�']
	];
	for(var i=0; i<keys.length; i++){
		var key_item = keys[i];
		var value = equip[key_item[0]];
		if(value){
			basic_attrs.push(key_item[1] + "&nbsp;+" + value);
		}
	}
	return basic_attrs.join("&nbsp;");
}

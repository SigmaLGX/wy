/* overall search yuanshen */
var OverallSearchAct = 'overall_search_yuanshen';

var YuanshenEquipTypes = [
	[4221, 'ǹ'], 
	[4222, '��'], 
	[4223, '��'], 
	[4224, '��'], 
	[4225, '��'], 
	[4226, '��'], 
	[4227, '˫��'], 
	[4228, 'Ʈ��'], 
	[4229, 'צ��'], 
	[4230, 'ħ��'], 
	[4231, '����'], 
	[4232, '˫��'], 
	[4233, 'ͷ��'], 
	[4234, '����'], 
	[4235, '���'], 
	[4236, 'ɴ��'], 
	[4237, 'Ь��'], 
	[4238, '����'], 
	[4239, '��׹'], 
	[4240, '��'], 
	[4241, '����'], 
	[4242, '����']
];

var ServerTypes = [
	[3, '3�����Ϸ�'],
	[2, '1��3���'],
	[1, '1���ڷ�']
];

var EquipAttrs = [
	['tizhi', '����'],
	['liliang', '����'],
	['moli', 'ħ��'],
	['naili', '����'],
	['minjie', '����']
];

var OVERALL_SEARCH_YUANSHEN_ARGS_CONFIG = [
	['equip_type', '����', 'list', '#equip_type_check_panel li'],
	['additional_attrs', '��������', 'list', '#equip_attr_check_panel li'],
	['server_type', '����ʱ��', 'list', '#server_type_panel li'],
	['attr_value', 'Ԫ������'],
	['attr_type', 'Ԫ����������', 'func',
		function(val){return $('attr_type').getSelected().get('text')[0]},
		function(val){$('attr_type').set('value', val)}],
	['addon_effect_chance', '�����ؼ�����'],
	['addon_skill_chance', '������Ч����'],
	['price', '�۸�', 'range']
];

var OverallYuanshenSearcher = new Class({
	initialize: function(){
		this.equip_type_checker = new ButtonChecker(YuanshenEquipTypes, $('equip_type_check_panel'));
		this.equip_attr_checker = new ButtonChecker(EquipAttrs, $('equip_attr_check_panel'));
		this.server_type_checker = new ButtonChecker(ServerTypes, $('server_type_panel'));
		this.select_server = new DropSelectServer($('sel_area'), $('sel_server'));
		this.init_search_btn();
		this.init_reset_btn();
	},

	init_reset_btn: function(){
		var __this = this;
		$('reset_equip_type').addEvent('click', function(){
			__this.equip_type_checker.reset_value();
		});
		$('reset_equip_attr').addEvent('click', function(){
			$('attr_type').selectedIndex = 0;
			__this.reset([__this.equip_attr_checker], [$('txt_attr_value'), $('txt_addon_skill_chance'), $('txt_addon_effect_chance')]);
		});
		$('reset_equip_price').addEvent('click', function(){
			__this.reset([], [$('txt_price_min'), $('txt_price_max')]);
		});
		$('reset_equip_server').addEvent('click', function(){
			__this.reset([__this.server_type_checker, __this.select_server], []);
		});
		$('reset_all').addEvent('click', function(){
			__this.equip_type_checker.reset_value();
			$('attr_type').selectedIndex = 0;
			__this.reset([__this.equip_attr_checker], [$('txt_attr_value'), $('txt_addon_skill_chance'), $('txt_addon_effect_chance')]);
			__this.reset([], [$('txt_price_min'), $('txt_price_max')]);
			__this.reset([__this.server_type_checker, __this.select_server], []);
		});
	},

	reset: function(checkers, txt_inputs){
		for(var i=0; i<checkers.length; i++){
			checkers[i].reset_value();	
		}
		for(var i=0; i<txt_inputs.length; i++){
			txt_inputs[i].set('value', '');
		}
	},

	init_search_btn: function(){
		var __this = this;
		$('btn_yuanshen_search').addEvent('click', function(){
			__this.search();
		});
	},

	search: function(){
		var arg = {};
		var check_items = [
			['equip_type', this.equip_type_checker, true],
			['additional_attrs', this.equip_attr_checker, true],
			['server_type', this.server_type_checker, true]
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
		arg['attr_type'] = $('attr_type').value;
		var txt_int_items = [
			['attr_value', 0, 10000, 'Ԫ������'],
			['addon_effect_chance', 0, 20, '�����ؼ�����'],
			['addon_skill_chance', 0, 20, '������Ч����'],
			['price_min', 0, MaxTradeYuan, '��ͼ۸�'],
			['price_max', 0, MaxTradeYuan, '��߼۸�']
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
			if(!(parseInt(value) >= item[1] && parseInt(value)<=item[2])){
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

function search_yuanshen_order_by(order_key, default_order){
	if(CurSearchValue.order_by.key == order_key){
		CurSearchValue.order_by.sort = CurSearchValue.order_by.sort == 'ASC'? 'DESC': 'ASC';
	} else {
		CurSearchValue.order_by.key = order_key;	
		if(default_order != undefined)
			CurSearchValue.order_by.sort = default_order;
		else
			CurSearchValue.order_by.sort = 'DESC';
	}
	overall_search(CurSearchValue.arg, null, CurSearchValue.order_by);
}

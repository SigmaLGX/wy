/*
**
*/
var SuitEffects = [
	[1,"����"],[2,"������"],[3,"��ջ���"],[4,"����"],[5,"���컨��"],[6,"��������"],[7,"�ն�����"],
	[8,"����֮Ȫ"],[50,"���Ǿ�"], [51,"��ӿ"], [9,"������֮���"],[10,"������֮����"],[11,"������֮��ʦ"],[12,"������֮��������"],[13,"������֮ܽ������"],[14,"������֮Ѳ������"],
	[15,"������֮��������"],[16,"������֮����"],[17,"������֮��"],[18,"������֮��Ѫ��"],[19,"������֮��ƿŮ�"],[20,"������֮�ɷ�Ů�"],[21,"������֮���Ů�"],
	[22,"������֮����"],[23,"������֮��ө����"],[24,"������֮�������"],[25,"������֮������"],[26,"������֮���"],[27,"������֮ҹ��ɲ"],[28,"������֮��ħ��"],
	[29,"������֮���컢"],[30,"������̤֮����"],[31,"������֮��������"],[32,"������֮����"],[33,"������֮������"],[34,"������֮������"],[35,"������֮����"],
	[36,"������֮����"],[37,"������֮��«����"],[38,"������֮è�飨���ͣ�"],[39,"������֮�񱪣����ͣ�"],[40,"������֮Ы�Ӿ�"],[41,"������֮������"],[42,"������֮��ü���"],
	[43,"������֮������Գ"],[44,"������֮���޿��ܹ�"],[45,"������֮���޿�����"],[46,"������֮�����޺�"],[47,"������֮��������"],[48,"������֮����ɳ��"],[49,"������֮������"]
];

var RoleSearchFormInit = new Class({
    initialize : function(){
    
    	this.gen_equip_levels();
		this.init_taozhuang();
    	
    	this.reg_advance_search_fold_ev();
    	
    	this.reg_item_selected_ev();
    	
    	this.reg_reset_ev();
    	
    	this.select_server = new DropSelectServer($('sel_area'), $('switchto_serverid'));
		$('sel_area').select_server = this.select_server;
    	
    	$("btn_do_query").addEvent("click", function(){
    		submit_query_form();
    	});
	},

	init_taozhuang: function(){
		var con = $('taozhuang_type');
		for(var i=0; i<SuitEffects.length; i++){
			var item = SuitEffects[i];
			var option = new Element('option', {'value': item[0], 'html': item[1]});
			con.grab(option);
		}
	},
    
    gen_equip_levels : function(){
    	var el_list = [$("equip_level_min"), $("equip_level_max")];
    	for (var i=0; i < el_list.length; i++){
    		var el = el_list[i];
    		var op = new Element("option", {"text":"����", "value":""});
    		op.inject(el);
    		
    		var j = 10;
    		while(j <= 160){
	    		var op = new Element("option", {"text":j, "value":j});
    			op.inject(el);
    			j = j + 10;    			
    		}	
    	}
    },
    
    reg_advance_search_fold_ev : function(){
    	$("btn_advance_search_fold").addEvent("click", function(){
    		if ($("advance_search_box").getStyle("display") == "block"){
    			$("advance_search_box").setStyle("display", "none");
    		} else {
    			$("advance_search_box").setStyle("display", "block");    		
    		}
    	});
    	
    },
    
    
    reg_item_selected_ev : function(){
		var item_list = $$("#school_list li");
		//item_list.extend($$("#school_list li"));
		item_list.extend($$("#race_list li"));
		item_list.extend($$("#equip_teji li"));
		item_list.extend($$("#pet_box li"));
		item_list.extend($$("#xiangrui_box li"));
		item_list.extend($$("#server_type li"));
		item_list.extend($$("#school_change_list li"));
		
		for (var i=0; i < item_list.length; i++){
			var item = item_list[i];
			item.addEvent("click", function (){
				var el = $(this);
				if (el.hasClass("on")){
					el.removeClass("on");
				} else {
					el.addClass("on");
				}
			})
		}
    },

	empty_input_box : function(item_list){
		for (var i=0; i < item_list.length; i++){
			$(item_list[i]).value = "";
		}
	},
	
	clear_select_items : function(item_list){
		for (var i=0; i < item_list.length; i++){
			var item = item_list[i];
			if (item.hasClass("on")){
				item.removeClass("on");
			}
		}
	},
	      
    reg_reset_ev : function(){
    	var self = this;
    	$("reset_role_basic").addEvent("click", function(){
    		self.empty_input_box($$("#role_basic_panel input"));
	    	self.clear_select_items($$("#school_list li"));
    		self.clear_select_items($$("#race_list li"));
	    	$("zhuang_zhi").value = "";
	    	return false;		
    	});
    	
		$("reset_role_attr").addEvent("click", function(){
    		self.empty_input_box($$("#role_attr_panel input"));
			return false;
    	});
    	
		$("reset_role_expt").addEvent("click", function(){
    		self.empty_input_box($$("#role_expt_panel input"));
			return false;
    	});
    	
		$("reset_role_skills").addEvent("click", function(){
    		self.empty_input_box($$("#role_skills_panel input"));
    		self.empty_input_box($$("#role_skills_panel select"));
			return false;
    	});
    	
		$("reset_role_carry").addEvent("click", function(){
			self.empty_input_box($$("#role_carry_panel input"));
			self.empty_input_box($$("#role_carry_panel select"));

			$("teji_match_signle").checked = true;
			$("teji_match_all").checked = false;			
			self.clear_select_items($$("#equip_teji li"));

			$("pet_match_signle").checked = true;
			$("pet_match_all").checked = false;
			self.clear_select_items($$("#pet_box li"));
			
			$("xiangrui_match_signle").checked = true;
			$("xiangrui_match_all").checked = false;
			self.clear_select_items($$("#xiangrui_box li"));			
			return false;
    	});
    	
		$("reset_role_other").addEvent("click", function(){
    		self.empty_input_box($$("#role_other_box input"));
    		self.empty_input_box($$("#role_other_box select"));
			return false;
    	});

		$("reset_server_selected").addEvent("click", function(){
			self.select_server.reset_value();
    		self.empty_input_box($$("#server_info_box input"));
    		//self.empty_input_box($$("#server_info_box select"));
			self.clear_select_items($$("#server_type li"));			
			return false;
    	});
    	
    	
    	$("reset_all").addEvent("click", function(){
    		$("reset_role_basic").fireEvent("click");
    		$("reset_role_attr").fireEvent("click");
    		$("reset_role_expt").fireEvent("click");
    		$("reset_role_skills").fireEvent("click");
    		$("reset_role_carry").fireEvent("click");
    		$("reset_role_other").fireEvent("click");
    		$("reset_server_selected").fireEvent("click");

    		return false;
    	});
    	
    	
    }
});

function check_int_args(args_config_list)
{
	var re = /^[0-9]\d*$/;
	
	var args = {};
	
	for (var i=0; i < args_config_list.length; i++){
		var item = args_config_list[i];
		var item_value = $(item[0] + "").value.trim();		
		if (item_value.length == 0){
			continue;
		}
		
		if (!re.test(item_value) || item_value.length > 10){
			return {"result":false, "msg":item[1] + "��д��������������"}
		}
		
		item_value = parseInt(item_value);
		if (item_value <= 0){
			continue;
		}
		
		args[item[0]] = item_value;
	}
	
	return {"result":true, "args":args};
}

function get_item_selected(item_list)
{
	var value_list = [];
	for (var i=0; i < item_list.length; i++){
		var item = item_list[i];
		if (item.hasClass("on")){
			value_list.push(item.getAttribute("data_value"));
		}
	}
	/*
	if (value_list.length == item_list.length){
		return "";
	} else {
		return value_list.join(",");	
	}
	*/
	return value_list.join(",");	
}

OVERALL_SEARCH_ROLE_ARGS_CONFIG = [
		['school', '����', 'list', '#school_list li'],
		['race', '��ɫ', 'list', '#race_list li'],
		['level', '�ȼ�', 'range'],
		['price', '�۸�', 'range'],
		['sum_exp', '��ɫ�ܾ���', 'range'],
		['qian_neng_guo', 'Ǳ�ܹ�'],
		['expt_gongji','��������'],
		['expt_fangyu', '��������'],
		['expt_fashu', '��������'],
		['expt_kangfa', '��������'],
		['max_expt_gongji', '��������'],
		['max_expt_fangyu', '��������'],
		['max_expt_fashu', '��������'],
		['max_expt_kangfa', '��������'], 
		['expt_lieshu', '��������'],
		['expt_total', '�����ܺ�'], 
		['bb_expt_gongji', '��������'],
		['bb_expt_fangyu', '��������'], 
		['bb_expt_fashu', '��������'],
		['bb_expt_kangfa', '��������'], 
		['bb_expt_total', '�����ܺ�'],
		['school_skill_num','ʦ�ż�����'],
		['school_skill_level', 'ʦ�ż��ܵȼ�'],
		['zhuang_zhi', '����'],

		['shang_hai' , '�˺�'],
		['ming_zhong','����'],
		['ling_li' , '����'],
		['fang_yu','����'],
		['hp' , '��Ѫ'],
		['speed', '�ٶ�'],
		['fa_shang', '����'],
		['fa_fang', '����'],
		['skill_qiang_shen', 'ǿ��'], 
		['skill_shensu', '����'],
		['skill_qiang_zhuang','ǿ��'],
		['skill_ming_xiang', 'ڤ��'],
		['skill_dazao','���켼��'], 
		['skill_pengren','��⿼���'],
		['skill_caifeng', '�÷켼��'],
		['skill_zhongyao','��ҩҽ��'],
		['skill_qiaojiang', '�ɽ�֮��'],
		['skill_lingshi', '��ʯ����'],
		['skill_lianjin', '������'],
		['skill_jianshen','������'],
		['skill_yangsheng', '����֮��'],
		['skill_anqi', '��������'],
		['skill_taoli', '���뼼��'],
	   	['skill_zhuibu', '׷������'],
		['skill_ronglian', '��������'],
		['skill_danyuan', '��Ԫ�û�'],
	   	['skill_miaoshou', '���ֿտ�'],
		['skill_baoshi', '��ʯ����'],
	   	['skill_qimen','���Ŷݼ�'],
		['skill_gudong','�Ŷ�����'],
		['skill_xianling','�������'],
		['skill_jianzhu', '����֮��'],
		['skill_bianhua', '�仯֮��'],
		['skill_cuiling', '����֮��'],
		['skill_huoyan', '���۽�'],
	   	['max_equip_duan_zao','Я��װ����߶���'],
		['max_weapon_shang_hai', 'Я�������������'],
		['max_necklace_ling_li', 'Я�������������'],
		['pet_skill_num', '��������'],
	   	['pet_advance_skill_num', '�߼���������'],
		['xian_yu', '����'],
		['cash','�ֽ�'],
		['upexp','��ǰ����'],
		['badness','�ƶ�'],
		['school_offer','�Ź�'],
		['org_offer', '�ﹱ'],
		['cheng_jiu', '�ɾ�'],
		['body_caiguo','Ⱦɫ�ۺϲ�Ч����'],
		['all_caiguo','����Ⱦɫ����ʹ���'], 
		['box_caiguo', '����Ⱦɫ������'],
		['clothes_num', '��������'],
		['taozhuang_num', '��װ����'],
		['taozhuang_type', '��װ����'],
		['is_niceid', '�Ƿ�����'],
	   	['has_community', '����'],
		['fangwu_level', '����'],
	   	['tingyuan_level', 'ͥԺ'],
		['muchang_level', '����'],
		['switchto_serverid', 'ת����'], 
		['is_married', '���'],
		['is_tongpao', 'ͬ��'],
		//range
		['equip_level', 'װ���ȼ�', 'range'],
		//str list
		['school_change_list', '��ʷ����', 'list', '#school_change_list li'],
		['teji_list', '�ؼ�', 'list', '#equip_teji li'],
		['pet_type_list', '�ٻ���', 'list', '#pet_box li'],
		['xiangrui_list', '����', 'list', '#xiangrui_box li'],
		['server_type', '����ʱ��', 'list', '#server_type li'],
		//radio
		['teji_match_all', '����ȫ���ؼ�', 'radio'],
		['pet_match_all', '����ȫ���ٻ���', 'radio'],
		['xiangrui_match_all', '����ȫ������', 'radio']

];


function submit_query_form()
{
	var args_config = [
		["level_min","��ɫ��͵ȼ�"],["level_max","��ɫ��ߵȼ�"],
		["shang_hai" , "�˺�"], ["ming_zhong","����"],
		["ling_li" , "����"], ["fang_yu","����"],
		["hp" , "��Ѫ"], ["speed", "�ٶ�"],
		["fa_shang", "����"],["fa_fang", "����"],
		["qian_neng_guo", "Ǳ�ܹ�"], ["expt_gongji","��������"],
		["expt_fangyu", "��������"], ["expt_fashu", "��������"],
		["expt_kangfa", "��������"], ["max_expt_gongji", "��������"],
		["max_expt_fangyu", "��������"], ["max_expt_fashu", "��������"],
		["max_expt_kangfa", "��������"], ["expt_lieshu", "��������"],
		["expt_total", "�����ܺ�"], ["bb_expt_gongji", "��������"],
		["bb_expt_fangyu", "��������"], ["bb_expt_fashu", "��������"],
		["bb_expt_kangfa", "��������"], ["bb_expt_total", "�����ܺ�"],
		["skill_qiang_shen", "ǿ��"], ["skill_shensu", "����"],
		["skill_qiang_zhuang","ǿ��"],["skill_ming_xiang", "ڤ��"],
		["skill_dazao","���켼��"], ["skill_pengren","��⿼���"],
		["skill_caifeng", "�÷켼��"],["skill_zhongyao","��ҩҽ��"],
		["skill_qiaojiang", "�ɽ�֮��"],["skill_lingshi", "��ʯ����"],
		["skill_lianjin", "������"],["skill_jianshen","������"],
		["skill_yangsheng", "����֮��"],["skill_anqi", "��������"],
		["skill_taoli", "���뼼��"], ["skill_zhuibu", "׷������"],["skill_ronglian", "��������"],
		["skill_danyuan", "��Ԫ�û�"], ["skill_miaoshou", "���ֿտ�"],
		["skill_baoshi", "��ʯ����"], ["skill_qimen","���Ŷݼ�"],
		["skill_gudong","�Ŷ�����"],["skill_xianling","�������"],
		["skill_jianzhu", "����֮��"],["skill_bianhua", "�仯֮��"],["skill_cuiling", "����֮��"],
		["skill_huoyan", "���۽�"], ["max_equip_duan_zao","Я��װ����߶���"],
		["max_weapon_shang_hai", "Я�������������"],["max_necklace_ling_li", "Я�������������"],
		["pet_skill_num", "��������"], ["pet_advance_skill_num", "�߼���������"],
		["xian_yu", "����"],["cash","�ֽ�"],
		["upexp","��ǰ����"],["badness","�ƶ�"],
		["school_offer","�Ź�"],["org_offer", "�ﹱ"],
		["cheng_jiu", "�ɾ�"],["body_caiguo","Ⱦɫ�ۺϲ�Ч����"],["all_caiguo","����Ⱦɫ����ʹ���"], 
		["box_caiguo", "����Ⱦɫ������"],["clothes_num", "��������"],
		["zhuang_zhi", "����"],["school_skill_num","ʦ�ż�����"],
		["equip_level_min", "װ����͵ȼ�"], ["equip_level_max", "װ����ߵȼ�"],
		["taozhuang_num", "��װ����"], ["taozhuang_type", "��װ����"],
		["is_niceid", "�Ƿ�����"], ["has_community", "����"],
		["fangwu_level", "����"], ["tingyuan_level", "ͥԺ"],
		["muchang_level", "����"],["switchto_serverid", "ת����"], 
		["school_skill_level", "ʦ�ż��ܵȼ�"],
		['sum_exp_min', '��ɫ�ܾ���'],
		['sum_exp_max', '��ɫ�ܾ���']
	];
	var input_check = check_int_args(args_config);
	if (!input_check["result"]){
		alert(input_check["msg"]);
		return;
	}
	var args = input_check["args"];
	
	// check level range
	if (args["level_min"] != undefined && args["level_max"] != undefined){
		if (args["level_max"] < args["level_min"]){
			alert("�����ȼ���Χ��д����");
			return false;
		}
	}
	
	if (args["level_min"] != undefined && args["level_max"] == undefined){
		args["level_max"] = 200;
	}
	
	
	if ($("price_min").value.trim().length > 0){
		var price_min_value = parseFloat($("price_min").value);
		if (!price_min_value || price_min_value <= 0){
			alert("���������ͼ۸��д���");
			return false;
		}
		args["price_min"] = parseInt(price_min_value * 100);		
	}

	if ($("price_max").value.trim().length > 0){
		var price_max_value = parseFloat($("price_max").value);
		if (!price_max_value || price_max_value <= 0){
			alert("���������߼۸��д���");
			return false;
		}
		args["price_max"] = parseInt(price_max_value * 100);		
	}

	// check price range
	if (args["price_min"] != undefined && args["price_max"] != undefined){
		if (args["price_max"] < args["price_min"]){
			alert("�����۸�Χ��д����");
			return false;
		}
	}

	if(args['sum_exp_min'] && args['sum_exp_max'] && args['sum_exp_min'] > args['sum_exp_max']){
		alert('��ɫ�ܾ�����Сֵ���ܴ������ֵ');
		return false;
	}

	var school = get_item_selected($$("#school_list li"));
	if (school.length > 0){
		args["school"] = school;
	}

	var school_change_list = get_item_selected($$("#school_change_list li"));
	if (school_change_list.length > 0){
		args["school_change_list"] = school_change_list;
	}

	var race = get_item_selected($$("#race_list li"));
	if (race.length > 0){
		args["race"] = race;
	}
	
	var teji_list = get_item_selected($$("#equip_teji li"));
	if (teji_list.length > 0){
		if ($("equip_level_min").value.length == 0 && $("equip_level_max").value.length == 0){
			alert("��ѡ��װ���ȼ�");
			return false;
		}
		args["teji_list"] = teji_list;
	}
	
	var pet_type_list = get_item_selected($$("#pet_box li"));
	if (pet_type_list.length > 0){
		args["pet_type_list"] = pet_type_list;
	}
	
	var xiangrui_list = get_item_selected($$("#xiangrui_box li"));
	if (xiangrui_list.length > 0){
		args["xiangrui_list"] = xiangrui_list;
	}
	
	var server_type = get_item_selected($$("#server_type li"));
	if (server_type.length > 0){
		args["server_type"] = server_type;
	}
	
	var is_married = $("is_married").value;
	if (is_married.length > 0){
		args["is_married"] = is_married;	
	}
	
	var is_tongpao = $("is_tongpao").value;
	if (is_tongpao.length > 0){
		args["is_tongpao"] = is_tongpao;	
	}
	
	if (Object.getLength(args) == 0){
		alert("��ѡ��Ĳ�ѯ�������٣���ѡ������ѯ����");
		return false;
	}
	
	
	if ($("teji_match_all").checked){
		args["teji_match_all"] = 1;
	}
	
	if ($("pet_match_all").checked){
		args["pet_match_all"] = 1;
	}
	
	if ($("xiangrui_match_all").checked){
		args["xiangrui_match_all"] = 1;
	}
	
	$("query_args").value = JSON.encode(args);

	update_overall_search_saved_query();

	document.query_form.submit();
}    

function add_orderby_ev()
{
	var el_list = $$("#order_menu a");
	for (var i=0; i < el_list.length; i++){
		var el = el_list[i];
		el.addEvent("click", function(){
			change_query_order($(this));
			return false;
		})
	}
	
}

function show_loading()
{
	show_layer_center($("LoadingCover"), $("LoadingImg"));
}

function loading_finish()
{
	$("LoadingCover").setStyle("display", "none");
	$("LoadingImg").setStyle("display", "none");	
}

var NextProc = null;

function show_query_result(result, txt)
{
	loading_finish();
	if (result["status"] == QueryStatus["need_captcha"]){
		show_captcha_layer();
		return;
	}
	
	NextProc = null;
	
	if (result["status"] != 0){
		alert(result["msg"]);
		return;
	}
	
	if (result["equip_list"].length == 0){
		render_to_replace("query_result", "no_result", {});
		return;
	}
	
	for(var i=0; i < result["equip_list"].length; i++){
		var equip = result["equip_list"][i]
		equip["icon"] = ResUrl + '/images/smallface/' + get_role_iconid(equip["icon"]) + '.gif'
	}
	
	
	var ctx = {
		"role_list" : result["equip_list"],
		"pager" : result["pager"]
	}
	QueryResult = result["equip_list"];
	
	render_to_replace("query_result", "role_list_templ", ctx);
	
	// add order event
	add_orderby_ev();
	
	// add pager info
	render_to_replace("pager_bar", "pager_templ", {"pager":result["pager"]});
	
	// reg role tips
	var el_list = $$("#soldList a.soldImg");
	for (var i=0; i < el_list.length; i++)
	{
		var el = el_list[i];
		el.addEvent("mouseover", function(){
			show_role_tips_box($(this));
		});
		el.addEvent("mouseout", hidden_tips_box);
	}	
	
}

function show_error()
{
	loading_finish();
	alert("ϵͳ��æ�����Ժ�����");
}

var OrderInfo = {"field_name":"", "order":""};
var QueryResult = null;
function change_query_order(el)
{
	var attr_name = el.getAttribute("data_attr_name");
	var new_order = "DESC"
	var orderby = attr_name + " " + new_order;
	if (OrderInfo["field_name"] == attr_name){
		var new_order = OrderInfo["order"] == "ASC" ? "DESC":"ASC";
		orderby = attr_name + " " + new_order;
	}
	OrderInfo["field_name"] = attr_name;
	OrderInfo["order"] = new_order;

	QueryArgs["order_by"] = orderby;
	do_query(1);	
}

function do_query(page_num)
{
	NextProc = "do_query(" + page_num + ")";
	
	var query_url = CgiRootUrl + "/xyq_overall_search.py";
	QueryArgs["act"] = "overall_search_role";
	QueryArgs["page"] = page_num;
	var Ajax = new Request.JSON({
		"url" : query_url,
		"onSuccess":show_query_result,
		"onException" : show_error,
		"onError" : show_error,
		"noCache" : true,
		"onFailure" : show_error
	});
	show_loading();
	Ajax.get(QueryArgs);
}

function goto(page_num)
{
	do_query(page_num);
}

function make_img_name(img_name)
{
	var img_id = parseInt(img_name)
	var addon = "";
	if (img_id < 10){
		addon = "000";
	} else if (img_id >= 10 && img_id < 100){
		addon = "00";
	} else if (img_id >= 100 && img_id < 1000){
		addon = "0";
	} 
	return addon + img_name;
}

function get_skill_icon(skillid)
{
	var img_name = make_img_name(skillid) + ".gif";
	return ResUrl + "/images/role_skills/" + img_name;
}
	
var Config = new RoleNameConf();
function show_role_tips_box(el)
{
	var game_ordersn = el.getAttribute("data_game_ordersn");
	
	var role = null;
	for (var i=0; i < QueryResult.length; i++){
		if (QueryResult[i]["game_ordersn"] == game_ordersn){
			role = QueryResult[i];
			break;
		}
	}
	if (!role){
		return;
	}

	// parse school info
	var school_skills = JSON.decode(role["school_skills"]);
	var school_skill_info = {};
	for (var i=1; i < 8; i++){
		school_skill_info["school_skill" + i + "_icon"]  = EmptySkillImg;
		school_skill_info["school_skill" + i + "_grade"] = "";
		school_skill_info["school_skill" + i + "_name"]  = "";		
	}
	 	
	for (var i=0; i < school_skills.length; i++){
		var skill_id = school_skills[i]["id"];
		var level = school_skills[i]["level"];
		var pos = Config.skill["school_skill"][skill_id]["pos"];
		var name = Config.skill["school_skill"][skill_id]["name"];
		school_skill_info["school_skill" + pos + "_icon"]  = get_skill_icon(skill_id);
		school_skill_info["school_skill" + pos + "_grade"] = level;
		school_skill_info["school_skill" + pos + "_name"]  = name;				
	}
	role["icon"] = ResUrl + '/images/bigface/' + get_role_iconid(role["race"]) + ".gif";
	
	var ctx = {"role":role, "school_skill":school_skill_info};
	render_to_replace("RoleTipsBox", "role_tips_templ", ctx);
	
	adjust_tips_position(el, $("RoleTipsBox"));	
}

function hidden_tips_box()
{
	$("RoleTipsBox").setStyle("display", "none");	
}

/*
 *
 */

var PutOnSale = new Class({
	initialize : function(){
		this.max_equip_price  = MaxPrice;
		this.min_equip_price = MinPrice;
		
		this.poundage = 0;
		this.overall_poundage = 0;
		
		this.init_check_flag();
		
		this.last_price_value = null;
		
		this.poundage_cache = {};
		
		this.first_onsale_price = FirstOnsalePrice;
		this.price_change_min_range = PriceRange;
	},

	init_check_flag : function(){
		this.pass_basic_check      = false;
		this.get_poundage_finished = false;	
		this.if_price_ok = false;
	},

	msg : function (msg){
		$("extrainfo").innerHTML = msg;
	},
	
	check_price_range : function(price){
		
	},

	query_poundage : function(){
		if (!this.pass_basic_check){
			return;
		}
		
		var price = $("price").value;
		var is_overall = $('chk_overall').checked ? 1 : 0;
		
		var cache_key = price + '_' + is_overall;
		if (this.poundage_cache[cache_key]){
			this.poundage = this.poundage_cache[cache_key].poundage;
			this.overall_poundage = this.poundage_cache[cache_key].overall_poundage;
			var income    = Math.round((price - this.poundage - this.overall_poundage)* 100) / 100;
			var msg = "���׳ɹ�����ȡ��Ϣ�ѣ�" + this.poundage + "Ԫ, ";
			if(this.overall_poundage > 0){
				msg += "ȫ���ƹ���Ϣ��"+ this.overall_poundage +"Ԫ, ";
			}
			msg += "�����õ�:"+ income + "Ԫ!";
			this.msg(msg);
			this.get_poundage_finished = true;
			this.if_price_ok = true;
			return;
		}
		
		var query_url  = CgiRootUrl + "/usertrade.py"	
		var self_obj = this;
		function display_poundage(data, txt){
			self_obj.display_poundage(data, txt);
		}
		$("price").disabled = true;
		if(!IsOverall){
			$("chk_overall").disabled = true;
		}

		var Ajax = new Request.JSON({"url":query_url,"onSuccess":display_poundage});
		this.msg("���ڼ�����Ϣ�ѣ����Ժ�...");
		Ajax.get({
			"act" : "get_poundage",
			"equipid" : $("equipid").value,
			"serverid" : ServerInfo["server_id"],
			"price" : price,
			"is_overall": is_overall
		});
		
	},

	display_poundage : function(result, txt){
		$("price").disabled = false;
		if(!IsOverall){
			$("chk_overall").disabled = false;
		}
		
		if (!this.pass_basic_check){
			return;
		}
		
		if (result["status"] != 1){
			if (this.pass_basic_check){
				this.get_poundage_finished = true;
				this.msg(result["msg"]);
				alert(result["msg"]);
			}	
			return;
		}
		this.poundage = result["poundage"];
		this.overall_poundage = result["overall_poundage"];
		var price   = $("price").value;
		var income  = Math.round((price - this.poundage - this.overall_poundage) * 100) / 100;

		var is_overall = $('chk_overall').checked ? 1 : 0;
		
		this.poundage_cache[price+'_'+is_overall] = {
			poundage: this.poundage, 
			overall_poundage: this.overall_poundage
		};
		
		var msg = "���׳ɹ�����ȡ��Ϣ�ѣ�" + this.poundage + "Ԫ, ";
		if(this.overall_poundage > 0){
			msg += "ȫ���ƹ���Ϣ�ѣ�"+ this.overall_poundage +"Ԫ, ";
		}
		msg += "�����õ�:"+ income + "Ԫ!";
		this.msg(msg);
		this.get_poundage_finished = true;
		this.if_price_ok = true;
	},

	check_form: function(){
		if (!this.if_price_ok){
			if ($("price").value.trim().length == 0){
				alert("��������Ʒ�۸�");
				return false;
			} else {
				alert($("extrainfo").innerHTML);
				return false;
			}
		}
		
		// check roleid
		if ($("appoint_buyer_box").checked){
			var roleid = $("appointed_roleid").value;
			var roleid_match = /^[1-9][0-9]*$/;
			if (!roleid_match.test(roleid)){
				alert("����д��ȷ�Ľ�ɫID��������Ҫָ����ң���ȡ��ѡ��");
				return false;
			}
		}

		if(PassFairShow == 0){
			if(!this.fair_pop){
				var __this = this;
				var pop = this.fair_pop = new Popup($('fair_confirm_pop'));
				$('btn_do_sale').addEvent('click', function(){
					pop.hide();
					__this.submit_form();
				});
				$('btn_cancel_sale').addEvent('click', function(){
					pop.hide();
				});
			}
			this.fair_pop.show();
		} else {
			this.submit_form();	
		}
	},
	
	submit_form : function(){
		var msg = "��ȷ��:\n-------------------------------------\n";
		
		msg += "[����]:  " + $('equip_name_panel').get('html') + "\n"; 
		msg += "[�۸�]:  "     + $("price").value + "Ԫ\n";
		msg += "[��Ϣ��]:  "   + this.poundage + "Ԫ\n";
		if(this.overall_poundage>0){
			msg += "[ȫ���ƹ���Ϣ��]:  "  + this.overall_poundage + "Ԫ\n";
		}
		msg += "[�ϼ�����]:  " + $("days").value + "��\n";
		msg += "[ָ�����ID]:  " + ($("appoint_buyer_box").checked ? $("appointed_roleid").value : "δָ��") + "\n";
		msg += "[�Ƿ���ܻ���]:  " + $("bargain").options[$("bargain").selectedIndex].text + "\n\n";
		if(this.first_onsale_price == 0)
		{
			var min_price = this.price_change_min_range * parseFloat($("price").value);
			msg += "����ǽ�ɫ����Ʒ���Ժ�ļ۽����ܵ���" + min_price + "Ԫ, ��������Ϸ�����¼��ۡ�\n���׿ͷ��������ڵ绰����Ҫ�����ʺ�������ܱ���";
		}
		
		if (confirm(msg) == false)
			return ;
		document.magic.submit();		
	},

	check_price : function(){
		this.init_check_flag();
		//var price_str = $("price").value;
		var price     = $("price").value;
		
		var pattern =/^[0-9]+[\.]?[0-9]{0,2}$/;
		
		if (price == ""){
			this.msg("��������Ʒ�۸�");
		}
		else if (pattern.test(price) == false){
			this.msg("��������ȷ�ļ۸�(�۸��ܳ�����λС��)!");
		}
		else if (price < this.min_equip_price){
			this.msg("�۸�������" + this.min_equip_price + "Ԫ!");
		}
		else if (price > this.max_equip_price){
			this.msg("�۸��ܳ���" + this.max_equip_price + "Ԫ!");
		} else {
			this.msg("");
			this.pass_basic_check = true;
		}
	}	
	
});

var on_sale_obj = new PutOnSale();

function basic_check(){
	on_sale_obj.check_price();
}

function cal_poundage(){
	basic_check();
	on_sale_obj.query_poundage();
}

function appoint_buyer_check(el)
{
	if (el.checked){
		$("appointed_roleid").disabled = false;
	} else {
		$("appointed_roleid").disabled = true;
	}
}

function confirm_form(){
	if(!on_sale_obj.get_poundage_finished)
		on_sale_obj.query_poundage();
	on_sale_obj.check_form();
}

function overall_check(){
	if(CanSetOverall){
		$('overall_panel').setStyle('display', '');
		if(IsOverall){
			var chk = $('chk_overall');
			chk.checked = true;
			chk.disabled = true;
		}
	}
}

function check_appointed_roleid(){
	if(EquipStorageType ==  StorageStype['money']){
		$('appoint_buyer_box').checked = false;	
	} else {
		$('appointed_buyer_panel').setStyle('display', '');
	}
}

function init_page()
{
	$("top_sell_menu").addClass("on");
	$("menu_equip_store").addClass("on");
	cal_poundage();
	$("days").value = 14;

	if(EquipStorageType ==  StorageStype['money']){
		$("bargain").value = 0;
	}else{
		$("bargain").value = 1;
	}

	$("appoint_buyer_box").checked = false;
	appoint_buyer_check($("appoint_buyer_box"));
	overall_check();
	check_appointed_roleid();
}

window.addEvent('domready', function() {
   init_page();
});

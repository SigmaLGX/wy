var ServiceSellNotify = 1;
var ServiceSearchMonthly = 2;

var ServiceNameInfo = {
	1 : "�۳���Ʒ֪ͨ����",
	2 : "ȫ��װ����������"
};

var NotifyEquipType = {
	1 : "����",
	2 : "�ٻ���",
	3 : "��Ϸ��",
	4 : "��ɫ"
};

var ServiceOrderStatus = {
	"unpaid" : {"name":"δ����", "value":0},
	"paid" : {"name":"�Ѹ���", "value":1},
	"suc" : {"name":"������", "value":2},
	"refundment" : {"name":"�˿���", "value":3},
	"refundment_finish" : {"name":"�˿����", "value":4}
};

var ServiceStatus = {
	"valid" : {"name":"����", "value":0},
	"expire" : {"name":"�ѹ���", "value":1},
	"cancel" : {"name":"��ȡ��", "value":2}
};

function get_service_order_status_desc(status_value)
{
	for (var status_name in ServiceOrderStatus){
		if (ServiceOrderStatus[status_name]["value"] == status_value){
			return ServiceOrderStatus[status_name]["name"];
		}
	}
	return "";
}
function add_sell_notify_order()
{
	// get notify type
	var notify_type_list = [];
	var notify_type_box_list = $$("input[name='notify_equip_type']");
	for (var i=0; i < notify_type_box_list.length; i++){
		if (notify_type_box_list[i].checked){
			notify_type_list.push(notify_type_box_list[i].value);
		}
	}
	if (notify_type_list.length == 0){
		alert("��ѡ����Ҫ���Ͷ��ŵ���Ʒ����");
		return;
	}
	$("other").value = "notify_equip_type=" + notify_type_list.join(",");
	
	// get charge type
	var has_selected_charge = false;
	var charge_box_list = $$("input[name='charge_id']");
	for (var i=0; i < charge_box_list.length; i++){
		if (charge_box_list[i].checked){
			has_selected_charge = true;
		}
	}
	if (!has_selected_charge){
		alert("��ѡ������������");
		return;
	}
	
	document.magic.submit();
}

function add_search_monthly_order()
{
	if (!$("charge_id").checked){
		alert("��ȷ���ײ�����");
		return;
	}
	
	document.magic.submit();
}

function add_order()
{
	if (!$("accept_license").checked){
		alert('��ѡ��"ͬ���շѹ��򲢹���÷���"');
		return false;	
	}
	
	if (ServiceInfo["id"] == ServiceSellNotify){
		add_sell_notify_order();
		return;	
	} else if(ServiceInfo["id"] == ServiceSearchMonthly){
		add_search_monthly_order();
		return;
	}
}


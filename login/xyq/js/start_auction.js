function add_hidden_input(form, name, value){
	var input = document.createElement('input');
	input.type = 'hidden';
	input.name = name;
	input.value = value;
	form.appendChild(input);
}

function submit_start_auction_form(price_yuan) {
	var form = document.createElement('form');
	form.action = CgiRootUrl + '/auction.py';
	form.method = 'POST';
	add_hidden_input(form, 'act', IsChangePrice ? 'change_price' : 'do_start_auction');
	add_hidden_input(form, 'safe_code', SafeCode);
	add_hidden_input(form, 'equipid', EquipId);
	add_hidden_input(form, 'price_yuan', price_yuan);
	document.body.appendChild(form);
	form.submit();
}

function show_pay_error_panel(elem) {
	$(elem).setStyle("display", "none");
	$("pay_error_panel").setStyle("display", "block");
	$$("#pay_error_panel input[type=radio]").addEvent('change', function() {
		if (this.checked) {
			$$('#pay_error_panel .j_pay_error_help').each(function(el) { el.style.display = 'none'; });
			$(this.value).style.display = '';
		}
	});
}

$(window).addEvent('domready', function() {
	$('top_sell_menu').addClass('on');
	$('menu_equip_store').addClass('on');

	$('btn_start_auction').addEvent('click', function(){
		var price = $('price').value;
		if (!/^\d+(\.\d?\d?)?$/.test(price)) {
			alert('����ȷ����۸�');
			return false;
		}

		var require_auction_fee = !IsChangePrice;

		var confirm_msg = ('��ȷ��\n' +
			'-------------------------------------\n' +
			'[����]��' +  + '\n' +
			'[���ļ�]����' + (+price).toFixed(2) + '\n' +
			'[������Ϣ��]���ɽ��ۡ�5%');
		if (require_auction_fee)
			confirm_msg += '\nΪ���������и��ɿ�����Ҫ��ǰ��ȡ20Ԫ�������ܷѡ�';

		popupModal.show({
			"title": "ת����ȷ��",
			"bodyWidth": 300,
			"body": render("popup_body_start_auction_confirm", {
				equip_name: $('equip_name_panel').get('text'),
				price: (+price).toFixed(2),
				require_auction_fee: require_auction_fee
			})
		});

		var goStartAuction = $('go_start_auction');
		var agreeGoStartAuction = $('agree_go_start_auction');
		agreeGoStartAuction.addEvent("change", function(e) {
			if (this.checked)
				goStartAuction.removeClass("disabled");
			else
				goStartAuction.addClass("disabled");
		})

		if (AcceptedLicense) {
			agreeGoStartAuction.checked = true;
			goStartAuction.removeClass('disabled');
		}

		if (require_auction_fee) {
			$('go_start_auction_form').addEvent('submit', function() {
				if (!agreeGoStartAuction.checked) {
					agreeGoStartAuction.getParent().setStyle('color', 'red');
					return false;
				}
				setTimeout(function() {
					// �����ӳ�һ�£�����������ǰform�Ѿ���ʧ�������ύ
					popupModal.hide();
					popupModal.show({
						"title": "����֧����ʾ",
						"bodyWidth": 400,
						"body": $("popup_body_pay_tips").get("html")
					})
				}, 1000);
			});

		} else {
			goStartAuction.addEvent('click', function() {
				if (agreeGoStartAuction.checked) {
					submit_start_auction_form(price);
				} else {
					popupModal.hide();
					agreeGoStartAuction.getParent().setStyle('color', 'red');
				}
				return false;
			});
		}

	});
});

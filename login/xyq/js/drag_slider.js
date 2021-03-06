var ButtonChecker = new Class({
	initialize: function(items, panel, max_num){
		this.panel = panel;
		this.max_num = max_num;
		this.check_queue = [];
		this.items = [];
		this.extend(items);
	},

	reset_value: function(){
		while(this.check_queue.length > 0){
			var el = this.check_queue.pop();
			el.removeClass('on');
		}
	},

	restore: function(selected_values){
		var v_map = {};

		for(var i=0;i<selected_values.length;i++){
			var value = selected_values[i];
			v_map[value] = true;
		}

		var children = this.panel.getChildren();
		for(var i=0; i<children.length; i++){
			var el = children[i];

			if(el.retrieve('value') in v_map){
				this.add_check_el(el);
			}else{
				this.remove_check_el(el);
			}
		}
	},

	remove_check_el: function(el){
		el.removeClass('on');
		this.check_queue = this.check_queue.filter(function(x){return x!=el});
	},

	add_check_el: function(el){
		el.addClass('on');	
		this.check_queue.push(el);
		if(this.max_num && this.check_queue.length > this.max_num){
			this.check_queue.shift().removeClass('on');
		}
	},
	
	extend: function(items){
		this.items = this.items.concat(items);
		var __this = this;
		for(var i=0; i<items.length; i++){
			var el = this.create_element(items[i]);
			el.store('value', items[i][0]);
			el.addEvent('click', function(){
				if(this.hasClass('on')){
					__this.remove_check_el(this);
				} else {
					__this.add_check_el(this);
				}
			});
			this.panel.grab(el);
		}

		this.panel.btn_checker = this;
	},

	create_element: function(item){
		return new Element('li', {'html': '<span>'+item[1]+'</span>'});
	},

	set_max_num: function(max_num){
		this.max_num = max_num;
		if(!max_num){return;}
		while(this.check_queue.length > max_num){
			this.check_queue.shift().removeClass('on');
		} 
	},

	get_value: function(){
		return this.check_queue.map(function(x){return x.retrieve('value')}).join(',');
	},
	
	get_value_array: function(){
		return this.check_queue.map(function(x){return x.retrieve('value')});
	},

	is_check_all: function(){
		return this.check_queue.length >= this.items.length;
	}
});

var PetSkillButtonChecker = new Class({
	Extends: ButtonChecker,		
	create_element: function(item){
		var icon = this.fill_format(item[0]) + '.gif';
		var icon_url = ResUrl + '/images/skill/' + icon;
		return new Element('li', {
			'html': '<img src="'+ icon_url +'" title="'+ item[1] +'" alt="'+ item[1] +'" />'
		});
	},

	fill_format: function(num){
		if (num/1000 >= 1) {
			return num;
		}
		if (num/100 >= 1) {
			return "0" + num;
		}
		if (num/10 >= 1) {
			return "00" + num;
		}
		return "000" + num;
	}
});

var Drag = new Class({
	initialize: function(el, options){
		this.el = el;
		this.options = {};
		this.set_options(options);
		this.startMove = false;
		this.pos = null;
		this.mouse = null;
		this.drag_value = null;
		this.value = null;
		this.reg_event();
	},

	set_options: function(options){
		if(!options){return;}
		for(var p in options){
			this.options[p] = options[p];
		}
	},

	reg_event: function(){
		var __this = this;
		this.el.addEvent('mousedown', function(ev){
			__this.start(ev);
			ev.preventDefault();
		});
		document.addEvent('mouseup', function(ev){
			__this.end(ev);
		});
		document.addEvent('mousemove', function(ev){
			__this.move(ev);
			ev.preventDefault();
		});
	},

	start: function(ev){
		this.startMove = true;
		this.pos = this.el.getPosition(this.el.getOffsetParent());
		this.mouse = ev.page;
	},

	move: function(ev){
		if(!this.startMove){
			return;
		}
		var x = this.pos.x + ev.page.x - this.mouse.x;
		if (this.options.limit){
			var offset = this.options.offset || 0;
			x = Math.max(x, this.options.limit[0] + offset);
			x = Math.min(x, this.options.limit[1] + offset);
		}
		this.drag_value = {x: x-offset, y:0};
		this.value = {x: this.get_fix_value(x-offset), y:0};
		this.el.setPosition({x:x, y:this.pos.y});
		this.moved(ev);
	},
	
	set_value: function(value){
		this.drag_value = value;
		this.value = value;
		this.pos = this.el.getPosition(this.el.getOffsetParent());
		var offset = this.options.offset || 0;
		this.el.setPosition({x: value.x + offset, y:this.pos.y});
		this.moved(null);
   	},

	moved: function(ev){
		if(this.options.onMove){
			this.options.onMove(this.el, this.value, this.drag_value);
		}	   
	},

	end: function(ev){
		if(!this.startMove){
			return;
		}
		this.startMove = false;
		if(!this.value){
			return;
		}
		this.drag_value.x = this.value.x;
		var offset = this.options.offset || 0;
		this.el.setPosition({x:this.value.x + offset, y: this.pos.y});
		this.moved(ev);
	},

	get_fix_value: function(value){
		if(!this.options.grid){return value;}
		var mod = value % this.options.grid;
		if (mod == 0){
			return value;
		}
		var fix_value = value;
		if(mod < this.options.grid / 2){
			fix_value = value - mod;
		} else {
			fix_value = value + (this.options.grid - mod)
		}
		return fix_value;
	}
});

var LevelSlider = new Class({
	initialize: function(slider, options){
		/*
		options:
		{
			grid: value ---- px / 1 step
			offset: value ---- display position fix 
			range: value  ---- value range
			step: value  ---- value / 1 step
			default: value 
		}
		 */
		this.slider = slider;
		this.options = options;
		this.drag_limit = this.get_drag_limt();
		this.init_drag();
		this.drag_pos = {}
		this.set_value(this.options.default_value);

		this.slider.slider = this;
	},
	
	reset_value: function(){
		this.set_value(this.options.default_value);
	},

	init_drag: function(){
		this.startDrag = new Drag(this.slider.getElement('.startPoint'), {
			limit: this.drag_limit,
			offset: this.options.offset,
			grid: this.options.grid
		});
		this.endDrag = new Drag(this.slider.getElement('.endPoint'), {
			limit: this.drag_limit,
			offset: this.options.offset,
			grid: this.options.grid
		});
		var __this = this;
		this.startDrag.set_options({
			'onMove': function(el, value, drag_value){
				var level = __this.get_pos_value(value.x);
				el.getElement('.num').set('html', level + '��');
				__this.slider.getElement('.bar').setStyles({
					'left': drag_value.x+'px',
					'width': (__this.drag_pos.end-drag_value.x)+'px'
				});
				__this.drag_pos.start = value.x;
				__this.value.min = level;
				el.setStyle('z-index', '10');
				__this.endDrag.set_options({limit: [value.x, __this.drag_limit[1]]});
				__this.endDrag.el.setStyle('z-index', '1');
			}
		});
		this.endDrag.set_options({
			'onMove': function(el, value, drag_value){
				var level = __this.get_pos_value(value.x);
				el.getElement('.num').set('html', level + '��');
				__this.slider.getElement('.bar').setStyles({
					'width': (drag_value.x - __this.drag_pos.start)+'px'
				});
				__this.drag_pos.end = value.x;
				__this.value.max = level;
				el.setStyle('z-index', '10');
				__this.startDrag.set_options({limit: [0, value.x]});
				__this.startDrag.el.setStyle('z-index', '1');
			}
		});
	},

	set_value: function(value){
		var default_value = this.options.default_value;
		var min_value = value[0];
		var max_value = value[1];
		if(min_value == undefined || min_value == null){
			min_value = this.value.min;	
		}

		if(max_value == undefined || max_value == null){
			max_value = this.value.max;	
		}

		this.value = {min: min_value, max: max_value};
		var start = this.get_pos_by_value(this.value.min);
		var end = this.get_pos_by_value(this.value.max);
		this.drag_pos = {start: start, end:end};
		var start_drag_value = {x: start, y:0};
		var end_drag_value = {x:end, y:0};
		this.startDrag.set_value(start_drag_value);
		this.endDrag.set_value(end_drag_value);
	},

	get_pos_by_value: function(value){
		return (value - this.options.range[0])/this.options.step * this.options.grid;			  
	},

	//get value by pos	
	get_pos_value: function(pos){
		return parseInt(pos/this.options.grid) * this.options.step + this.options.range[0];
	},

	get_drag_limt: function(){
		return [0, this.get_pos_by_value(this.options.range[1])]
	}
});

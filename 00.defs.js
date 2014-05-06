// setup jquery environment
$.io.rand = 10;	// for refreshing content
$.io.font = { 
	danuvasvseh: '350px',
	pizdez: '200px',
	enormous: '160px', 
	obscene: '130px', 
	crazy: '102px', 
	bigass: '80px', 
	jumbo: '64px', 
	huger: '48px', 
	huge: '36px', 
	larger: '30px', 
	large: '25px', 
	bigger: '21px',
	big: '18px', 
	normal: '15px', 
	small: '12px', 
	tiny: '10px', 
	puny: '8px'
}
$.io.defs = {
	canvas: { 
		lw: 0, 
		dw: 0.15, 
		corner: 5
	},
	fonts: { 
		tiny: $.io.font.tiny,
		small: $.io.font.small,
		normal: $.io.font.normal, 
		big: $.io.font.large,
		huge: $.io.font.bigass
	},
	colors: { 
		bg: '#000',
		fg: '#fff', 
		structure: '#fff', 
		alert: '#ff7'
	}
}
$.io.style = {
	section: { margin: '20px 0px 5px 2%', color: $.io.defs.colors.bg, 'font-size': $.io.defs.fonts.small, width: '98%', 'border-bottom': '1px solid ' + $.io.defs.colors.bg, 'text-align': 'left'},
	msgs: { color: $.io.defs.colors.fg, 'font-size': $.io.defs.fonts.normal, position: 'relative', margin: '3px 1%', width: '98%', height: 'auto'},
	text: {
		normal: { color: $.io.defs.colors.fg, display: 'inline', 'font-size': $.io.defs.fonts.normal, margin: '0px', padding: '0px 2px'},
		structure: { color: $.io.defs.colors.structure, display: 'inline', 'font-size': $.io.defs.fonts.normal, margin: '0px', padding: '0px 2px', 'font-weight': 'bold'},
		alert: { color: $.io.defs.colors.alert, display: 'inline', 'font-size': $.io.defs.fonts.normal, margin: '0px', padding: '0px 2px', 'font-weight': 'bold'},
		info: { color: $.io.defs.colors.info, display: 'inline', 'font-size': $.io.defs.fonts.normal, margin: '0px', padding: '0px 2px', 'font-weight': 'bold'},
		link: { color: $.io.defs.colors.link, display: 'inline', 'font-size': $.io.defs.fonts.normal, margin: '0px', padding: '0px 2px', 'font-weight': 'bold'}
	},
	box: {
		line: { color: $.io.defs.colors.structure, 'font-size': $.io.defs.fonts.normal, position: 'relative', 'text-align': 'center', margin: '2px 1%', width: '98%', height: '1.3em', display: 'block', 'text-decoration': 'none', color: $.io.defs.colors.fg},
		// components, all normal size
		link: {  'font-size': $.io.defs.fonts.normal, color: $.io.defs.colors.structure, display: 'block', width: '100%', height: 'auto', 'text-decoration': 'underline', 'text-align': 'left', overflow: 'hidden', 'background-color': 'transparent', border: '0px'},
		input: { 'font-size': $.io.defs.fonts.normal, color: $.io.defs.colors.structure, display: 'block', width: '100%', height: '1.2em', 'text-decoration': 'none', 'text-align': 'left', 'background-color': 'transparent', border: '0px', margin: '2px 0px'},
		text: {  'font-size': $.io.defs.fonts.normal, color: $.io.defs.colors.structure, display: 'block', width: '100%', height: '100%', 'text-decoration': 'none', 'text-align': 'left', overflow: 'hidden', 'background-color': 'transparent', border: '0px'},
		upload: { 'font-size': $.io.defs.fonts.normal, color: $.io.defs.colors.structure, display: 'block', position: 'absolute', width: '100%', height: '1.2em', 'text-decoration': 'none', 'text-align': 'left', border: '0px'}
	},
	inline: {
		box: { float: 'left', color: $.io.defs.colors.structure, 'font-size': $.io.defs.fonts.normal, position: 'relative', 'text-align': 'center', margin: '1px 3px', width: 'auto', height: '1.3em', display: 'block', 'text-decoration': 'none', overflow: 'hidden'}
	},
	table: {
		line: { 'font-size': $.io.defs.fonts.normal, position: 'relative', 'text-align': 'left', width: '98%', height: '1.3em', margin: '2px 0px 0px 1%', padding: '0px', border: '0px'},
		cell: { color: $.io.defs.colors.structure, top: '0px', left: '0px', width: '100%', height: '100%', position: 'absolute', color: $.io.defs.colors.fg},
		input: { color: $.io.defs.colors.fg, 'font-size': $.io.defs.fonts.normal, 'text-decoration': 'none', display: 'block', position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%', margin: '0px', padding: '0px', border: '0px', 'text-align': 'left', 'background-color': 'transparent'}
	},
	frame: {
		box: { 'text-decoration': 'none', border: '0px', display: 'block', position: 'relative', margin: '0px', padding: '0px', width: '100%', height: '100%'},
		body: { color: $.io.defs.colors.fg, margin: '0px', padding: '0px', 'font-size': $.io.defs.fonts.normal}
	},
	canvas: {
		floor: [ '#666', 2.0, '#fff', 1.0, $.io.defs.canvas.lw, $.io.defs.canvas.corner],
		normal: [ '#fff', 0.3, '#fff', 1.0, $.io.defs.canvas.lw, $.io.defs.canvas.corner],
		structure: [ '#fff', 0.2, '#fff', 1.0, $.io.defs.canvas.lw, $.io.defs.canvas.corner],
		stress: [ '#fff', 0.5, '#fff', 1.0, $.io.defs.canvas.lw, $.io.defs.canvas.corner],
		alert: [ '#f33', 0.4, '#fff', 1.0, $.io.defs.canvas.lw, $.io.defs.canvas.corner],
		info: [ '#ad0', 0.5, '#fff', 1.0, $.io.defs.canvas.lw, $.io.defs.canvas.corner],
		link: [ '#7cf', 0.5, '#fff', 1.0, $.io.defs.canvas.lw, $.io.defs.canvas.corner],
		popup: [ '#a7f', 0.5, '#fff', 1.0, $.io.defs.canvas.lw, $.io.defs.canvas.corner]
	}
}
$.io.setup = {}
$.io.session = [];

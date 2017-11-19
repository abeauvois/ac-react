
import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { ACButton } from './assoconnect'

const _spark = {
    template: {}
};

/**
 * Image _gif
 */
_spark.template._gif = function(css, id, alt, title) {
	var _css = css.split(" ");
	var ico;
	$.each(_GIFS, function(index) {
		if(index === _css[0]) {
			ico = index;
			return false;
		}
	});
	if(ico) {
		return $("<img>")
			.attr("src", HOST_SPARK + "/image/gif.php?width=" + _GIFS[ico][0] + "&height=" + _GIFS[ico][1])
			.attr("id", id)
			.attr("alt", alt ? alt : ico)
			.attr("title", title)
			.addClass("_gif " + css);
	}
};

/**
 * Lightbox d'alerte
 * Equivalent de la fonction Javascript alert
 */
_spark.template.alert = function (body, callback, close){
	var div = $("#sparkTemplateAlert");
	// Fermeture
	if(body === false){
		if(div.length) {
			div.dialog("close");
		}
	}
	// Ouverture
	else{
		// Alert non existant
		if(div.length === 0){
			div = $("<div>")
				.attr("id", "sparkTemplateAlert")
				.appendTo("body")
		}
		// Configuration et ouverture
		div.xss(body);
		div.dialog({
			buttons: [{
				text: (close ? close : "Fermer"),
				click: function(){
					// Fermeture de la lightbox
					$("#sparkTemplateAlert").dialog("close");
					// Callback
					if(callback){
						callback.call(null, false);
					}
				}
			}]
		});
	}
};

/**
 * Bouton
 */
_spark.template.button = function (id, text, options){
	// Options
	options = $.extend({
		className:	"",
		color:		"blue",
		size:		"large",
		ico:		false,
		link:		false,
		target:		""
	}, options);
	// Mise en forme du lien
	// options.link = _spark.fixUrl(options.link, false);
	// DOM
	var button = $("<div>")
		.attr("id", id + "Button")
		// .addClass("button button" + options.color.ucfirst() + " button" + options.size.ucfirst() + " " + options.className)
		// .append(
		// 	// Icône
		// 	(function(options){
		// 		if(options.ico){
		// 			return _spark.template._gif("ico ico" + options.ico.ucfirst());
		// 		}
		// 	})(options),
		// 	// Texte
		// 	$("<span>").text(text)
		// );
	// if(options.link) {
	// 	return $("<a>")
	// 		.attr("href", options.link)
	// 		.attr("target", options.target)
	// 		.append(button);
	// }
	// else {
	// 	return button;
	// }
	return ReactDom.render(
		<ACButton label={text} ico="close"/>, 
		document.getElementById(id)
	)
};

/**
 * Lightbox de confirmation
 * Equivalent de la fonction Javascript confirm
 */
_spark.template.confirm = function (body, callback, ok, cancel){
	var confirmDOM;
	if(body.substr(0, 1) === "#"){
		confirmDOM = $(body);
	}
	else{
		confirmDOM = $("#sparkTemplateConfirm");
		// Confirm non existant
		if(confirmDOM.length === 0){
			confirmDOM = $("<div>")
				.attr("id", "sparkTemplateConfirm")
				.appendTo("body");
		}
		// Configuration
		confirmDOM.xss(body);
	}
	// Ouverture
	confirmDOM.dialog({
		buttons: [
			{
				text: (cancel ? cancel : "Annuler"),
				click: function(){
					confirmDOM.dialog("close");
					callback.call(null, false);
				}
			},
			{
				text: (ok ? ok : "Continuer"),
				color: "orange",
				click: function(){
					$("#sparkTemplateConfirm").dialog("close");
					callback.call(null, true);
				}
			}
		]
	});
};

_spark.template.FORMAT_ADDRESS	= 1;
_spark.template.FORMAT_EMAIL	= 2;
_spark.template.FORMAT_IBAN		= 3;
_spark.template.FORMAT_MONEY	= 4;
_spark.template.FORMAT_NUMBER	= 5;
_spark.template.FORMAT_PERCENT	= 6;
_spark.template.FORMAT_PHONE	= 7;
_spark.template.FORMAT_URL		= 8;
_spark.template.format = function(value, format, options){
	options = $.extend(true, {}, options);
	switch(format){
		case _spark.template.FORMAT_ADDRESS:
			if(value){
				var address = [];
				if(value.location){
					address.push(value.location);
				}
				if(value.street1){
					address.push(value.street1);
				}
				if(value.street2){
					address.push(value.street2);
				}
				if(value.city){
					if(value.postal){
						address.push(value.postal + " " + value.city);
					}
					else{
						address.push(value.city);
					}
				}
				if(value.country){
					address.push(SPARK_FILTER_COUNTRY[value.country]);
				}
				return address.join(", ").xss();
			}
			break;
		case _spark.template.FORMAT_EMAIL:
			if(value){
				value = value.xss();
				return '<a href="mailto:' + value + '"' + (options.target ? ' target="' + options.target + '"' : "") + '>' + value + '</a>';
			}
			break;
		case _spark.template.FORMAT_IBAN:
			if(value){
				return value.match(/.{1,4}/g).join("\xa0");
			}
			break;
		case _spark.template.FORMAT_MONEY:
			if(typeof value === "string"){
				value *= 1;
			}
			value = value.toLocaleString(undefined, {
				style:		"currency",
				currency:	"EUR"
			});
			return value.replaceAll(" ", "\xa0");
			break;
		case _spark.template.FORMAT_NUMBER:
			if(typeof value === "string"){
				value *= 1;
			}
			value = value.toLocaleString(undefined, {
				style:		"decimal"
			});
			return value.replaceAll(" ", "\xa0");
			break;
		case _spark.template.FORMAT_PERCENT:
			if(typeof value === "string"){
				value *= 1;
			}
			value /= 100;
			value = value.toLocaleString(undefined, {
				style:					"percent",
				minimumFractionDigits:	2
			});
			return value.replaceAll(" ", "\xa0");
			break;
		case _spark.template.FORMAT_PHONE:
			if(value){
				value = value.toString();
				var link = intlTelInputUtils.formatNumber(value, null, intlTelInputUtils.numberFormat.RFC3966);
				var display = intlTelInputUtils.formatNumber(value, null, intlTelInputUtils.numberFormat.INTERNATIONAL);
				display = display.replaceAll(" ", "\xa0");
				return '<a href="' + link + '"' + (options.target ? ' target="' + options.target + '"' : "") + '>' + display + '</a>';
			}
			break;
		case _spark.template.FORMAT_URL:
			if(value){
				value = value.xss();
				return '<a href="' + value + '"' + (options.target ? ' target="' + options.target + '"' : "") + '>' + value + '</a>';
			}
			break;
		default:
			console.error("Unknown format: " + format);
	}
	// Chaine vide
	return "";
};

_spark.template.help = function(text, color, ico) {
	// Id unique
	var id = Math.random().toString(36).substr(2, 9);
	// Valeurs par défaut
	if(!ico) {
		ico = "help16Dark";
	}
	if(!color) {
		color = "green";
	}
	// Affichage
	return $("<span>").append(
		$("<span>")
			.attr("id", id)
			.addClass("helpButton cursorHelp displayInlineBlock valignMiddle")
			.on("mouseover", function() {
				var helpContentDOM = $("#" + id + "Content");
				var parentDialogDOM = $(this).parents(".ui-dialog-content");
				if(
					$(this).offset().left + 400 >=  $(window).width()
					// Cas des dialogs fix #10511
					|| (parentDialogDOM.length && $(this).offset().left + 400 >= parentDialogDOM.width())
				) {
					helpContentDOM.css("margin-left", "-400px");
				}
				else {
					helpContentDOM.css("margin-left", 0);
				}
				if(
					$(this).offset().top + helpContentDOM.outerHeight() >= $("#templatePage").height()
					// Cas des dialogs fix #10511
					|| (parentDialogDOM.length && $(this).offset().top + helpContentDOM.outerHeight() >= parentDialogDOM.height())
				) {
					helpContentDOM.css("margin-top", "-" + helpContentDOM.outerHeight() +  "px");
				}
				else {
					helpContentDOM.css("margin-top", "25px");
				}
			})
			.append(
				_spark.template._gif("ico" + ico.ucfirst()),
				$("<span>")
					.attr("id", id + "Content")
					.addClass("helpContent cursorAuto backgroundLarge background" + color.ucfirst() + "Light")
					.text(text)
			)
	);
};

_spark.template.label = function(label, content, options){
	// Options
	options = $.extend({
		id:					false,
		link:				false,
		col:				6,
		className:			"",
		classNameLabel:		"",
		classNameContent:	""
	}, options);
	// Mise en forme du lien
	options.link = _spark.fixUrl(options.link, false);
	// Calcule des cols
	colLabel = options.col;
	colContent = 12 - colLabel;
	// Retour
	return $("<div>")
		.addClass("row colsMiddle " + options.className)
		.inDOM(function() {
			if(options.id) {
				$(this).attr("id", options.id + "Wrapper");
			}
		})
		.append(
		// Label
		$("<div>")
			.addClass(eval("COL" + colLabel) + " fontBold " + options.classNameLabel)
			.inDOM(function() {
				if(options.id) {
					$(this).attr("id", options.id + "Label");
				}
			})
			.text(label),
		// Contenu
		$("<div>")
			.addClass(eval("COL" + colContent) + " " + options.classNameContent)
			.inDOM(function() {
				if(options.id) {
					$(this).attr("id", options.id + "Content");
				}
			})
			.append(options.link ?
				$("<a>")
					.attr("href", options.link)
					.text(content)
				: content
		)
	);
};

/**
 * Chargement
 * @param	{(string|boolean)}	loading		false	= Fermeture
 *											true	= Ouverture avec un message par défaut
 *											string	= Ouverture avec le message indiqué
 * @param	{number}			[progress]
 */
_spark.template.loading = function (loading, progress){
	var loadingDOM = $("#sparkTemplateLoading");
	// Appel sans argument
	if(arguments.length === 0){
		return Boolean(loadingDOM.length && loadingDOM.dialog("isOpen"));
	}
	// Ouverture
	else if(loading){
		// Chargement déjà en cours
		if(loadingDOM.length){
			// Affichage de la lightbox
			if(loadingDOM.dialog("isOpen") === false){
				loadingDOM.dialog("open");
			}
			// Progression
			if(progress){
				$("#sparkTemplateLoadingProgress").text(Math.round(progress * 100) + "%");
			}
			// Retour
			return false;
		}
		// Message par défaut
		if(loading === true){
			loading = "Chargement en cours ..."
		}
		// Création de l'élément
		loadingDOM = $("<div>")
			.attr("id", "sparkTemplateLoading")
			.css("padding-top", "50px")
			.addClass("textAlignCenter")
			.append(
				$("<div>").append(
					$("<img>")
						.attr({
							width:	"32px",
							height:	"32px",
							src:	HOST_SPARK + "/image/ico.load.32.gif"
						})
						.addClass("valignMiddle")
						.css("margin-right", "10px"),
					$("<span>").text(loading)
				),
				$("<div>")
					.attr("id", "sparkTemplateLoadingProgress")
			)
			// Ajout à la page
			.appendTo("body")
			// Ouverture
			.dialog({
				height: 150
			});
	}
	// Fermeture
	else{
		loadingDOM.dialog("close").remove();
	}
};

/**
 * Notification
 * @param	{boolean}	status	false	= Ferme la notification
 *								true	= Ouvre la notification
 */
_spark.template.notification = function (status) {
	var notificationDOM = $("#sparkTemplateNotification");
	// Fermeture
	if(status === false) {
		notificationDOM.fadeOut(function() {
			$(this).remove();
		});
	}
	// Ouverture
	else if(notificationDOM.length === 0) {
		// Création de l'élément
		notificationDOM = $("<div>")
			.attr("id", "sparkTemplateNotification")
			.addClass("backgroundLarge backgroundGreenLight colorGreen displayNone")
			.append(
				_spark.template._gif("icoCheck16Color marginRight10 valignMiddle"),
				$("<span>").text("Enregistré")
			)
			.appendTo("body")
			.fadeIn(function () {
				setTimeout(function(){
					_spark.template.notification(false);
				}, 4000);
			});
	}
};

/**
 * Lightbox de prompt user
 * Equivalent de la fonction Javascript prompt
 */
_spark.template.prompt = function (body, textarea, callback, prefill, ok, cancel){
	// Reset du prompt
	var promptDOM = $("#sparkTemplatePrompt");
	// Promp non existant
	if(promptDOM.length) {
		promptDOM.remove();
	}
	promptDOM = $("<div>")
	// Création
		.attr("id", "sparkTemplatePrompt")
		.hide()
		.appendTo("body")
		.append(_spark.form.model[textarea ? "textarea" : "text"]("sparkTemplatePromptInput", body, prefill))
	// Ouverture
		.dialog({
			buttons: [
				{
					text: (cancel ? cancel : "Annuler"),
					click: function(){
						promptDOM.dialog("close");
						callback.call(null, false);
					}
				},
				{
					text: (ok ? ok : "Continuer"),
					color: "orange",
					click: function(){
						promptDOM.dialog("close");
						callback.call(null, $("#sparkTemplatePromptInput").val().trim());
					}
				}
			]
		});
};

export default _spark
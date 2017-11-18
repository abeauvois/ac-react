// @flow

import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { Button, Icon } from 'semantic-ui-react'

/**
 * Bouton
 */
// _spark.template.button = function (id, text, options){
// 	// Options
// 	options = $.extend({
// 		className:	"",
// 		color:		"blue",
// 		size:		"large",
// 		ico:		false,
// 		link:		false,
// 		target:		""
// 	}, options);
// 	// Mise en forme du lien
// 	// options.link = _spark.fixUrl(options.link, false);
// 	// DOM
// 	var button = $("<div>")
// 		.attr("id", id + "Button")
// 		// .addClass("button button" + options.color.ucfirst() + " button" + options.size.ucfirst() + " " + options.className)
// 		.append(
// 			// Icône
// 			(function(options){
// 				if(options.ico){
// 					return _spark.template._gif("ico ico" + options.ico.ucfirst());
// 				}
// 			})(options),
// 			// Texte
// 			$("<span>").text(text)
// 		);
// 	if(options.link) {
// 		return $("<a>")
// 			.attr("href", options.link)
// 			.attr("target", options.target)
// 			.append(button);
// 	}
// 	else {
// 		return button;
// 	}
// };

type Props = {
    label:      string,
    className:	string,
    color:		string,
    size:		string,
    ico:		boolean,
    link:		boolean,
    target:		string,
    animation:  string
  }

class ACButton extends Component<Props> {
    static defaultProps = {
        label:      "",
		className:	"",
		color:		"primary",
		size:		"large",
		ico:		"",
		link:		false,
        target:		"",
        animation:  "" // or "vertical"
      }

    onclick = () => {
        const {link} = this.props
        console.log("click!")
        if (link){
            // Use router OR window.location('/')...
        }
    }

    render () {

        const {    
            label,
            className,
            color,
            size,
            ico,
            link,
            target,
            animation 
        } = this.props

        if (animation){
            return (
                <Button animated={animation} onClick={this.onclick}>
                    <Button.Content visible>{label}</Button.Content> 
                    <Button.Content hidden>
                        {
                            ico ? <Icon name={ico} /> : null
                        }
                        {label}
                    </Button.Content>
                </Button>
            )
        } else  {
            return (
                <Button primary onClick={this.onclick}>
                    {
                        ico ? <Icon name={ico} /> : null
                    }
                    {label}
                </Button>
            )
        }
    }
}
const element = document.createElement('div')
ReactDom.render(<ACButton label="close" ico="close"/>, document.getElementById('root') || element)


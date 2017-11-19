import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { Button, Icon } from 'semantic-ui-react'

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

function renderACButton(props, element) {
    ReactDOM.render(
      <BuyButtonComponent {...props} />,
      element
    );
  }

export { ACButton }
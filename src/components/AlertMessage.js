import React from 'react';
import { Message, Button } from 'semantic-ui-react';

const AlertMessage = ({header, content, cancelOnClick, acceptOnClick}) => {
    return(
        <div>
            <Message
                attached
                header={header}
                content={content}
            />
            <Button.Group fluid>
                <Button onClick={cancelOnClick}>Cancel</Button>
                <Button.Or />
                <Button onClick={acceptOnClick} positive>Accept</Button>
            </Button.Group>
        </div>
    )
};


AlertMessage.propTypes = {
	header: React.PropTypes.string.isRequired,
	content: React.PropTypes.string.isRequired,
    cancelOnClick: React.PropTypes.func.isRequired,
    acceptOnClick: React.PropTypes.func.isRequired,
};

export default AlertMessage;
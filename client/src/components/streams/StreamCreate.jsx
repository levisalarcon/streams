import React from 'react';
import {Field, reduxForm} from 'redux-form';

class StreamCreate extends React.Component{
    
    render() {
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this._renderTextInput} label="Enter a title" />
                <Field name="description" component={this._renderTextInput} label="Enter a description" />
                <button className="ui button">Create</button>
            </form>
        )
    }

    onSubmit(formValues) {
    }

    _renderTextInput = ({input, label, meta}) => {
        const className = `field ${meta.touched && meta.error? 'error' : ''}`
        return(
            <div className={className}>
                <label>{label}</label>
               <input type="text" {...input} />
               {this._renderValidationError(meta)}
            </div>
        )
    }

    _renderValidationError(meta) {
        if(!meta.touched)
            return

        return(
            <div className="ui error message">{meta.error}</div>
        )
    }
}

const validate = (formValues) => {
    const errors = {};
    if(!formValues.title)
        errors.title = "You must enter a title";
    if(!formValues.description)
        errors.description = "You must enter a description";

    return errors;
}


export default reduxForm({
    form: 'streamCreate',
    validate: validate
})(StreamCreate);
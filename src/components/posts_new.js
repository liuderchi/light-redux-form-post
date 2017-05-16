import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    const { meta: {touched, error, invalid} } = field;
    const className = `form-group ${(touched && invalid) ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.title}</label>
        <input
          className="form-control"
          type="text"
          {...(field.input)}
        />
      {/* NOTE ...field.input
        Object Spread Properties syntax
          e.g. var obj = { id: 5, ...field.input})
      */}
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {  // current values from each Fields
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        {/* NOTE call this.onSubmit only when passed validation */}
        <Field
          title="Title For Post"
          name="title"
          component={this.renderField}
        />
        <Field
          title="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          title="Post Content"
          name="content"
          component={this.renderField}
        />
      <button type="submit" className="btn btn-primary">Submit</button>
      <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

function validate(values) {    // values: current values from each Fields
  const errors = {};

  // validate 'values'
  // NOTE prop of errors should be consistent with Field name
  if (!values.title) {
    errors.title = "Enter a title!";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories!";
  }
  if (!values.content) {
    errors.content = "Enter some content!";
  }

  // NOTE if errors is empty, form is fine to submit
  // NOTE if error is NOT empty, redux assume form invalid and stop the sumission
  return errors;
}

export default reduxForm({   // passing option obj
  validate,    // called on input changed
  form: 'PostsNewForm'    // arbitrary string for form identity
})(
  connect(null, { createPost })(PostsNew)
  // NOTE wrap PostsNew with connect() then reduxForm()
);

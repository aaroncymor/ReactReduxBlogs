import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {

	// this is defining an object on the PostNew class
	// When we call PostNew.contextTypes it will return
	// the object defined in contextTypes.
	static contextTypes = {
		// React interacts with this objects whenever
		// we create an instance of PostNew. It's going
		// to see that we declared some contextTypes and
		// it's going to see that we want to specifically get
		// access to some property on our context called 'router'
		router: PropTypes.object
	};

	onSubmit(props) {
		// The props on this are the ones on the form
		// title, categories, and content because of
		// this.onSubmit.bind(this), we bind the form which
		// is 'this' (this === form)
		this.props.createPost(props)
			.then(() => {
				// blog post has been created. Navigate user to the index.
				// We navigate by calling this.context.router.push with the
				// new path to navigate to.
				this.context.router.push('/');
			});
	}

	render() {
		// const handleSubmit = this.props.handleSubmit;
		// const title = this.props.fields.title
		const { fields: {title, categories, content}, handleSubmit } = this.props;

		// handleSubmit(this.onSubmit.bind(this)
		// this.onSubmit.bind(this) - means that we bind the context of our function
		// the ..bind(this) is the 'this' on this.onSubmit defined on the PostNew class.
		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h3>Create A New Post</h3>
				<div className={`form-group ${title.touched && title.invalid ? 'has-danger': ''}`}>
					<label>Title</label>
					<input type="text" className="form-control" {...title} />
					<div className="text-help">
						{title.touched ? title.error : ''}
					</div>
				</div>

				<div className={`form-group ${categories.touched && categories.invalid ? 'has-danger': ''}`}>
					<label>Categories</label>
					<input type="text" className="form-control" {...categories} />
					<div className="text-help">
						{categories.touched ? categories.error : ''}
					</div>
				</div>

				<div className={`form-group ${content.touched && content.invalid ? 'has-danger': ''}`}>
					<label>Content</label>
					<textarea type="text" className="form-control" {...content}/>
					<div className="text-help">
						{content.touched ? content.error : ''}
					</div>
				</div>

				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	if (!values.title) {
		errors.title = 'Enter a title';
	}

	if(!values.categories) {
		errors.categories = 'Enter categories';
	}

	if(!values.content) {
		errors.content = 'Enter some content';
	}
	return errors;
}

// connect: first argument is mapStateToProps second is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
	form: 'PostsNewForm', //needs to be some unique token
	fields: ['title', 'categories', 'content'],
	validate
}, null, { createPost })(PostsNew);

// user types something in...record it on application state
/*
	state === {
		PostsNewFOrm: {
			title: '....',
			categories: '....',
			content: '....'
		}
	}
*/
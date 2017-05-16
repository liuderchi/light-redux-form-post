import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    if (!this.props.post) {
      const { id } = this.props.match.params;  // post id from url
      this.props.fetchPost(id);
    }
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    // NOTE get id from params rather than this.props.post (may be undefined)

    this.props.deletePost(id, () => {
      this.props.history.push('/');
    })
  }

  render() {
    const { post } = this.props;

    // NOTE handle app init state post is undefined
    if (!post) {
      return ( <div>Loading...</div> );
    }

    return (
      <div>
        <Link to="/">Back to Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    )
  }
}

function mapStateToProps({ posts }, ownProps) {
  // NOTE ownProps: ref to component: this.props

  return { post: posts[ownProps.match.params.id] };
  // getting this.props.match.params.id from component
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);

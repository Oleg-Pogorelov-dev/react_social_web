import React from 'react';
import classes from './Comment.module.css'



class Comment extends React.Component {
  state = {
    message: '',
    visible: false,
    visible_form: false
  }
  render () {
    const onBtnClick = () => {
      this.props.addComment({
        message: this.state.message, 
        commentable_id: post_id, 
        commentable_type: 'post'
      })
      this.setState({
        title: '',
        description: '',
      })
    }

    const onBtnShowComments = () => {
      this.setState({ visible: true })
    }

    const onBtnHideComments = () => {
      this.setState({ visible: false })
    }

    const showFormComment = () => {
      this.setState({ visible_form: true })
    }

    const changeNewComment = (e) => {
      this.setState({ message: e.currentTarget.value })
    }

    const post_id = this.props.thisPost.id
    let сomments
    if (this.props.data.comment.length) {
      сomments = this.props.data.comment.map(function (item) {
        return (
          <div>
            { item.commentable_id == post_id &&
              <div key={item.id} className={classes.card}>
                <p>{item.message}</p>
              </div>
            }
          </div>
        )
      })
    } else {
      сomments = <p>No Comments :(</p>
    }
    return(
      <div>
        {
          this.state.visible ? 
          <button onClick={onBtnHideComments}>Hide comments</button> 
          : 
          <button onClick={onBtnShowComments}>Show comments</button>
        }
        <button onClick={showFormComment}>Add comment</button>
        {
          this.state.visible_form &&
          <form>
            <textarea onChange={changeNewComment}></textarea>
            <button onClick={onBtnClick}>Add comment</button>
          </form>
        }
        { this.state.visible && <p>{сomments}</p> }
      </div>
    )
  }
}

export default Comment;

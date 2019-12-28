import React from 'react';
import classes from './Post.module.css'
import { Typography, Card, CardActionArea, CardContent } from '@material-ui/core';

class Post extends React.Component {
  state = {
    visible: false,
    visible_form: false,
    comment: ''
  }

  render() {
    console.log(this.props)
    let index
    const number_post = this.props.match.params.post
    const post = this.props.data.post
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
      this.setState({ comment: e.currentTarget.value })
    }

    let showPost = post.find( (p) => p.id === Number(number_post))

    const onBtnAddComment = (e) => {
      e.preventDefault()
      let thisPost = index
      showPost.comment = this.state.comment
      const data = showPost
      this.props.onAddComment(data, thisPost)
      this.setState({ comment: '' })
    }

    const findPost = () => {
      post.forEach(i => {
        if (i.id === Number(number_post)) {
          index = post.indexOf(i)
        }
      })
    }

    if (showPost) {
      {findPost()}
      return (
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2" className={classes.link} >
                  {showPost.title}
                </Typography>
                <Typography className={classes.discription} variant="body2" color="textSecondary" component="p">
                  {showPost.discription}
                </Typography>
            {
              !this.state.visible && <button onClick={onBtnShowComments}>Show comments</button>
            }
            {
              this.state.visible && <button onClick={onBtnHideComments}>Hide comments</button>
            }
            <button onClick={showFormComment}>Add comments</button>
            {
              this.state.visible && <p>{showPost.comment}</p>
            }
            {
              this.state.visible_form &&
              <form>
                <textarea onChange={changeNewComment}></textarea>
                <button onClick={onBtnAddComment}>Add comment</button>
              </form>
            }
              </CardContent>
            </CardActionArea>
          </Card>
      )
    } else {
      return (
        <p>This post is undefined :(</p>
      )  
    }
  }
}

export default Post;


// const f = {
//   "email": "example@mail.com", 
//   "password": "11111111" 
// }
//   const r = {
//      "email": "example@mail.com", 
//      "password": "11111111", 
//      "passwrod_confirmation": "11111111", 
//      "first_name": "", 
//      "last_name": ""
//   }
// fetch('https://postify-api.herokuapp.com/auth', {
//     method: 'POST',
//     body: JSON.stringify(r),
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })

  // fetch('https://postify-api.herokuapp.com/auth/sign_in', {
  //   method: 'POST',
  //   body: JSON.stringify(f),
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Access-Token': localStorage.setItem('Access-Token'),
  //     'Client': localStorage.setItem('Client'),
  //     'Uid': localStorage.setItem('Uid'),
  //   }
  // }).then(response => {
  //   console.log(response.headers.get('Access-Token'));
  //   console.log(response.headers.get('Client'));
  //   console.log(response.headers.get('Uid'));
  // })


  // fetch('https://postify-api.herokuapp.com/users/me', {
  //     method: 'GET',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     }
  // }).then(data => {
  //   console.log(data)
  //   })

import React, { Component } from "react";
import AuthTemplate from '../components/auth/AuthTemplate';
import axios from "axios";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import Button from "../components/common/Button";
import Input from '../components/common/Input'
import StarRate from '../components/common/StarRate'


class ReviewPage extends Component {
  //별점으로 전달된 값들
  state = {
    idx: 0,
    rating: 0,
    cacheIdx: 0,
    cacheRating: 0
  };

  _mouseOver = (e, i) => {
    e.persist();
    let offsetX = e.nativeEvent.offsetX;
    let clientX = e.target.clientWidth;

    if (offsetX > clientX / 2) {
      let value = 2;
      this.setState({
        idx: i,
        rating: value
      });
    } else {
      let value = 1;
      this.setState({
        idx: i,
        rating: value
      });
    }
  };
  
  handleChange = (i, v) => {
    this.setState({
      idx: 0,
      rating: 0,
      cacheIdx: i,
      cacheRating: v
    });
  };

  //리뷰에디터 관련

  editorRef = React.createRef();

  constructor() {
    super();

    this.state = {
      content: "",
    };
  }

  handleClick = () => {
    this.setState({
      content: this.editorRef.current.getInstance().getHtml(),
    });
  };

  render() {
    return (
      <>
      <AuthTemplate>
        <Input fullWidth placeholder="리뷰제목"></Input>
        <Editor
          previewStyle="vertical"
          height="300px"
          initialEditType="wysiwyg"
          placeholder="리뷰내용"
          ref={this.editorRef}
        />
         <StarRate
        _mouseOver={this._mouseOver}
        onChange={this.handleChange}
        idx={this.state.idx}
        rating={this.state.rating}
        cacheIdx={this.state.cacheIdx}
        cacheRating={this.state.cacheRating}
      />
        <Button cyan right onClick={this.handleClick}>저장</Button>
        </AuthTemplate>
      </>
    );
  }
}

export default ReviewPage;

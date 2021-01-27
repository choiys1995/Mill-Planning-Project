import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import ReactQuill, { Quill } from "react-quill";
import { ImageUpload } from "quill-image-upload";
import AuthTemplate from "../components/auth/AuthTemplate";
import "quill/dist/quill.snow.css";
import * as domain from "../lib/server";
import * as reviewAction from '../_actions/review_action'
import {withRouter} from 'react-router-dom'

import { useSelector, useDispatch } from "react-redux";

const EditorBlock = styled.div`
  /* 페이지 위아래 여백 */
  padding: 1rem;
  align: center;
`;

const InputText = styled.input`
    background-color: rgba(112, 191, 255, 0.7);
    border: 0;
    border-radius: 20px;
    width: 100%;
    margin-bottom: 1rem;
    height: 1.8rem;
    padding-left: 1rem;
    font-weight: bold;

    font-family: "맑은고딕"
    background-color: rgba(112, 191, 255, 0.1);
    transition: 800ms ease;

    &:hover {
        background-color: rgba(112, 191, 255, 0.45);
        transition: 1s ease;
        box-shadow: 0px 4px 20px 0px rgba(20, 20, 20, 0.05);
    }

    &:focus, &:active{
        outline: 0;
    }
`;

const Button = styled.button`
  background: #1aab8a;
  color: #fff;
  border: none;
  position: relative;
  width: 100%;
  height: 2rem;
  font-size: 1.2em;
  padding: 0 2em;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;

  &:hover {
    background: #fff;
    color: #1aab8a;
  }
  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 2px;
    width: 0;
    background: #1aab8a;
    transition: 400ms ease all;
  }
  &:after {
    right: inherit;
    top: inherit;
    left: 0;
    bottom: 0;
  }
  &:hover:before,
  &:hover:after {
    width: 100%;
    transition: 800ms ease all;
  }
`;

const StarPointButton = styled.button`
  border: 0;
  outline: 0;

  background-color: rgba(255, 255, 255, 1);
  color: #ffaf0f;
  font-weight: bold;
  font-size: 2rem;

  font-shadow: -1em 0 black, 0 1em black, 1em 0 black, 0 -1em black;
`;

function TestReviewPage({ history, match }) {

    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [clicked, setClicked] = useState([false, false, false, false, false]);
    const [clickedValue, setClickedValue] = useState(-1);
    const dispatch = useDispatch();

    const modules = {
        toolbar: {
            container: [["bold", "italic", "underline", "image"]],
        }
    };
    const onChangeHandler = function (html) {
        setValue(html);
    };

    const onTitleChange = function (e) {
        setTitle(e.currentTarget.value);
    };

    const onStarClick = function (e) {
        let index = e.currentTarget.value;
        setClickedValue(index);

        let clickStates = [...clicked];
        for (let i = 0; i < 5; i++) {
            if (i <= index) clickStates[i] = true;
            else clickStates[i] = false;
        }

        setClicked(clickStates);
    };

    const sendToReview = function (e) {
        e.preventDefault();

        if (title === '') {
            alert("제목을 입력해주세요")
            return;
        }

        if (value === '') {
            alert('내용을 입력해주세요');
            return;
        }

        if (clickedValue === -1) {
            alert("별점을 추가해주세요")
            return
        }

        const formData = new FormData()

        searchSrc().map((v, i) => { 
            if(v?.length > 1000) { //  "data:image/png;base64~~~"는 1000자를 넘어가기 때문에 + base64만 가져오기 위해서
                const imgBase64 = v;
                const file = DataURIToBlob(imgBase64);

                formData.append('review_img', file, "newimage.png");
            }
          })

        formData.append('title', title);
        formData.append('content', Base64toServerImage());
        formData.append('score', parseInt(clickedValue)+1);

        dispatch(reviewAction.reviewAdd(formData, match.params.storeid)).then(data => {
            history.push('/');
        })
    }

    function Base64toServerImage() {
        const changeStr = value.split('>').map(v => { 
          if(v.includes("<p")) {
           return v + '>'
         } else if(v.includes("</p")) {
         return v + '>'
         } else if(v.includes("<img")) {
           return false
         } else {
         return false
         } } ).filter(v => v !== false).join('')
      
         return changeStr
      } // <p><img ~~~/></p> => <p></p>

    const DataURIToBlob = function (dataURI) {
        const splitDataURI = dataURI.split(',')
        const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
        const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
        const ia = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i++)
            ia[i] = byteString.charCodeAt(i)

        return new Blob([ia], { type: mimeString })
    }

    const searchSrc = () => {
        const arr1 = value.split('img').map(v => v.includes('src') === true && v.split("src="));
        const arr2 = arr1.map(v => v && v[1]?.split("></p"))
        return arr2.map(v => v && v[0].slice(1, v[0]?.length - 1)).filter(v => v !== false);
      } // "data:image/png;base64~~~"

    return (
        <AuthTemplate relative>
            <h1>리뷰쓰기</h1>
            <EditorBlock>
                <InputText
                    type="text"
                    onChange={onTitleChange}
                    value={title}
                    placeholder="제목"
                />
                <ReactQuill
                    style={{ height: "30vh" }}
                    theme="snow"
                    value={value}
                    formats={["bold", "italic", "underline", "image"]}
                    modules={modules}
                    placeholder="이미지는 한개까지만 가능합니다."
                    onChange={(content, delta, source, editor) =>
                        onChangeHandler(editor.getHTML())
                    }
                />

                <br />
                <br />
                <StarPointButton value={0} onClick={onStarClick}>
                    {clicked[0] ? "★" : "☆"}
                </StarPointButton>
                <StarPointButton value={1} onClick={onStarClick}>
                    {clicked[1] ? "★" : "☆"}
                </StarPointButton>
                <StarPointButton value={2} onClick={onStarClick}>
                    {clicked[2] ? "★" : "☆"}
                </StarPointButton>
                <StarPointButton value={3} onClick={onStarClick}>
                    {clicked[3] ? "★" : "☆"}
                </StarPointButton>
                <StarPointButton value={4} onClick={onStarClick}>
                    {clicked[4] ? "★" : "☆"}
                </StarPointButton>
                <br />
                <br />
                <Button onClick={sendToReview}>리뷰작성</Button>
            </EditorBlock>
        </AuthTemplate>
    );
}

export default withRouter(TestReviewPage);

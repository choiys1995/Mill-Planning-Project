import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import AuthTemplate from "../components/auth/AuthTemplate";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import MenuBlock from "../components/common/MenuBlock";
import styled from 'styled-components'
import ImgDiv from '../components/common/ImgDiv'
import * as storeAction from '../_actions/store_actions'
//휴일, 휴식시간 select박스 스타일, 이거는 따로 styled-component만들면 계속 옵션부분이 적용이 안되고 있어서 여기에 배치
const Select = styled.select`
  width: 33%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: 0.5px solid gray;
  border-radius: 4px;
  margin-left: 10px;
  margin-right: 10px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

const InputButton = styled.input`
  border: 0;
  font-size: 0.7rem;
  text-align: center;
  color: #000;
  border-radius: 1.5rem;
  text-shadow: 1px 1px 1px 1px rgba(255, 255, 255, .1);
  background-color: rgba(3, 223, 252, 0)
  background-image: linear-gradient(to top left,
    rgba(0, 0, 0, .2),
    rgba(0, 0, 0, .2) 30%,
    rgba(0, 0, 0, 0));
  box-shadow: inset 2px 2px 3px rgba(255, 255, 255, .6),
  inset -2px -2px 3px rgba(0, 0, 0, .6);
`

const InputFile = styled.input`
    border: 0;
    display: inline-block;
    font-size: 0.7rem;
    text-align: center;
    background-color: rgba(3, 223, 252, 0);
    padding-bottom: 1rem;
`



const AddStorePage = ({history}) => {
  
  const [maxItem, setMaxItem] = useState(1)
  const [selectCategories, setSelectCategories] = useState("한식")
  const [selectIndex, setSelectIndex] = useState(0);

  const [storeName, setStoreName] = useState('')
  const [storeAddress, setStoreAddress] = useState('')
  const [storeTel, setStoreTel] = useState('')
  const [storeDesc, setStoreDesc] = useState('')
  const [storePrepay, setStorePrepay] = useState('')
  const [storeBreakTime1, setStoreBreakTime1] = useState(1400)
  const [storeBreakTime2, setStoreBreakTime2] = useState(1500)
  const [storeHoliday, setStoreHoliday] = useState("월")
  const [storeBussnissNumber, setStoreBussnissNumber] = useState('')
  const [storeImg, setStoreImg] = useState(null)
  const [menuName, setMenuName] = useState(Array(20))
  const [menuPrice, setMenuPrice] = useState(Array(20))
  const [menuImg, setMenuImg] = useState(Array(20))

  const dispatch = useDispatch()

  const addItemLength = function (e) {
    if(maxItem === 20){
      alert(`더 이상 추가할 수 없습니다 \n현재 메뉴의 개수 ${maxItem}`);
      return;
    }
    setMaxItem(maxItem+1)
  }

  const removeItem = function (e) {
    if(maxItem === 1){
      alert("더 이상 삭제할 수 없습니다")
      return;
    }
    setMaxItem(maxItem-1)
  }

  function onSelectChange(e) {
    const selection = parseInt(e.currentTarget.value)
    const categoriesList = ["한식", "중식", "일식", "양식"]
    setSelectIndex(selection)
    setSelectCategories(categoriesList[selection])
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", e.target.sName.value);
    formData.append("address", e.target.sAddress.value);
    formData.append("tel", e.target.sTel.value);
    formData.append("description", e.target.sDesc.value);
    formData.append("prepay", e.target.sPrepay.value);
    formData.append("breaktime", e.target.break1.value);
    formData.append("holyday", e.target.holiday.value);
    formData.append("busino", e.target.busino.value);
    formData.append("categories", selectCategories);
    formData.append("store_img", e.target.store_img.files[0])


    if(maxItem > 1){
      [...Array(maxItem)].map( (n, index) => {
        const file = e.target.menu_img[index].files[0]
        formData.append('menu_name', e.target.menu_name[index].value)
        formData.append('menu_price', e.target.menu_price[index].value)
        formData.append('menu_img_name', file ? file.name : '')
        formData.append('menu_img', file)
      })
    }
    else {
      formData.append('menu_name', e.target.menu_name.value)
      formData.append('menu_price', e.target.menu_price.value)
      formData.append('menu_img', e.target.menu_img.files[0])
    }

    dispatch(storeAction.storeAdd(formData)).then(data => history.push(`/StorePage/${data}`));
  }

  function onChangeInputData(e) {
    switch(e.currentTarget.name){
      case "break1":
        setStoreBreakTime1(parseInt(e.currentTarget.value));
        if(e.currentTarget.value >= storeBreakTime2){
          alert("휴식 시작시간이 종료시간보다 클 수 없습니다.");
          setStoreBreakTime1(1400);
    
          return;
        }
        break;
      case "break2":
        setStoreBreakTime2(parseInt(e.currentTarget.value));
        break;
      case "holiday":
        setStoreHoliday(e.currentTarget.value);
        break;
      default:
    }
  }

  function onChangeTextData(e) {
    const {name, value} = e.currentTarget
    switch(name){
      case "busino":
        setStoreBussnissNumber(value)
        break;
      case "sName":
        setStoreName(value);
        break;
      case "sAddress":
        setStoreAddress(value);
        break;
      case "sTel":
        setStoreTel(value);
        break;
      case "sDesc":
        setStoreDesc(value);
        break;
      case "sPrepay":
        setStorePrepay(value);
        break;
      default:
    }
  }

  const onChangeMenuData = (e) => {
    const {name, value} = e.currentTarget
  }

  const onChangeFileData = (e) => {
    setStoreImg(e.target.files);
  }

  
  return (
    <AuthTemplate relative>
      <h3>가게추가</h3>
    <form action="post" onSubmit={onSubmitHandler} encType="multipart/form-data">
      <Input fullWidth
       placeholder="이름"
       name="sName"
       onChange={onChangeTextData}
       value={storeName}
       />
      <Input fullWidth
       placeholder="주소"
       name="sAddress"
       onChange={onChangeTextData}
       value={storeAddress}
       />
      <Input fullWidth
       placeholder="전화번호 ['-'는 제외하고 입력]"
       pattern="01[016789]\d{7,8}"
       title="형식 01012345678"
       name="sTel"
       onChange={onChangeTextData}
       value={storeTel}
       />
      <Input fullWidth
       placeholder="가게설명"
       name="sDesc"
       onChange={onChangeTextData}
       value={storeDesc}
       />
      <Input fullWidth
       placeholder="선수금"
       name="sPrepay"
       onChange={onChangeTextData}
       value={storePrepay}
       />
      <MenuBlock>
        <p>휴식시간</p>
      <Select name="break1" value={storeBreakTime1} onChange={onChangeInputData}>
        <option value={1400}>14:00</option>
        <option value={1430}>14:30</option>
        <option value={1500}>15:00</option>
        <option value={1530}>15:30</option>
        <option value={1600}>16:00</option>
        <option value={1630}>16:30</option>
      </Select>~
      <Select name="break2" value={storeBreakTime2} onChange={onChangeInputData}>
        <option value={1500}>15:00</option>
        <option value={1530}>15:30</option>
        <option value={1600}>16:00</option>
        <option value={1630}>16:30</option>
        <option value={1700}>17:00</option>
        <option value={1730}>17:30</option>
      </Select>
      </MenuBlock>
      <MenuBlock>
        <p>휴일</p>
        <Select name="holiday" value={storeHoliday} onChange={onChangeInputData}>
        <option value={"없음"} defaultChecked>
          없음
        </option>
        <option value={"월"}>월요일</option>
        <option value={"화"}>화요일</option>
        <option value={"수"}>수요일</option>
        <option value={"목"}>목요일</option>
        <option value={"금"}>금요일</option>
        <option value={"토"}>토요일</option>
        <option value={"일"}>일요일</option>
      </Select>
      </MenuBlock>
      <Input fullWidth name="busino" placeholder="사업자등록번호"
       onChange={onChangeTextData} value={storeBussnissNumber}
      ></Input>
      <span>가게 분류</span>
      <div>
        <input type="radio" 
              name="categories" 
              value={0} 
              checked={selectIndex === 0}
              onChange={onSelectChange}/> 한식
        <input type="radio" 
              name="categories" 
              value={1}
              checked={selectIndex === 1}
              onChange={onSelectChange}/> 중식
        <input type="radio" 
              name="categories" 
              value={2} 
              checked={selectIndex === 2}
              onChange={onSelectChange}/> 일식
        <input type="radio" 
              name="categories" 
              value={3} 
              checked={selectIndex === 3}
              onChange={onSelectChange}/> 양식
      </div>
      <br/>
      
      <InputFile 
        type="file"
        name="store_img"
        onChange={onChangeFileData}
       accept=".gif, .jpg, .png"/>
      {maxItem >= 1 && [...Array(maxItem)].map((n, index) => (
        <MenuBlock high>
          <Input 
          fullWidth
           type="text"
           name={`menu_name`}
           onChange={onChangeMenuData}
           value={menuName[index]}
            placeholder="메뉴명"/>
          <Input 
          fullWidth 
          type="text" 
          name={`menu_price`}
          value={menuPrice[index]}
          onChange={onChangeMenuData}
          placeholder="가격"/>
          <InputFile
           type="file"
           name="menu_img"
           onChange={onChangeFileData}
            accept=".gif, .jpg, .png"
          />
          <InputButton type="button" name={`button${index}`} right onClick={removeItem} value="메뉴삭제"/>
        </MenuBlock>
      ))}

      <InputButton type="button" 
          round style={{ float: "right" }}
          onClick={addItemLength} 
          value="메뉴추가"/>
        
      <br/><br/><br/>

      
      <Button type="submit" fullWidth cyan>
        가게 추가
      </Button>
    </form>
    </AuthTemplate>
  );
};

export default AddStorePage;

//pages/AddStorePage.js [가게에 들어갈내용 + 메뉴넣는기능 만들기 (+를 누르면 추가적으로 메뉴작성할 수 있고 -를 누르면 목록 삭제)]

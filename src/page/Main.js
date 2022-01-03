import React, {useState, useEffect} from 'react'
import style from '../css/Main.module.css'
import { Button, ListGroupItem, Table } from 'react-bootstrap';
import moment from 'moment';
import Footer from '../component/Footer'
import { useHistory } from 'react-router-dom'
import Imginfo from '../component/Imginfo'
import ReactModal from 'react-modal'
import axios from 'axios';



const Main = () => {
  const [list, setList] = useState([])
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  

  function modalHandler() {
    setModal(!modal)
  }

  function deleteModalHandler() {
    setDeleteModal(!deleteModal)
  }

  useEffect(() => {
    axios.get('http://localhost:4000')
    .then((res) => {
      // console.log(res)
      setList(...list, res.data)
    })
  },[])

  // const deletePayload {
    
  // }
  


  return (
    <>
    <Imginfo />
    <div className={style.container}>
      <div className={style.content}>
        <h1 className={style.info}>소식 전하기</h1>
        <div className={style.subInfo}>넥스트코어의 새 소식을 확인하실 수 있습니다.</div>
        <div className={style.bbs}>
          {/* <div className={style.bbsTitle}>
              <div style={{flex:"1"}}>글제목</div>
              <div style={{flex:"0.5"}}>작성자</div>
              <div style={{flex:"0.5"}}>날짜</div>
              <div style={{flex:"1"}}></div>
          </div> */}
          {
            list?.map((item,idx) => {
              return (
                <div className={style.items} key={idx}>
                  <div >{item.TITLE}</div>
                  <div >{item.userName}</div>
                  <div >{item.regDate}</div>
                  <div className={style.btnContent}>
                    <Button onClick={deleteModalHandler}>삭제</Button>
                    <Button>수정</Button>
                  </div>
                </div>
              )
            })
          }
        </div>
              <div className={style.btn}>
                <Button className={style.btn1} onClick={modalHandler} >글쓰기</Button>
                <Button className={style.btn1} onClick={modalHandler} >삭제</Button>
              </div>
        </div>
      {/* <Footer /> */}
      <Modal isOpen={modal} onClose={modalHandler} setModal={setModal} list={list} setList={setList}/>
      <DeleteModal isOpen={deleteModal} onClose={deleteModalHandler} deleteModal={deleteModal} setDeleteModal={setDeleteModal}/>
    </div>
    </>
  )
}

function DeleteModal({isOpen, onClose, setDeleteModal, list, setList}) {

  const [deleteInput, setDeleteInput] = useState()

  const deletePayload = {
    deleteInput : deleteInput
  }

  function deleteInputHandler(e) {
    setDeleteInput(e.target.value)
  }

  function deleteHandler() {
    axios.post('http://localhost:4000/delete', deletePayload)
    .then((res) => {
      setDeleteModal(false)
      axios.get('http://localhost:4000')
      .then((res) => {
        console.log(res.data)
        setList(res.data)
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }


  return (
    <ReactModal
    isOpen={isOpen}
    style={{
      content: {
        width: '600px',
        height: '300px',
        margin: 'auto'
      }
    }}>
      <div className={style.deleteModal}>
        <div style={{marginBottom: "5px"}}>닉네임을 적어주세요.</div>
        <input onChange={deleteInputHandler}></input>
        <div className={style.confirm}>
          <Button onClick={deleteHandler}>확인</Button>
          <Button variant="danger" onClick={onClose}>닫기</Button>
        </div>
      </div>
      
    </ReactModal>
  )
}



function Modal({isOpen, onClose, setModal, list, setList}) {

  const date = moment().format('YYYY-MM-DD')

  const [textArea, setTextArea] = useState()
  const [titleName, setTitleName] = useState()
  const [userName, setUsername] = useState()
  

  function titleNameHandler(e) {
    setTitleName(e.target.value)
  }

  function changeHandler(e) {
    setTextArea(e.target.value)
  }

  function usernameHandler(e) {
    setUsername(e.target.value)
  }


  const payload = {
    title : textArea,
    coment : titleName,
    regdate : date,
    username: userName
  }

  function submit() {
    axios.post('http://localhost:4000/insert', payload)
    .then((res) => {
      // console.log(res)
      setModal(false)
      // if(res.status === 200) {
      //   setList([...list, payload])
      // }
      axios.get('http://localhost:4000')
      .then((res) => {
        console.log(res.data)
        // console.log(res)
        setList(res.data)
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }
  
  return(
    <ReactModal 
    isOpen={isOpen}
    style={{
      content: {
        width: '800px',
        height: '500px',
        margin: 'auto'
      }
    }}>
      <div className={style.modal}>
        <input className={style.titleName} placeholder="닉네임을 입력해주세요." onChange={usernameHandler}></input>
        <input className={style.titleName} placeholder="제목을 입력해주세요." onChange={titleNameHandler}></input>
        <textarea className={style.textarea} onChange={changeHandler} placeholder="게시글을 작성해 주세요."></textarea>
      </div>
      <div className={style.btnWrap}>
        <Button onClick={submit}>등록</Button>
        <Button variant="danger" onClick={onClose}>닫기</Button>
      </div>
    </ReactModal>
  )
}
export default Main
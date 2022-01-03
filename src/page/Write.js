import React, {useState, useEffect} from 'react'
import axios from 'axios'
import style from '../css/Write.module.css'
import {Form, Button} from 'react-bootstrap'

const Write = () => {

  const [input, setInput] = useState({
    title: '',
  })

  function inputHandler(e) {
    setInput({
      text : e.target.value,
    })
  }

  // const payload = {
  //   title:input.text,
  //   coment: "임의의 코멘트",
  //   regdate:"",
  // }

  const payload = {
    title:input.text,
  }

  function submit() {
    axios.post('http://localhost:4000/delete',payload,{withCredentials:true})
    .then((res) => {
      console.log(res.data)
    })
  }

  return (
    <div className={style.container}>
      <div>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control as="textarea" rows={15} />
        </Form.Group>
      </Form>
      </div>
      <Button className={style.btn} onClick={submit}>글쓰기</Button>
    </div>
  )
}

export default Write

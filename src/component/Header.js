import React, {useState, useEffect} from 'react'
import style from '../css/Header.module.css'
import { Button } from 'react-bootstrap';




const Header = () => {

  function handler() {
    console.log('awefwaefawef')
  }


  return (
    <div className={style.container}>
      <div className={style.header}>
          <h2 className={style.infomationTitle}>넥스트코어테크놀로지</h2>
          <div className={style.headerCenter}>
            <div className={style.infomation}>회사소개</div>
            <div className={style.infomation}>사업소개</div>
            <div className={style.infomation}>투자정보</div>
            <div className={style.infomation}>지속가능경영</div>
            <div className={style.infomation}>홍보센터</div>
            <div className={style.infomation}>인재채용</div>
          </div>
          <div className={style.headerRight}>
            <Button className={style.btn}>로그인</Button>
            <Button className={style.btn}>회원가입</Button>
          </div>
      </div>
    </div>

  )
}

export default Header

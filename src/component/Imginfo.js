import React from 'react'
import style from '../css/Imginfo.module.css'
import front from '../picture/front.jpg'

const imgInfo = () => {
  return (
    <div>
      <img src={front} className={style.picture}/>
    </div>
  )
}

export default imgInfo

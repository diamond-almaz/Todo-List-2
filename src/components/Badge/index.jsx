import React from 'react';
import './Badge.scss'
import classNames from 'classnames'

// className={`badge badge--${color}`}
const Badge = ({color,onClick,className}) => <i onClick={onClick} className={classNames('badge',{[`badge--${color}`]: color}, className )}/>

export default Badge;

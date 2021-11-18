
import { Button } from 'antd'
import './top-bar.scss'

const TopBar = ():JSX.Element=>{
    return <div id='top-bar'>
       <div id='bar-fn-content'><Button type='primary'>edit</Button></div>
    </div>
}

export default TopBar
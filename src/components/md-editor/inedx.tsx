import './md-editor.scss'
import SimpleMDE from "react-simplemde-editor";

const MdEditor = ():JSX.Element => {
    return <div id='md-editor'>
        <SimpleMDE value={'value'} style={{height:'100%', width:'100%'}} />
    </div>
}

export default MdEditor
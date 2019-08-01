import React from 'react';
import ReactDOM from 'react-dom';
import HLM from './react-hlm';

const Demo:React.FC = () => {
    return <>
    <div style={{display: 'flex', justifyContent: 'center'}}><HLM.PopText text="Hi! This is react-hlm demo page." distanceMax={0.5} distanceMin={0.2} style={{fontSize:"40px"}}/></div>

    <div style={{display: 'flex', justifyContent: 'center'}}>HLM.Banner spring="none"</div>
    <div style={{display: 'flex', justifyContent: 'center'}}><HLM.Banner spring="none"/></div>

    <div style={{display: 'flex', justifyContent: 'center'}}>HLM.Banner spring="pop"</div>
    <div style={{display: 'flex', justifyContent: 'center'}}><HLM.Banner spring="pop"/></div>

    <div style={{display: 'flex', justifyContent: 'center'}}>HLM.Banner spring="normal"</div>
    <div style={{display: 'flex', justifyContent: 'center'}}><HLM.Banner spring="normal"/></div>

    <div style={{display: 'flex', justifyContent: 'center'}}>HLM.Text</div>
    <div style={{display: 'flex', justifyContent: 'center'}}><HLM.Text/></div>

    <div style={{display: 'flex', justifyContent: 'center'}}>HLM.PopText</div>
    <div style={{display: 'flex', justifyContent: 'center'}}><HLM.PopText/></div>
    </>
}

ReactDOM.render(<Demo/>, document.getElementById('root'));


import React, { useState, useEffect, useRef } from "react";
import './HLM.css';

const acid = (rad:number) =>{
  let r=Math.round(170+80*Math.sin(rad*1));
  let g=Math.round(170+80*Math.sin(rad*1.5));
  let b=Math.round(170+80*Math.sin(rad*1.8));
  return "rgb("+r+","+g+","+b+")";
}
const acidD = (rad:number) =>{ // Dark acid
  let r=Math.round(100+80*Math.sin(rad*1));
  let g=Math.round(100+80*Math.sin(rad*1.5));
  let b=Math.round(100+80*Math.sin(rad*1.8));
  return "rgb("+r+","+g+","+b+")";
}
const acidL = (rad:number) =>{ // Light acid
  let r=Math.round(220+30*Math.sin(rad*1));
  let g=Math.round(220+30*Math.sin(rad*1.5));
  let b=Math.round(220+30*Math.sin(rad*1.8));
  return "rgb("+r+","+g+","+b+")";
}

// define interfaces 
interface BannerProps{
  text?:string,
  rotationSpeed?:number,
  springSpeed?:number,
  distanceMax?:number,
  distanceMin?:number,
  layers?:number,
  waveSpeed?:number,
  colorSpeed?:number,
  style?:any,
  spring?:"none"|"normal"|"pop",
}

interface TextProps{
  text?:string,
  springSpeed?:number,
  distanceMax?:number,
  distanceMin?:number,
  colorSpeed?:number,
  style?:any
}

interface PopTextProps{
  text?:string,
  springSpeed?:number,
  distanceMax?:number,
  distanceMin?:number,
  colorSpeed?:number,
  layers?:number,
  style?:any
}

// define components
export default class HLM {
  static Banner: React.FC<BannerProps> = (props:BannerProps) => {
    const [time, updateTime] = useState<number>(0); // time : milliseconds
    let ref:any = useRef(null);
    const [elementHeight, setElementHeight] = useState<number>(0);

    useEffect(() => {
      setElementHeight(ref.current.offsetHeight);
      window.addEventListener('resize', ()=>setElementHeight(ref.current.offsetHeight));
      const id = setInterval(() => {
        updateTime(t => t + 50);
      }, 50);
      return () => {
        clearInterval(id);
      };
    },[]);

    let style=props.style;
    let text=props.text;
    let rotationSpeed=0.0013 * (props.rotationSpeed!==undefined ? props.rotationSpeed:1);
    let springSpeed=0.0015 * (props.springSpeed!==undefined ? props.springSpeed:1);
    let distanceMax=1 * (props.distanceMax!==undefined ? props.distanceMax:1);
    let distanceMin=0.1 * (props.distanceMin!==undefined ? props.distanceMin:1);
    let layers= (props.layers!==undefined ? props.layers:20);
    let waveSpeed=1 * (props.waveSpeed!==undefined ? props.waveSpeed:1);
    let colorSpeed=0.002 * (props.colorSpeed!==undefined ? props.colorSpeed:1);
    let distance:number;
    if(props.spring==="none"){
      distance=distanceMax;
    }else if(props.spring==="pop"){
      distance=(0.5+0.5*Math.sin(Number(time)*springSpeed))**2*2*distanceMax+distanceMin;
    }else if(props.spring==="normal"){
      distance=(1+Math.sin(Number(time)*springSpeed))*distanceMax+distanceMin;
    }else{
      distance=(1+Math.sin(Number(time)*springSpeed))*distanceMax+distanceMin;
    }

    let vecX=Math.sin(Number(time)*rotationSpeed);
    let vecY=Math.cos(Number(time)*rotationSpeed);

    /* TODO
    const wave = keyframes`
      0% {
        transform: rotate(-10deg);
      }
      50% {
        transform: rotate(10deg);
      }
      100% {
        transform: rotate(-10deg);
      }
    `
    const Wave = styled.span`
      display: flex;
      flex-direction: column;
      animation:${wave} infinite 8s ease;
    `
  */
  
    return (
      <>
      <div style={Object.assign({display:"inline-block"},style)}>
        <div style={{visibility:"hidden"}} ref={ref}>
        {text}
        </div>
        <div style={{   display:"flex",
                        flexDirection:"column",
                        animation:`wave infinite ${8/waveSpeed}s ease`}}>
          {Array.from(Array(layers).keys()).map(layer=>{
            return  <div  key={layer+"_key"} 
                          style={Object.assign({top:`calc(${vecY*layer*distance}px - ${elementHeight}px )`,
                                                left:vecX*layer*distance,
                                                position:"relative",
                                                height:"0",
                                                color:acid(time*colorSpeed+layer*0.1),
                                                zIndex:layer},style)}>
                      {text}
                    </div>
          })}
        </div>
      </div>
      </>
    );
  }


  static Text: React.FC<TextProps> = (props:TextProps) => {
    const [time, updateTime] = useState<number>(0); // time : milliseconds
    let ref:any = useRef(null);
    const [elementHeight, setElementHeight] = useState<number>(0);

    useEffect(() => {
      setElementHeight(ref.current.offsetHeight);
      window.addEventListener('resize', ()=>setElementHeight(ref.current.offsetHeight));
      const id = setInterval(() => {
        updateTime(t => t + 50);
      }, 50);
      return () => {
        clearInterval(id);
      };
    },[]);


    let style=props.style;
    let text=props.text;
    let springSpeed=0.002 * (props.springSpeed!==undefined ? props.springSpeed:1);
    let distanceMax=3 * (props.distanceMax!==undefined ? props.distanceMax:1);
    let distanceMin=2 * (props.distanceMin!==undefined ? props.distanceMin:1);
    let colorSpeed=0.002 * (props.colorSpeed!==undefined ? props.colorSpeed:1);
    let distance=(1+Math.sin(Number(time)*springSpeed))*distanceMax+distanceMin;
    return <>
      <div style={Object.assign({display:"inline-block"},style)}>
        <div style={{visibility:"hidden"}} ref={ref}>
        {text}
        </div>
        {/*under*/}
        <div  key={"text_under_key"} 
              style={Object.assign({top:`calc( ${-elementHeight}px )`,
                                    position:"relative",
                                    height:"0",
                                    color:acidD(time*colorSpeed),
                                    zIndex:"0"},style)}>
          {text}
        </div>
        {/*top*/}
        <div  key={"text_top_key"} 
              style={Object.assign({top:`calc( ${-elementHeight}px - ${distance}px )`,
                                    left:-distance,
                                    position:"relative",
                                    height:"0",
                                    color:acidL(time*colorSpeed),
                                    zIndex:"1"},style)}>
          {text}
        </div>
      </div>
    </>;
  }

  static PopText: React.FC<PopTextProps> = (props:PopTextProps) => {
    const [time, updateTime] = useState<number>(0); // time : milliseconds
    let ref:any = useRef(null);
    const [elementHeight, setElementHeight] = useState<number>(0);

    useEffect(() => {
      setElementHeight(ref.current.offsetHeight);
      window.addEventListener('resize', ()=>setElementHeight(ref.current.offsetHeight));
      const id = setInterval(() => {
        updateTime(t => t + 50);
      }, 50);
      return () => {
        clearInterval(id);
      };
    },[]);

    let style=props.style;
    let text=props.text;
    let springSpeed=0.0015 * (props.springSpeed!==undefined ? props.springSpeed:1);
    let distanceMax=2 * (props.distanceMax!==undefined ? props.distanceMax:1);
    let distanceMin=0 * (props.distanceMin!==undefined ? props.distanceMin:1);
    let layers= (props.layers!==undefined ? props.layers:20);
    let colorSpeed=0.002 * (props.colorSpeed!==undefined ? props.colorSpeed:1);
    let distance=(0.5+0.5*Math.sin(Number(time)*springSpeed))**3*2*distanceMax+distanceMin;
    return (
      <>
      <div style={Object.assign({display:"inline-block"},style)}>
        <div style={{visibility:"hidden"}} ref={ref}>
        {text}
        </div>
        <div style={{   display:"flex",
                        flexDirection:"column"}}>
          {Array.from(Array(layers).keys()).map(layer=>{
            return  <div  key={layer+"_key"} 
                          style={Object.assign({top:`calc(${-layer*distance}px - ${elementHeight}px )`,
                                                position:"relative",
                                                height:"0",
                                                color:acid(time*colorSpeed+layer*0.5),
                                                zIndex:layer},style)}>
                      {text}
                    </div>
          })}
        </div>
      </div>
      </>
    );
  }

}

// define default props
HLM.Banner.defaultProps={
  text:"sample",
  rotationSpeed:1,
  springSpeed:1,
  distanceMax:1,
  distanceMin:1,
  layers:10,
  waveSpeed:1,
  colorSpeed:1,
  style:{fontSize:"80px",fontWeight:"Bold"},
  spring:"pop",
}

HLM.Text.defaultProps={
  text:"sample",
  springSpeed:1,
  distanceMax:1,
  distanceMin:1,
  colorSpeed:1,
  style:{fontSize:"80px",fontWeight:"Bold"}
}

HLM.PopText.defaultProps={
  text:"sample",
  springSpeed:1,
  distanceMax:1,
  distanceMin:1,
  colorSpeed:1,
  layers:5,
  style:{fontSize:"80px",fontWeight:"Bold"}
}



export const Banner = HLM.Banner;
export const Text = HLM.Text;
export const PopText = HLM.PopText;
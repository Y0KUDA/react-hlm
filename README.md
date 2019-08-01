![](./react-hlm.gif)  
react-hlm is a react component provides features like the banner.  

## Demo
https://y0kuda.github.io/react-hlm  
source code : https://github.com/Y0KUDA/react-hlm/blob/master/demo/src/index.tsx

## Components
* HLM.Banner
* HLM.Text
* HLM.PopText
* Banner (same with `HLM.Banner`)
* Text (same with `HLM.Text`)
* PopText (same with `HLM.PopText`)

## Parameters
### HLM.Banner

```typescript
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
  spring?:string,//none, normal, pop
}
```

### HLM.Text

```typescript
interface TextProps{
  text?:string,
  springSpeed?:number,
  distanceMax?:number,
  distanceMin?:number,
  colorSpeed?:number,
  style?:any
}
```

### HLM.PopText

```typescript
interface PopTextProps{
  text?:string,
  springSpeed?:number,
  distanceMax?:number,
  distanceMin?:number,
  colorSpeed?:number,
  layers?:number,
  style?:any
}
```

import{j as t}from"./jsx-runtime-RSP8gDAI.js";import{B as o}from"./Button-LeUce0t6.js";import"./iframe-mTUOMIL7.js";import"./preload-helper-C1FmrZbK.js";const _="_hero_1fr00_1",y="_bgImage_1fr00_13",x="_overlay_1fr00_26",b="_content_1fr00_33",v="_textContainer_1fr00_43",S="_title_1fr00_50",j="_subtitle_1fr00_61",N="_actions_1fr00_70",r={hero:_,bgImage:y,overlay:x,content:b,textContainer:v,title:S,subtitle:j,actions:N};function g({title:f,subtitle:s,imageUrl:h,primaryAction:i,secondaryAction:n}){return t.jsxs("div",{className:r.hero,children:[t.jsx("div",{className:r.bgImage,style:{backgroundImage:`url(${h})`}}),t.jsx("div",{className:r.overlay}),t.jsxs("div",{className:r.content,children:[t.jsxs("div",{className:r.textContainer,children:[t.jsx("h1",{className:r.title,children:f}),s&&t.jsx("p",{className:r.subtitle,children:s})]}),(i||n)&&t.jsxs("div",{className:r.actions,children:[i,n]})]})]})}g.__docgenInfo={description:"",methods:[],displayName:"Hero"};const w={title:"Components/Hero",component:g,parameters:{layout:"fullscreen"}},e={args:{title:"Discover Next-Gen Sounds",subtitle:"Join the premier marketplace for electronic music creators. Buy, sell, and collaborate on premium tracks and samples.",imageUrl:"https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1920",primaryAction:t.jsx(o,{variant:"primary",size:"lg",children:"Start Exploring"}),secondaryAction:t.jsx(o,{variant:"secondary",size:"lg",style:{color:"#fff",borderColor:"rgba(255,255,255,0.4)",background:"rgba(0,0,0,0.4)"},children:"Sign Up Free"})}},a={args:{title:"Artist Spotlight: Sarah Synths",imageUrl:"https://images.unsplash.com/photo-1493225457124-a1a2a5f5f923?auto=format&fit=crop&q=80&w=1920",primaryAction:t.jsx(o,{variant:"primary",size:"md",children:"Follow Artist"})}};var c,l,m;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    title: 'Discover Next-Gen Sounds',
    subtitle: 'Join the premier marketplace for electronic music creators. Buy, sell, and collaborate on premium tracks and samples.',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1920',
    primaryAction: <Button variant="primary" size="lg">Start Exploring</Button>,
    secondaryAction: <Button variant="secondary" size="lg" style={{
      color: '#fff',
      borderColor: 'rgba(255,255,255,0.4)',
      background: 'rgba(0,0,0,0.4)'
    }}>Sign Up Free</Button>
  }
}`,...(m=(l=e.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var p,d,u;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    title: 'Artist Spotlight: Sarah Synths',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f923?auto=format&fit=crop&q=80&w=1920',
    primaryAction: <Button variant="primary" size="md">Follow Artist</Button>
  }
}`,...(u=(d=a.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};const z=["Default","Minimal"];export{e as Default,a as Minimal,z as __namedExportsOrder,w as default};

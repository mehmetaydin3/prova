import{j as e}from"./jsx-runtime-RSP8gDAI.js";import{r as w}from"./iframe-mTUOMIL7.js";import"./preload-helper-C1FmrZbK.js";const I="_container_upcyv_1",B="_left_upcyv_24",S="_rank_upcyv_32",O="_coverWrapper_upcyv_42",W="_cover_upcyv_42",$="_coverPlaceholder_upcyv_58",E="_playOverlay_upcyv_64",T="_isPlaying_upcyv_80",U="_info_upcyv_84",q="_title_upcyv_91",G="_artist_upcyv_101",K="_right_upcyv_110",M="_duration_upcyv_117",V="_likeBtn_upcyv_124",z="_liked_upcyv_144",H="_bars_upcyv_153",R="_bar_upcyv_153",a={container:I,left:B,rank:S,coverWrapper:O,cover:W,coverPlaceholder:$,playOverlay:E,isPlaying:T,info:U,title:q,artist:G,right:K,duration:M,likeBtn:V,liked:z,bars:H,bar:R};function b({rank:r,title:i,artist:P,duration:p,coverUrl:d,isPlaying:l=!1,onPlay:u,onLike:_}){const[t,D]=w.useState(!1),C=n=>{n.stopPropagation(),D(!t),_&&_(!t)},m=()=>{u&&u()},L=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),m())};return e.jsxs("div",{className:a.container,onClick:m,onKeyDown:L,role:"button",tabIndex:0,children:[e.jsxs("div",{className:a.left,children:[r&&e.jsx("span",{className:a.rank,children:r}),e.jsxs("div",{className:a.coverWrapper,children:[d?e.jsx("img",{src:d,alt:`${i} cover`,className:a.cover}):e.jsx("div",{className:a.coverPlaceholder}),e.jsx("button",{className:`${a.playOverlay} ${l?a.isPlaying:""}`,"aria-label":l?"Pause":"Play",children:l?e.jsxs("span",{className:a.bars,children:[e.jsx("span",{className:a.bar}),e.jsx("span",{className:a.bar}),e.jsx("span",{className:a.bar})]}):e.jsx(Z,{})})]}),e.jsxs("div",{className:a.info,children:[e.jsx("span",{className:a.title,children:i}),e.jsx("span",{className:a.artist,children:P})]})]}),e.jsxs("div",{className:a.right,children:[p&&e.jsx("span",{className:a.duration,children:p}),e.jsx("button",{className:`${a.likeBtn} ${t?a.liked:""}`,onClick:C,"aria-label":t?"Unlike":"Like",children:e.jsx(A,{filled:t})})]})]})}function Z(){return e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 16 16",fill:"currentColor",children:e.jsx("path",{d:"M4.5 2.5L13 8L4.5 13.5V2.5Z"})})}function A({filled:r}){return e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:r?"currentColor":"none",stroke:"currentColor",strokeWidth:r?"0":"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"})})}b.__docgenInfo={description:"",methods:[],displayName:"TrackItem",props:{isPlaying:{defaultValue:{value:"false",computed:!1},required:!1}}};const X={title:"Components/TrackItem",component:b,parameters:{layout:"padded"}},s={args:{rank:1,title:"Neon Nights",artist:"Cyber Synth",duration:"3:45",coverUrl:"https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop",isPlaying:!1}},o={args:{...s.args,rank:2,title:"Digital Dreams",isPlaying:!0}},c={args:{...s.args,rank:3,title:"Lost in the Grid",coverUrl:null}};var v,h,y;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    rank: 1,
    title: 'Neon Nights',
    artist: 'Cyber Synth',
    duration: '3:45',
    coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop',
    isPlaying: false
  }
}`,...(y=(h=s.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var f,g,k;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    rank: 2,
    title: 'Digital Dreams',
    isPlaying: true
  }
}`,...(k=(g=o.parameters)==null?void 0:g.docs)==null?void 0:k.source}}};var x,j,N;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    rank: 3,
    title: 'Lost in the Grid',
    coverUrl: null
  }
}`,...(N=(j=c.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};const Y=["Default","Playing","NoCover"];export{s as Default,c as NoCover,o as Playing,Y as __namedExportsOrder,X as default};

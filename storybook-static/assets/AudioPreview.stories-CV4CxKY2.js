import{j as r}from"./jsx-runtime-RSP8gDAI.js";import{A as c}from"./AudioPreview-Dj3azOQd.js";import"./iframe-mTUOMIL7.js";import"./preload-helper-C1FmrZbK.js";const j={title:"Design System/AudioPreview",component:c,argTypes:{title:{control:"text"},duration:{control:"text"},src:{control:"text"}},decorators:[U=>r.jsx("div",{style:{maxWidth:"480px"},children:r.jsx(U,{})})]},e="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",t={args:{title:"Late Night Vibes (Beat)",duration:"2:34",src:e}},o={args:{title:"Soulful Loop",duration:"1:48",src:e,waveformData:[.3,.5,.8,.6,.9,.4,.7,.5,.6,.8,.9,.7,.5,.3,.4,.6,.8,.7,.9,.6,.5,.7,.9,.8,.6,.4,.3,.5,.7,.9,.8,.6,.5,.7,.8,.9,.6,.4,.3,.5]}},a={args:{title:"Hook Idea #3",duration:"0:45",src:e}},s={args:{title:"Metropolitan Nights — Extended Mix (Unreleased)",duration:"5:12",src:e}},i={args:{title:"Unavailable Track",duration:"3:00",src:""}},n={render:()=>r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px",maxWidth:"480px"},children:[r.jsx(c,{title:"Late Night Vibes (Beat)",duration:"2:34",src:e}),r.jsx(c,{title:"Trap Soul Instrumental",duration:"3:12",src:e}),r.jsx(c,{title:"808 Melody Loop",duration:"1:55",src:e})]})};var d,l,u;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    title: 'Late Night Vibes (Beat)',
    duration: '2:34',
    src: DEMO_AUDIO
  }
}`,...(u=(l=t.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var p,m,x;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    title: 'Soulful Loop',
    duration: '1:48',
    src: DEMO_AUDIO,
    waveformData: [0.3, 0.5, 0.8, 0.6, 0.9, 0.4, 0.7, 0.5, 0.6, 0.8, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6, 0.8, 0.7, 0.9, 0.6, 0.5, 0.7, 0.9, 0.8, 0.6, 0.4, 0.3, 0.5, 0.7, 0.9, 0.8, 0.6, 0.5, 0.7, 0.8, 0.9, 0.6, 0.4, 0.3, 0.5]
  }
}`,...(x=(m=o.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};var g,D,v;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    title: 'Hook Idea #3',
    duration: '0:45',
    src: DEMO_AUDIO
  }
}`,...(v=(D=a.parameters)==null?void 0:D.docs)==null?void 0:v.source}}};var h,O,S;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    title: 'Metropolitan Nights — Extended Mix (Unreleased)',
    duration: '5:12',
    src: DEMO_AUDIO
  }
}`,...(S=(O=s.parameters)==null?void 0:O.docs)==null?void 0:S.source}}};var M,f,A;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    title: 'Unavailable Track',
    duration: '3:00',
    src: ''
  }
}`,...(A=(f=i.parameters)==null?void 0:f.docs)==null?void 0:A.source}}};var I,w,E;n.parameters={...n.parameters,docs:{...(I=n.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxWidth: '480px'
  }}>
      <AudioPreview title="Late Night Vibes (Beat)" duration="2:34" src={DEMO_AUDIO} />
      <AudioPreview title="Trap Soul Instrumental" duration="3:12" src={DEMO_AUDIO} />
      <AudioPreview title="808 Melody Loop" duration="1:55" src={DEMO_AUDIO} />
    </div>
}`,...(E=(w=n.parameters)==null?void 0:w.docs)==null?void 0:E.source}}};const N=["Default","WithCustomWaveform","ShortTrack","LongTitle","NoSource","MultiplePreviewsInContext"];export{t as Default,s as LongTitle,n as MultiplePreviewsInContext,i as NoSource,a as ShortTrack,o as WithCustomWaveform,N as __namedExportsOrder,j as default};

import{j as e}from"./jsx-runtime-RSP8gDAI.js";import{r as ee}from"./iframe-mTUOMIL7.js";import"./preload-helper-C1FmrZbK.js";const re="_wrapper_hoiqn_1",ae="_label_hoiqn_8",le="_inputWrap_hoiqn_17",oe="_disabled_hoiqn_51",se="_error_hoiqn_51",te="_sm_hoiqn_57",ne="_md_hoiqn_62",ie="_input_hoiqn_17",ce="_icon_hoiqn_118",pe="_iconRight_hoiqn_119",de="_helperText_hoiqn_137",ue="_errorText_hoiqn_145",r={wrapper:re,label:ae,inputWrap:le,disabled:oe,error:se,sm:te,md:ne,input:ie,icon:ce,iconRight:pe,helperText:de,errorText:ue};function a({label:s,placeholder:G,helperText:h,errorText:x,leftIcon:b,rightIcon:g,disabled:_=!1,size:J="md",value:K,onChange:L,type:M="text",id:U,className:Y="",...O}){const Q=ee.useId(),l=U||Q,o=!!x,X=[r.wrapper,Y].filter(Boolean).join(" "),Z=[r.inputWrap,r[J],o?r.error:"",_?r.disabled:""].filter(Boolean).join(" ");return e.jsxs("div",{className:X,children:[s&&e.jsx("label",{htmlFor:l,className:r.label,children:s}),e.jsxs("div",{className:Z,children:[b&&e.jsx("span",{className:r.icon,"aria-hidden":"true",children:b}),e.jsx("input",{id:l,type:M,className:r.input,placeholder:G,disabled:_,value:K,onChange:L,"aria-invalid":o,"aria-describedby":o?`${l}-error`:h?`${l}-helper`:void 0,...O}),g&&e.jsx("span",{className:r.iconRight,"aria-hidden":"true",children:g})]}),o&&e.jsx("p",{id:`${l}-error`,className:r.errorText,role:"alert",children:x}),!o&&h&&e.jsx("p",{id:`${l}-helper`,className:r.helperText,children:h})]})}a.__docgenInfo={description:"",methods:[],displayName:"Input",props:{disabled:{defaultValue:{value:"false",computed:!1},required:!1},size:{defaultValue:{value:"'md'",computed:!1},required:!1},type:{defaultValue:{value:"'text'",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1}}};const be={title:"Design System/Input",component:a,argTypes:{size:{control:"select",options:["sm","md"]},disabled:{control:"boolean"},label:{control:"text"},placeholder:{control:"text"},helperText:{control:"text"},errorText:{control:"text"}},decorators:[s=>e.jsx("div",{style:{maxWidth:"360px"},children:e.jsx(s,{})})]},t={args:{label:"Search musicians",placeholder:"e.g. Hip-hop producer, mixing engineer..."}},n={args:{label:"Your stage name",placeholder:"DJ Khalid, Metro Boomin...",helperText:"This will be shown on your public profile."}},i={args:{label:"Email address",placeholder:"you@example.com",value:"not-an-email",errorText:"Please enter a valid email address."}},c={args:{label:"Search",placeholder:"Find musicians, genres, or locations...",leftIcon:"🔍"}},p={args:{label:"Hourly rate",placeholder:"0",leftIcon:"$",rightIcon:"/hr",helperText:"Set your minimum booking rate."}},d={args:{label:"Username",value:"marcus_beats",disabled:!0,helperText:"Contact support to change your username."}},u={args:{size:"sm",label:"Genre filter",placeholder:"Hip-Hop, R&B, Pop..."}},m={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px",maxWidth:"360px"},children:[e.jsx(a,{label:"Default",placeholder:"Search musicians..."}),e.jsx(a,{label:"With helper",placeholder:"your@email.com",helperText:"We'll never share your email."}),e.jsx(a,{label:"With error",placeholder:"your@email.com",value:"bad-email",errorText:"Please enter a valid email address."}),e.jsx(a,{label:"Disabled",value:"marcus_beats",disabled:!0,helperText:"Contact support to change your username."}),e.jsx(a,{label:"With icon",placeholder:"Search...",leftIcon:"🔍"})]})};var f,y,v;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    label: 'Search musicians',
    placeholder: 'e.g. Hip-hop producer, mixing engineer...'
  }
}`,...(v=(y=t.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var T,W,S;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    label: 'Your stage name',
    placeholder: 'DJ Khalid, Metro Boomin...',
    helperText: 'This will be shown on your public profile.'
  }
}`,...(S=(W=n.parameters)==null?void 0:W.docs)==null?void 0:S.source}}};var I,j,q;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    value: 'not-an-email',
    errorText: 'Please enter a valid email address.'
  }
}`,...(q=(j=i.parameters)==null?void 0:j.docs)==null?void 0:q.source}}};var D,H,N;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    label: 'Search',
    placeholder: 'Find musicians, genres, or locations...',
    leftIcon: '🔍'
  }
}`,...(N=(H=c.parameters)==null?void 0:H.docs)==null?void 0:N.source}}};var w,R,E;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    label: 'Hourly rate',
    placeholder: '0',
    leftIcon: '$',
    rightIcon: '/hr',
    helperText: 'Set your minimum booking rate.'
  }
}`,...(E=(R=p.parameters)==null?void 0:R.docs)==null?void 0:E.source}}};var B,C,P;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    label: 'Username',
    value: 'marcus_beats',
    disabled: true,
    helperText: 'Contact support to change your username.'
  }
}`,...(P=(C=d.parameters)==null?void 0:C.docs)==null?void 0:P.source}}};var $,z,V;u.parameters={...u.parameters,docs:{...($=u.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    size: 'sm',
    label: 'Genre filter',
    placeholder: 'Hip-Hop, R&B, Pop...'
  }
}`,...(V=(z=u.parameters)==null?void 0:z.docs)==null?void 0:V.source}}};var F,k,A;m.parameters={...m.parameters,docs:{...(F=m.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '360px'
  }}>
      <Input label="Default" placeholder="Search musicians..." />
      <Input label="With helper" placeholder="your@email.com" helperText="We'll never share your email." />
      <Input label="With error" placeholder="your@email.com" value="bad-email" errorText="Please enter a valid email address." />
      <Input label="Disabled" value="marcus_beats" disabled helperText="Contact support to change your username." />
      <Input label="With icon" placeholder="Search..." leftIcon="🔍" />
    </div>
}`,...(A=(k=m.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};const ge=["Default","WithHelperText","WithError","WithLeftIcon","WithRightIcon","Disabled","Small","AllStates"];export{m as AllStates,t as Default,d as Disabled,u as Small,i as WithError,n as WithHelperText,c as WithLeftIcon,p as WithRightIcon,ge as __namedExportsOrder,be as default};

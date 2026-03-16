import{j as e}from"./jsx-runtime-RSP8gDAI.js";import{A as r}from"./Avatar-CDZZBsuj.js";import"./iframe-mTUOMIL7.js";import"./preload-helper-C1FmrZbK.js";const _={title:"Design System/Avatar",component:r,argTypes:{size:{control:"select",options:["xs","sm","md","lg","xl"]},tier:{control:"select",options:["none","pro","verified"]},online:{control:"boolean"},name:{control:"text"},src:{control:"text"}}},n={args:{src:"https://i.pravatar.cc/150?img=12",name:"Marcus Johnson",size:"md",online:!1,tier:"none"}},s={args:{name:"Aaliyah Rivera",size:"md",online:!1,tier:"none"}},i={args:{name:"Jordan Lee",size:"md",online:!0,tier:"none"}},a={args:{name:"Sofia Chen",size:"lg",online:!0,tier:"verified"}},o={args:{name:"Devon Miles",size:"lg",online:!1,tier:"pro"}},t={args:{name:"Marcus Johnson",size:"xl",online:!0,tier:"verified"}},l={render:()=>e.jsxs("div",{style:{display:"flex",alignItems:"flex-end",gap:"16px"},children:[e.jsx(r,{name:"Alex Kim",size:"xs"}),e.jsx(r,{name:"Alex Kim",size:"sm"}),e.jsx(r,{name:"Alex Kim",size:"md"}),e.jsx(r,{name:"Alex Kim",size:"lg"}),e.jsx(r,{name:"Alex Kim",size:"xl"})]})},m={render:()=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(r,{name:"Basic User",size:"lg",tier:"none",online:!0}),e.jsx("p",{style:{fontSize:"12px",marginTop:"8px",color:"#737373"},children:"None"})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(r,{name:"Pro User",size:"lg",tier:"pro",online:!0}),e.jsx("p",{style:{fontSize:"12px",marginTop:"8px",color:"#737373"},children:"Pro"})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(r,{name:"Verified User",size:"lg",tier:"verified",online:!0}),e.jsx("p",{style:{fontSize:"12px",marginTop:"8px",color:"#737373"},children:"Verified"})]})]})};var c,p,d;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    src: 'https://i.pravatar.cc/150?img=12',
    name: 'Marcus Johnson',
    size: 'md',
    online: false,
    tier: 'none'
  }
}`,...(d=(p=n.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var x,g,u;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    name: 'Aaliyah Rivera',
    size: 'md',
    online: false,
    tier: 'none'
  }
}`,...(u=(g=s.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var v,z,f;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    name: 'Jordan Lee',
    size: 'md',
    online: true,
    tier: 'none'
  }
}`,...(f=(z=i.parameters)==null?void 0:z.docs)==null?void 0:f.source}}};var A,y,h;a.parameters={...a.parameters,docs:{...(A=a.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    name: 'Sofia Chen',
    size: 'lg',
    online: true,
    tier: 'verified'
  }
}`,...(h=(y=a.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var S,j,T;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    name: 'Devon Miles',
    size: 'lg',
    online: false,
    tier: 'pro'
  }
}`,...(T=(j=o.parameters)==null?void 0:j.docs)==null?void 0:T.source}}};var K,I,J;t.parameters={...t.parameters,docs:{...(K=t.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    name: 'Marcus Johnson',
    size: 'xl',
    online: true,
    tier: 'verified'
  }
}`,...(J=(I=t.parameters)==null?void 0:I.docs)==null?void 0:J.source}}};var M,P,U;l.parameters={...l.parameters,docs:{...(M=l.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    alignItems: 'flex-end',
    gap: '16px'
  }}>
      <Avatar name="Alex Kim" size="xs" />
      <Avatar name="Alex Kim" size="sm" />
      <Avatar name="Alex Kim" size="md" />
      <Avatar name="Alex Kim" size="lg" />
      <Avatar name="Alex Kim" size="xl" />
    </div>
}`,...(U=(P=l.parameters)==null?void 0:P.docs)==null?void 0:U.source}}};var V,E,L;m.parameters={...m.parameters,docs:{...(V=m.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  }}>
      <div style={{
      textAlign: 'center'
    }}>
        <Avatar name="Basic User" size="lg" tier="none" online />
        <p style={{
        fontSize: '12px',
        marginTop: '8px',
        color: '#737373'
      }}>None</p>
      </div>
      <div style={{
      textAlign: 'center'
    }}>
        <Avatar name="Pro User" size="lg" tier="pro" online />
        <p style={{
        fontSize: '12px',
        marginTop: '8px',
        color: '#737373'
      }}>Pro</p>
      </div>
      <div style={{
      textAlign: 'center'
    }}>
        <Avatar name="Verified User" size="lg" tier="verified" online />
        <p style={{
        fontSize: '12px',
        marginTop: '8px',
        color: '#737373'
      }}>Verified</p>
      </div>
    </div>
}`,...(L=(E=m.parameters)==null?void 0:E.docs)==null?void 0:L.source}}};const B=["WithImage","WithInitials","Online","TierVerified","TierPro","ExtraLarge","AllSizes","AllTiers"];export{l as AllSizes,m as AllTiers,t as ExtraLarge,i as Online,o as TierPro,a as TierVerified,n as WithImage,s as WithInitials,B as __namedExportsOrder,_ as default};

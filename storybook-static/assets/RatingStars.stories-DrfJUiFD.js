import{j as u}from"./jsx-runtime-RSP8gDAI.js";import{R as E}from"./RatingStars-CjIT2Y8k.js";import"./iframe-mTUOMIL7.js";import"./preload-helper-C1FmrZbK.js";const P={title:"Design System/RatingStars",component:E,argTypes:{rating:{control:{type:"range",min:0,max:5,step:.1}},reviewCount:{control:"number"},size:{control:"select",options:["sm","md"]},showCount:{control:"boolean"}}},e={args:{rating:4.8,reviewCount:124,size:"md",showCount:!0}},r={args:{rating:5,reviewCount:231,size:"md",showCount:!0}},s={args:{rating:3.5,reviewCount:48,size:"md",showCount:!0}},o={args:{rating:2.3,reviewCount:11,size:"md",showCount:!0}},t={args:{rating:5,size:"md",showCount:!1}},a={args:{rating:4.9,reviewCount:89,size:"sm",showCount:!0}},n={render:()=>u.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[5,4.8,4.5,4,3.5,3,2.5,2,1.5,1].map(i=>u.jsx(E,{rating:i,reviewCount:Math.floor(i*30),size:"md",showCount:!0},i))})};var c,m,p;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    rating: 4.8,
    reviewCount: 124,
    size: 'md',
    showCount: true
  }
}`,...(p=(m=e.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var g,d,l;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    rating: 5.0,
    reviewCount: 231,
    size: 'md',
    showCount: true
  }
}`,...(l=(d=r.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var w,C,h;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    rating: 3.5,
    reviewCount: 48,
    size: 'md',
    showCount: true
  }
}`,...(h=(C=s.parameters)==null?void 0:C.docs)==null?void 0:h.source}}};var v,S,f;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    rating: 2.3,
    reviewCount: 11,
    size: 'md',
    showCount: true
  }
}`,...(f=(S=o.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var z,x,R;t.parameters={...t.parameters,docs:{...(z=t.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    rating: 5.0,
    size: 'md',
    showCount: false
  }
}`,...(R=(x=t.parameters)==null?void 0:x.docs)==null?void 0:R.source}}};var y,D,j;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    rating: 4.9,
    reviewCount: 89,
    size: 'sm',
    showCount: true
  }
}`,...(j=(D=a.parameters)==null?void 0:D.docs)==null?void 0:j.source}}};var _,b,A;n.parameters={...n.parameters,docs:{...(_=n.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
      {[5.0, 4.8, 4.5, 4.0, 3.5, 3.0, 2.5, 2.0, 1.5, 1.0].map(r => <RatingStars key={r} rating={r} reviewCount={Math.floor(r * 30)} size="md" showCount />)}
    </div>
}`,...(A=(b=n.parameters)==null?void 0:b.docs)==null?void 0:A.source}}};const k=["Default","PerfectScore","HalfStar","LowRating","NoReviews","Small","AllRatings"];export{n as AllRatings,e as Default,s as HalfStar,o as LowRating,t as NoReviews,r as PerfectScore,a as Small,k as __namedExportsOrder,P as default};

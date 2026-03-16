import{j as e}from"./jsx-runtime-RSP8gDAI.js";import"./iframe-mTUOMIL7.js";import{A as f}from"./Avatar-CDZZBsuj.js";import{m as u}from"./musicians-GF2V6IQD.js";import"./preload-helper-C1FmrZbK.js";const _="_section_mprdr_1",x="_header_mprdr_9",g="_title_mprdr_16",h="_count_mprdr_23",k="_grid_mprdr_28",j="_friendCard_mprdr_34",N="_info_mprdr_48",v="_name_mprdr_52",w="_tagline_mprdr_62",y="_viewAll_mprdr_71",n={section:_,header:x,title:g,count:h,grid:k,friendCard:j,info:N,name:v,tagline:w,viewAll:y};function o({friends:r=[]}){return r.length===0?null:e.jsxs("section",{className:n.section,children:[e.jsxs("div",{className:n.header,children:[e.jsx("h3",{className:n.title,children:"Professional Network"}),e.jsxs("span",{className:n.count,children:[r.length," connections"]})]}),e.jsx("div",{className:n.grid,children:r.map(s=>e.jsxs("div",{className:n.friendCard,children:[e.jsx(f,{src:s.avatarSrc,name:s.name,size:"lg",className:n.avatar}),e.jsxs("div",{className:n.info,children:[e.jsx("h4",{className:n.name,children:s.name}),e.jsx("p",{className:n.tagline,children:s.tagline})]})]},s.id))}),e.jsxs("button",{className:n.viewAll,children:["View full network",e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"9 18 15 12 9 6"})})]})]})}o.__docgenInfo={description:`NetworkSection component to display musician connections
@param {Object} props
@param {Array} props.friends - Array of friend objects { id, name, avatarSrc, tagline }`,methods:[],displayName:"NetworkSection",props:{friends:{defaultValue:{value:"[]",computed:!1},required:!1}}};const D={title:"Design System/NetworkSection",component:o},a=()=>{const r=u.slice(0,4);return e.jsx("div",{style:{maxWidth:"800px",margin:"0 auto",padding:"20px",backgroundColor:"#f9fafb"},children:e.jsx(o,{friends:r})})},i=()=>{const r=u.slice(0,2);return e.jsx("div",{style:{maxWidth:"800px",margin:"0 auto",padding:"20px",backgroundColor:"#f9fafb"},children:e.jsx(o,{friends:r})})};a.__docgenInfo={description:"",methods:[],displayName:"Default"};i.__docgenInfo={description:"",methods:[],displayName:"FewFriends"};var t,c,d;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`() => {
  // Use first 4 musicians from mock data as friends
  const mockFriends = musiciansData.slice(0, 4);
  return <div style={{
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9fafb'
  }}>
      <NetworkSection friends={mockFriends} />
    </div>;
}`,...(d=(c=a.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var l,m,p;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
  const mockFriends = musiciansData.slice(0, 2);
  return <div style={{
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9fafb'
  }}>
      <NetworkSection friends={mockFriends} />
    </div>;
}`,...(p=(m=i.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const W=["Default","FewFriends"];export{a as Default,i as FewFriends,W as __namedExportsOrder,D as default};

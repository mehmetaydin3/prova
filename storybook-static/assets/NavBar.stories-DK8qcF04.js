import{j as t}from"./jsx-runtime-RSP8gDAI.js";import{r as D}from"./iframe-mTUOMIL7.js";import{N as l}from"./NavBar-PH6N0KXI.js";import"./preload-helper-C1FmrZbK.js";import"./Button-LeUce0t6.js";const b={title:"Navigation/NavBar",component:l,parameters:{layout:"fullscreen"}},r={args:{isDark:!1}},e={args:{isDark:!0},parameters:{backgrounds:{default:"dark"}}},a={render:()=>{const[s,f]=D.useState(!1);return t.jsx("div",{"data-theme":s?"dark":void 0,style:{minHeight:"200px",background:s?"#000":"#f4f4f5"},children:t.jsx(l,{isDark:s,onThemeToggle:()=>f(g=>!g)})})}};var n,o,d;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    isDark: false
  }
}`,...(d=(o=r.parameters)==null?void 0:o.docs)==null?void 0:d.source}}};var c,i,m;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    isDark: true
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}`,...(m=(i=e.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var u,p,k;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => {
    const [dark, setDark] = useState(false);
    return <div data-theme={dark ? 'dark' : undefined} style={{
      minHeight: '200px',
      background: dark ? '#000' : '#f4f4f5'
    }}>
        <NavBar isDark={dark} onThemeToggle={() => setDark(d => !d)} />
      </div>;
  }
}`,...(k=(p=a.parameters)==null?void 0:p.docs)==null?void 0:k.source}}};const j=["Default","DarkMode","Interactive"];export{e as DarkMode,r as Default,a as Interactive,j as __namedExportsOrder,b as default};

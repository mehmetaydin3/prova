import{j as a}from"./jsx-runtime-RSP8gDAI.js";import{r as E}from"./iframe-mTUOMIL7.js";import{T as e}from"./Tag-uy1UJhVb.js";import"./preload-helper-C1FmrZbK.js";const z={title:"Design System/Tag",component:e,argTypes:{variant:{control:"select",options:["default","genre","skill"]},removable:{control:"boolean"},label:{control:"text"},onRemove:{action:"removed"}}},r={args:{label:"Electronic",variant:"default"}},l={args:{label:"Hip-Hop",variant:"genre"}},s={args:{label:"Beat Making",variant:"skill"}},t={args:{label:"R&B",variant:"genre",removable:!0}},n={render:()=>{const[p,W]=E.useState(["Hip-Hop","R&B","Trap","Lo-fi","Soul"]);return a.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px",maxWidth:"400px"},children:[p.map(o=>a.jsx(e,{label:o,variant:"genre",removable:!0,onRemove:()=>W(B=>B.filter(D=>D!==o))},o)),p.length===0&&a.jsx("span",{style:{fontSize:"13px",color:"#737373",fontFamily:"sans-serif"},children:"All tags removed. Refresh to reset."})]})}},i={render:()=>a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[a.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px"},children:[a.jsx(e,{label:"Hip-Hop",variant:"genre"}),a.jsx(e,{label:"R&B",variant:"genre"}),a.jsx(e,{label:"Trap",variant:"genre"}),a.jsx(e,{label:"Electronic",variant:"genre"})]}),a.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px"},children:[a.jsx(e,{label:"Mixing",variant:"skill"}),a.jsx(e,{label:"Mastering",variant:"skill"}),a.jsx(e,{label:"Songwriting",variant:"skill"}),a.jsx(e,{label:"Vocal Production",variant:"skill"})]}),a.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px"},children:[a.jsx(e,{label:"Default Tag",variant:"default"}),a.jsx(e,{label:"Another Tag",variant:"default"})]})]})};var g,c,d;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: 'Electronic',
    variant: 'default'
  }
}`,...(d=(c=r.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var v,x,m;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    label: 'Hip-Hop',
    variant: 'genre'
  }
}`,...(m=(x=l.parameters)==null?void 0:x.docs)==null?void 0:m.source}}};var f,u,b;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    label: 'Beat Making',
    variant: 'skill'
  }
}`,...(b=(u=s.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};var y,T,j;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    label: 'R&B',
    variant: 'genre',
    removable: true
  }
}`,...(j=(T=t.parameters)==null?void 0:T.docs)==null?void 0:j.source}}};var S,k,R;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => {
    const [tags, setTags] = useState(['Hip-Hop', 'R&B', 'Trap', 'Lo-fi', 'Soul']);
    return <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      maxWidth: '400px'
    }}>
        {tags.map(tag => <Tag key={tag} label={tag} variant="genre" removable onRemove={() => setTags(prev => prev.filter(t => t !== tag))} />)}
        {tags.length === 0 && <span style={{
        fontSize: '13px',
        color: '#737373',
        fontFamily: 'sans-serif'
      }}>
            All tags removed. Refresh to reset.
          </span>}
      </div>;
  }
}`,...(R=(k=n.parameters)==null?void 0:k.docs)==null?void 0:R.source}}};var h,H,w;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
      <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px'
    }}>
        <Tag label="Hip-Hop" variant="genre" />
        <Tag label="R&B" variant="genre" />
        <Tag label="Trap" variant="genre" />
        <Tag label="Electronic" variant="genre" />
      </div>
      <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px'
    }}>
        <Tag label="Mixing" variant="skill" />
        <Tag label="Mastering" variant="skill" />
        <Tag label="Songwriting" variant="skill" />
        <Tag label="Vocal Production" variant="skill" />
      </div>
      <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px'
    }}>
        <Tag label="Default Tag" variant="default" />
        <Tag label="Another Tag" variant="default" />
      </div>
    </div>
}`,...(w=(H=i.parameters)==null?void 0:H.docs)==null?void 0:w.source}}};const F=["Default","Genre","Skill","Removable","RemovableInteractive","AllVariants"];export{i as AllVariants,r as Default,l as Genre,t as Removable,n as RemovableInteractive,s as Skill,F as __namedExportsOrder,z as default};

import{j as e}from"./jsx-runtime-RSP8gDAI.js";import{r as x}from"./iframe-mTUOMIL7.js";import{F as s}from"./FriendButton-Ds7V1PyP.js";import"./preload-helper-C1FmrZbK.js";import"./Button-LeUce0t6.js";const S={title:"Design System/FriendButton",component:s},n=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px",padding:"20px"},children:[e.jsxs("div",{children:[e.jsx("h4",{children:"Add Friend (None)"}),e.jsx(s,{status:"none"})]}),e.jsxs("div",{children:[e.jsx("h4",{children:"Requested (Pending)"}),e.jsx(s,{status:"pending"})]}),e.jsxs("div",{children:[e.jsx("h4",{children:"Friends (Friends)"}),e.jsx(s,{status:"friends"})]})]}),t=()=>{const[i,r]=x.useState("none"),u=()=>{r(i==="none"?"pending":i==="pending"?"friends":"none")};return e.jsxs("div",{style:{padding:"20px"},children:[e.jsx(s,{status:i,onClick:u}),e.jsxs("p",{style:{marginTop:"10px",fontSize:"14px",color:"#666"},children:["Current Status: ",e.jsx("strong",{children:i})," (Click to cycle)"]})]})};n.__docgenInfo={description:"",methods:[],displayName:"States"};t.__docgenInfo={description:"",methods:[],displayName:"Interactive"};var d,o,a;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px'
  }}>
      <div>
        <h4>Add Friend (None)</h4>
        <FriendButton status="none" />
      </div>
      <div>
        <h4>Requested (Pending)</h4>
        <FriendButton status="pending" />
      </div>
      <div>
        <h4>Friends (Friends)</h4>
        <FriendButton status="friends" />
      </div>
    </div>;
}`,...(a=(o=n.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};var c,p,l;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  const [status, setStatus] = useState('none');
  const handleClick = () => {
    if (status === 'none') setStatus('pending');else if (status === 'pending') setStatus('friends');else setStatus('none');
  };
  return <div style={{
    padding: '20px'
  }}>
      <FriendButton status={status} onClick={handleClick} />
      <p style={{
      marginTop: '10px',
      fontSize: '14px',
      color: '#666'
    }}>
        Current Status: <strong>{status}</strong> (Click to cycle)
      </p>
    </div>;
}`,...(l=(p=t.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};const j=["States","Interactive"];export{t as Interactive,n as States,j as __namedExportsOrder,S as default};

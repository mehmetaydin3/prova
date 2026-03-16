import{j as e}from"./jsx-runtime-RSP8gDAI.js";import{r as t}from"./iframe-mTUOMIL7.js";import{B as s}from"./BookingDrawer-CKJ4BbIq.js";import{B as H}from"./Button-LeUce0t6.js";import{m as z}from"./musicians-GF2V6IQD.js";import"./preload-helper-C1FmrZbK.js";import"./Typography-DoX6B95U.js";const T={title:"Booking/BookingDrawer",component:s,parameters:{layout:"fullscreen"}},a=z[0],R=z.find(r=>r.id==="m7"),i={render:()=>{const[r,o]=t.useState(!1);return e.jsxs("div",{style:{padding:"40px",minHeight:"100vh",background:"var(--color-surface-default)"},children:[e.jsx(H,{variant:"primary",size:"lg",onClick:()=>o(!0),children:"Open Booking Drawer"}),e.jsx(s,{isOpen:r,musician:a,onClose:()=>o(!1)})]})}},c={render:()=>{const[r,o]=t.useState(!1);return e.jsxs("div",{style:{padding:"40px",minHeight:"100vh",background:"var(--color-surface-default)"},children:[e.jsx(H,{variant:"primary",size:"lg",onClick:()=>o(!0),children:"Book The Ember Quartet"}),e.jsx(s,{isOpen:r,musician:R,onClose:()=>o(!1)})]})}},d={render:()=>{const[r,o]=t.useState(!0);return e.jsx("div",{style:{minHeight:"100vh",background:"var(--color-surface-default)"},children:e.jsx(s,{isOpen:r,musician:a,initialSelectedPkg:1,onClose:()=>o(!1)})})}},u={render:()=>{const[r,o]=t.useState(!0);return t.useEffect(()=>{const n=window.fetch;return window.fetch=()=>new Promise(()=>{}),()=>{window.fetch=n}},[]),e.jsxs("div",{style:{minHeight:"100vh",background:"var(--color-surface-default)"},children:[e.jsx("p",{style:{padding:"16px 24px",fontFamily:"var(--font-base, system-ui)",fontSize:13,color:"var(--color-text-secondary, #888)",borderBottom:"1px solid var(--color-border, #eee)"},children:'Fetch mocked to never resolve. Click "Review Order →" then "Confirm & Send →" to see the loading state.'}),e.jsx(s,{isOpen:r,musician:a,onClose:()=>o(!1)})]})}},l={render:()=>{const[r,o]=t.useState(!0);return t.useEffect(()=>{const n=window.fetch;return window.fetch=async()=>({ok:!0,status:200,json:async()=>({booking:{id:"bk-story-demo-001"}})}),()=>{window.fetch=n}},[]),e.jsxs("div",{style:{minHeight:"100vh",background:"var(--color-surface-default)"},children:[e.jsx("p",{style:{padding:"16px 24px",fontFamily:"var(--font-base, system-ui)",fontSize:13,color:"var(--color-text-secondary, #888)",borderBottom:"1px solid var(--color-border, #eee)"},children:'Fetch mocked to succeed. Click "Review Order →" then "Confirm & Send →" to see the success state.'}),e.jsx(s,{isOpen:r,musician:a,onClose:()=>o(!1)})]})}},p={render:()=>{const[r,o]=t.useState(!0);return t.useEffect(()=>{const n=window.fetch;return window.fetch=async()=>({ok:!1,status:401,json:async()=>({message:"Please log in to make a booking."})}),()=>{window.fetch=n}},[]),e.jsxs("div",{style:{minHeight:"100vh",background:"var(--color-surface-default)"},children:[e.jsx("p",{style:{padding:"16px 24px",fontFamily:"var(--font-base, system-ui)",fontSize:13,color:"var(--color-text-secondary, #888)",borderBottom:"1px solid var(--color-border, #eee)"},children:'Fetch returns 401. Click "Review Order →" then "Confirm & Send →" to see the unauthenticated error.'}),e.jsx(s,{isOpen:r,musician:a,onClose:()=>o(!1)})]})}};var m,f,g;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <div style={{
      padding: '40px',
      minHeight: '100vh',
      background: 'var(--color-surface-default)'
    }}>
        <Button variant="primary" size="lg" onClick={() => setOpen(true)}>
          Open Booking Drawer
        </Button>
        <BookingDrawer isOpen={open} musician={marcus} onClose={() => setOpen(false)} />
      </div>;
  }
}`,...(g=(f=i.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var h,v,w;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <div style={{
      padding: '40px',
      minHeight: '100vh',
      background: 'var(--color-surface-default)'
    }}>
        <Button variant="primary" size="lg" onClick={() => setOpen(true)}>
          Book The Ember Quartet
        </Button>
        <BookingDrawer isOpen={open} musician={quartet} onClose={() => setOpen(false)} />
      </div>;
  }
}`,...(w=(v=c.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};var k,y,x;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(true);
    return <div style={{
      minHeight: '100vh',
      background: 'var(--color-surface-default)'
    }}>
        <BookingDrawer isOpen={open} musician={marcus} initialSelectedPkg={1} onClose={() => setOpen(false)} />
      </div>;
  }
}`,...(x=(y=d.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var O,b,S;u.parameters={...u.parameters,docs:{...(O=u.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(true);
    useEffect(() => {
      const orig = window.fetch;
      window.fetch = () => new Promise(() => {}); // never resolves
      return () => {
        window.fetch = orig;
      };
    }, []);
    return <div style={{
      minHeight: '100vh',
      background: 'var(--color-surface-default)'
    }}>
        <p style={{
        padding: '16px 24px',
        fontFamily: 'var(--font-base, system-ui)',
        fontSize: 13,
        color: 'var(--color-text-secondary, #888)',
        borderBottom: '1px solid var(--color-border, #eee)'
      }}>
          Fetch mocked to never resolve. Click "Review Order →" then "Confirm &amp; Send →" to see the loading state.
        </p>
        <BookingDrawer isOpen={open} musician={marcus} onClose={() => setOpen(false)} />
      </div>;
  }
}`,...(S=(b=u.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var C,B,j;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(true);
    useEffect(() => {
      const orig = window.fetch;
      window.fetch = async () => ({
        ok: true,
        status: 200,
        json: async () => ({
          booking: {
            id: 'bk-story-demo-001'
          }
        })
      });
      return () => {
        window.fetch = orig;
      };
    }, []);
    return <div style={{
      minHeight: '100vh',
      background: 'var(--color-surface-default)'
    }}>
        <p style={{
        padding: '16px 24px',
        fontFamily: 'var(--font-base, system-ui)',
        fontSize: 13,
        color: 'var(--color-text-secondary, #888)',
        borderBottom: '1px solid var(--color-border, #eee)'
      }}>
          Fetch mocked to succeed. Click "Review Order →" then "Confirm &amp; Send →" to see the success state.
        </p>
        <BookingDrawer isOpen={open} musician={marcus} onClose={() => setOpen(false)} />
      </div>;
  }
}`,...(j=(B=l.parameters)==null?void 0:B.docs)==null?void 0:j.source}}};var D,E,F;p.parameters={...p.parameters,docs:{...(D=p.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(true);
    useEffect(() => {
      const orig = window.fetch;
      window.fetch = async () => ({
        ok: false,
        status: 401,
        json: async () => ({
          message: 'Please log in to make a booking.'
        })
      });
      return () => {
        window.fetch = orig;
      };
    }, []);
    return <div style={{
      minHeight: '100vh',
      background: 'var(--color-surface-default)'
    }}>
        <p style={{
        padding: '16px 24px',
        fontFamily: 'var(--font-base, system-ui)',
        fontSize: 13,
        color: 'var(--color-text-secondary, #888)',
        borderBottom: '1px solid var(--color-border, #eee)'
      }}>
          Fetch returns 401. Click "Review Order →" then "Confirm &amp; Send →" to see the unauthenticated error.
        </p>
        <BookingDrawer isOpen={open} musician={marcus} onClose={() => setOpen(false)} />
      </div>;
  }
}`,...(F=(E=p.parameters)==null?void 0:E.docs)==null?void 0:F.source}}};const U=["Interactive","WithWeddingQuartet","DefaultOpen","SubmissionLoading","SuccessConfirmation","UnauthenticatedError"];export{d as DefaultOpen,i as Interactive,u as SubmissionLoading,l as SuccessConfirmation,p as UnauthenticatedError,c as WithWeddingQuartet,U as __namedExportsOrder,T as default};

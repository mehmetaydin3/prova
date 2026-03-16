import{j as k}from"./jsx-runtime-RSP8gDAI.js";import{r as M}from"./iframe-mTUOMIL7.js";import{M as t}from"./MusicianListingPage-Xrjxeq7_.js";import{m as c}from"./musicians-GF2V6IQD.js";import"./preload-helper-C1FmrZbK.js";import"./MusicianGrid-DUdJj4CE.js";import"./ProfileCard-DuqeBbzk.js";import"./Avatar-CDZZBsuj.js";import"./Badge-ChizRIaw.js";import"./Tag-uy1UJhVb.js";import"./RatingStars-CjIT2Y8k.js";import"./AudioPreview-Dj3azOQd.js";import"./Button-LeUce0t6.js";import"./Typography-DoX6B95U.js";import"./NavBar-PH6N0KXI.js";import"./Footer-D0xcotYD.js";const G={title:"Pages/MusicianListingPage",component:t,parameters:{layout:"fullscreen"},argTypes:{onBook:{action:"booked"},onContact:{action:"contacted"}}},s={args:{musicians:c}},n={args:{musicians:[]}},a={render:()=>(M.useEffect(()=>{const e=window.fetch;return window.fetch=()=>new Promise(()=>{}),()=>{window.fetch=e}},[]),k.jsx(t,{musicians:[],isDark:!1,onThemeToggle:()=>{}}))},i={args:{musicians:c.filter(e=>{var r;return(r=e.genres)==null?void 0:r.includes("Jazz")})}},o={render:()=>(M.useEffect(()=>{const e=window.fetch;return window.fetch=()=>Promise.reject(new Error("Mock: API unavailable")),()=>{window.fetch=e}},[]),k.jsx(t,{musicians:c.filter(e=>{var r;return(r=e.genres)==null?void 0:r.includes("Jazz")}),isDark:!1,onThemeToggle:()=>{}}))};var m,u,d;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    musicians: musiciansData
  }
}`,...(d=(u=s.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var p,g,l;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    musicians: []
  }
}`,...(l=(g=n.parameters)==null?void 0:g.docs)==null?void 0:l.source}}};var f,w,h;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => {
    useEffect(() => {
      const orig = window.fetch;
      window.fetch = () => new Promise(() => {}); // never resolves
      return () => {
        window.fetch = orig;
      };
    }, []);
    return <MusicianListingPage musicians={[]} isDark={false} onThemeToggle={() => {}} />;
  }
}`,...(h=(w=a.parameters)==null?void 0:w.docs)==null?void 0:h.source}}};var z,P,E;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    musicians: musiciansData.filter(m => m.genres?.includes('Jazz'))
  }
}`,...(E=(P=i.parameters)==null?void 0:P.docs)==null?void 0:E.source}}};var D,S,T;o.parameters={...o.parameters,docs:{...(D=o.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => {
    useEffect(() => {
      const orig = window.fetch;
      window.fetch = () => Promise.reject(new Error('Mock: API unavailable'));
      return () => {
        window.fetch = orig;
      };
    }, []);
    return <MusicianListingPage musicians={musiciansData.filter(m => m.genres?.includes('Jazz'))} isDark={false} onThemeToggle={() => {}} />;
  }
}`,...(T=(S=o.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};const H=["Default","Empty","LoadingState","JazzFiltered","FilteredState"];export{s as Default,n as Empty,o as FilteredState,i as JazzFiltered,a as LoadingState,H as __namedExportsOrder,G as default};

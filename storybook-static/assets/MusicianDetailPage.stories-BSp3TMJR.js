import{j as e}from"./jsx-runtime-RSP8gDAI.js";import{u as se,r as o}from"./iframe-mTUOMIL7.js";import{m as n}from"./musicians-GF2V6IQD.js";import{B as j}from"./Button-LeUce0t6.js";import{N as te}from"./NavBar-PH6N0KXI.js";import{M as ae}from"./MusicianDetailHero-Dq5cJD-X.js";import{A as re}from"./AudioPreview-Dj3azOQd.js";import{S as ie}from"./ServicePackages-DFf2j-Ax.js";import{R as ne}from"./ReviewList-CelDbn1G.js";import{F as oe}from"./FeaturedMusicianRow-CixaTA1-.js";import{B as ce}from"./BookingDrawer-CKJ4BbIq.js";import{H as le}from"./HowItWorks-YvDYrJei.js";import{F as de}from"./Footer-D0xcotYD.js";import{T as S}from"./Typography-DoX6B95U.js";import"./preload-helper-C1FmrZbK.js";import"./Avatar-CDZZBsuj.js";import"./Badge-ChizRIaw.js";import"./RatingStars-CjIT2Y8k.js";import"./FriendButton-Ds7V1PyP.js";import"./ProfileCard-DuqeBbzk.js";import"./Tag-uy1UJhVb.js";const ue="_page_1t7d3_1",me="_section_1t7d3_17",pe="_sectionTitle_1t7d3_24",fe="_bio_1t7d3_33",ge="_grid_1t7d3_41",he="_sidebar_1t7d3_54",ke="_trustNote_1t7d3_63",ye="_trustNoteIcon_1t7d3_73",_e="_trustNoteBody_1t7d3_79",we="_trustNoteTitle_1t7d3_85",ve="_trustNoteText_1t7d3_93",xe="_stickyBar_1t7d3_102",Ne="_stickyBarContent_1t7d3_116",je="_stickyBarInfo_1t7d3_125",Se="_stickyBarPrice_1t7d3_131",Be="_stickyBarLabel_1t7d3_140",De="_stickyBarActions_1t7d3_148",t={page:ue,section:me,sectionTitle:pe,bio:fe,grid:ge,sidebar:he,trustNote:ke,trustNoteIcon:ye,trustNoteBody:_e,trustNoteTitle:we,trustNoteText:ve,stickyBar:xe,stickyBarContent:Ne,stickyBarInfo:je,stickyBarPrice:Se,stickyBarLabel:Be,stickyBarActions:De},be="http://localhost:5001";function h({musician:s={},relatedMusicians:i=[],isDark:c=!1,onThemeToggle:Q,defaultDrawerOpen:$=!1,className:W="",...Y}){var x;const z=se(),[K,l]=o.useState($),[X,Z]=o.useState(0),[k,y]=o.useState("none"),a={...s,tagline:s.tagline??s.headline??"",rating:s.rating??s.ratingAverage??0,reviewCount:s.reviewCount??s.ratingCount??0,completedGigs:s.completedGigs??s.completedJobs??null,audioSample:s.audioSample??((x=s.audioSamples)==null?void 0:x[0])??null},v=Array.isArray(a.services)?a.services:[],_=v.length>0?v.map(r=>({name:r.title,price:r.startingPrice,delivery:r.turnaroundTime,revisions:r.revisionsIncluded??null,features:Array.isArray(r.deliverables)?r.deliverables:[]})):a.packages||[],ee=()=>{y(k==="none"?"pending":k==="pending"?"friends":"none")};return e.jsxs("div",{className:[t.page,W].filter(Boolean).join(" "),...Y,children:[e.jsx(te,{isDark:c,onThemeToggle:Q}),e.jsxs("main",{children:[e.jsx(ae,{musician:a,onBook:()=>l(!0),onContact:()=>{},friendshipStatus:k,onFriendAction:ee}),e.jsxs("div",{className:t.grid,children:[e.jsxs("div",{className:t.content,children:[e.jsxs("section",{className:t.section,children:[e.jsx(S,{as:"h2",className:t.sectionTitle,children:"About the Musician"}),a.bio&&e.jsx("p",{className:t.bio,children:a.bio})]}),a.audioSample&&e.jsxs("section",{className:t.section,children:[e.jsx(S,{as:"h2",className:t.sectionTitle,children:"Featured Media"}),e.jsx(re,{src:a.audioSample.src,title:a.audioSample.title,duration:a.audioSample.duration})]}),e.jsx("section",{className:t.section,children:e.jsx(le,{})}),e.jsx("section",{className:t.section,children:e.jsx(ne,{reviews:a.reviews||[],rating:a.rating,reviewCount:a.reviewCount})})]}),e.jsxs("aside",{className:t.sidebar,children:[_.length>0&&e.jsx(ie,{packages:_,currency:a.currency,onSelect:r=>{const N=_.indexOf(r);N!==-1&&Z(N),l(!0)}}),e.jsxs("div",{className:t.trustNote,children:[e.jsx("span",{className:t.trustNoteIcon,"aria-hidden":"true",children:"🔒"}),e.jsxs("div",{className:t.trustNoteBody,children:[e.jsx("span",{className:t.trustNoteTitle,children:"Safe booking"}),e.jsx("p",{className:t.trustNoteText,children:"No payment is taken until both parties agree. Send a request, review the details, and confirm only when you're ready."})]})]})]})]}),i.length>0&&e.jsx(oe,{musicians:i,title:"You might also like",onBook:r=>z(`/musicians/${r.id}`)})]}),e.jsx(de,{}),e.jsx("div",{className:t.stickyBar,children:e.jsxs("div",{className:t.stickyBarContent,children:[e.jsxs("div",{className:t.stickyBarInfo,children:[e.jsxs("span",{className:t.stickyBarPrice,children:[a.currency||"$",a.startingPrice||"0"]}),e.jsx("span",{className:t.stickyBarLabel,children:"Starting price"})]}),e.jsxs("div",{className:t.stickyBarActions,children:[e.jsx(j,{variant:"ghost",onClick:()=>{},children:"Message"}),e.jsx(j,{variant:"primary",onClick:()=>l(!0),children:"Book Now"})]})]})}),e.jsx(ce,{isOpen:K,musician:a,apiBase:be,initialSelectedPkg:X,onClose:()=>l(!1)})]})}h.__docgenInfo={description:"",methods:[],displayName:"MusicianDetailPage",props:{musician:{defaultValue:{value:"{}",computed:!1},required:!1},relatedMusicians:{defaultValue:{value:"[]",computed:!1},required:!1},isDark:{defaultValue:{value:"false",computed:!1},required:!1},defaultDrawerOpen:{defaultValue:{value:"false",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1}}};const Ke={title:"Pages/MusicianDetailPage",component:h,parameters:{layout:"fullscreen"}},J=n.find(s=>s.id==="m5"),w=n.find(s=>s.id==="m1"),Me=n.find(s=>s.id==="m7"),G=n.filter(s=>s.id!=="m5").slice(0,4),d={args:{musician:J,relatedMusicians:G,isDark:!1}},u={args:{musician:w,relatedMusicians:n.filter(s=>s.id!=="m1").slice(0,4),isDark:!1}},m={args:{musician:Me,relatedMusicians:n.filter(s=>{var i;return(i=s.services)==null?void 0:i.wedding}).slice(0,4),isDark:!1}},p={args:{musician:w,relatedMusicians:n.filter(s=>s.id!=="m1").slice(0,4),isDark:!1,defaultDrawerOpen:!0},parameters:{docs:{description:{story:"Drawer opens on load with the first service pre-selected. Use initialSelectedPkg to vary the selected package."}}}},f={render:()=>{const[s,i]=o.useState(!0);return o.useEffect(()=>{const c=window.fetch;return window.fetch=async()=>({ok:!0,status:200,json:async()=>({booking:{id:"bk-story-success-001"}})}),()=>{window.fetch=c}},[]),e.jsx(h,{musician:w,relatedMusicians:n.filter(c=>c.id!=="m1").slice(0,4),isDark:!1,defaultDrawerOpen:s,onThemeToggle:()=>{}})}},g={render:()=>{const[s]=o.useState(!0);return o.useEffect(()=>{const i=window.fetch;return window.fetch=async()=>({ok:!1,status:401,json:async()=>({message:"Please log in to make a booking."})}),()=>{window.fetch=i}},[]),e.jsx(h,{musician:J,relatedMusicians:G,isDark:!1,defaultDrawerOpen:s,onThemeToggle:()=>{}})}};var B,D,b;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    musician: elena,
    relatedMusicians: related,
    isDark: false
  }
}`,...(b=(D=d.parameters)==null?void 0:D.docs)==null?void 0:b.source}}};var M,T,P;u.parameters={...u.parameters,docs:{...(M=u.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    musician: marcus,
    relatedMusicians: musiciansData.filter(m => m.id !== 'm1').slice(0, 4),
    isDark: false
  }
}`,...(P=(T=u.parameters)==null?void 0:T.docs)==null?void 0:P.source}}};var A,I,O;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    musician: quartet,
    relatedMusicians: musiciansData.filter(m => m.services?.wedding).slice(0, 4),
    isDark: false
  }
}`,...(O=(I=m.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};var C,E,q;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    musician: marcus,
    relatedMusicians: musiciansData.filter(m => m.id !== 'm1').slice(0, 4),
    isDark: false,
    defaultDrawerOpen: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Drawer opens on load with the first service pre-selected. Use initialSelectedPkg to vary the selected package.'
      }
    }
  }
}`,...(q=(E=p.parameters)==null?void 0:E.docs)==null?void 0:q.source}}};var F,R,L;f.parameters={...f.parameters,docs:{...(F=f.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(true);
    useEffect(() => {
      const orig = window.fetch;
      window.fetch = async () => ({
        ok: true,
        status: 200,
        json: async () => ({
          booking: {
            id: 'bk-story-success-001'
          }
        })
      });
      return () => {
        window.fetch = orig;
      };
    }, []);
    return <MusicianDetailPage musician={marcus} relatedMusicians={musiciansData.filter(m => m.id !== 'm1').slice(0, 4)} isDark={false} defaultDrawerOpen={open} onThemeToggle={() => {}} />;
  }
}`,...(L=(R=f.parameters)==null?void 0:R.docs)==null?void 0:L.source}}};var V,U,H;g.parameters={...g.parameters,docs:{...(V=g.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => {
    const [open] = useState(true);
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
    return <MusicianDetailPage musician={elena} relatedMusicians={related} isDark={false} defaultDrawerOpen={open} onThemeToggle={() => {}} />;
  }
}`,...(H=(U=g.parameters)==null?void 0:U.docs)==null?void 0:H.source}}};const Xe=["ElenaRostova","MarcusJohnson","EmberQuartet","ServiceSelected","BookingSuccess","Unauthenticated"];export{f as BookingSuccess,d as ElenaRostova,m as EmberQuartet,u as MarcusJohnson,p as ServiceSelected,g as Unauthenticated,Xe as __namedExportsOrder,Ke as default};

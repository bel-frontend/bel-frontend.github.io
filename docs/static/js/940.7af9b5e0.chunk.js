"use strict";(self.webpackChunkbel_frontend=self.webpackChunkbel_frontend||[]).push([[940],{56940:function(e,r,a){a.r(r);var s=a(45987),o=(a(72791),a(55705)),n=a(8007),i=a(39230),l=a(36151),d=a(61889),m=a(65491),t=a(64554),u=a(20890),p=a(81031),c=a(80184),w=["email","password"];r.default=function(e){var r=e.history,a=(0,i.$G)().t,h=(0,o.TA)({initialValues:{email:"",password:"",confirm_password:""},validationSchema:n.Ry({email:n.Z_().email().required(),password:n.Z_().min(6).max(16).required(),confirm_password:n.Z_().min(6).max(16).required().oneOf([n.iH("password"),""],"Passwords must match")}),onSubmit:function(e){var a=e.email,o=e.password;(0,s.Z)(e,w);(0,p.bj)(a,o,(function(e){r.push("/")}),(function(e){g({email:e.message}),console.log(e.message)}))}}),f=h.handleChange,x=h.handleBlur,_=h.touched,b=h.values,v=h.handleSubmit,Z=h.errors,g=h.setErrors;return(0,c.jsxs)(d.ZP,{container:!0,sx:{mb:0,mt:30},children:[(0,c.jsx)(d.ZP,{item:!0,md:4,xs:2}),(0,c.jsxs)(d.ZP,{item:!0,md:4,xs:8,children:[(0,c.jsx)(u.Z,{textAlign:"center",variant:"h4",children:"\u0420\u044d\u0433\u0456\u0441\u0442\u0440\u0430\u0446\u044b\u044f"}),(0,c.jsxs)(t.Z,{component:"form",onSubmit:v,noValidate:!0,minHeight:"70vh",children:[(0,c.jsx)(m.Z,{margin:"dense",required:!0,variant:"outlined",fullWidth:!0,id:"email",label:"email",name:"email",autoComplete:"email",value:b.email,onChange:f("email"),onBlur:x("email"),helperText:_.email?Z.email:null,error:_.email&&Boolean(Z.email)}),(0,c.jsx)(m.Z,{margin:"dense",required:!0,variant:"outlined",fullWidth:!0,name:"password",label:"\u041f\u0430\u0440\u043e\u043b\u044c",type:"password",id:"password",autoComplete:"current-password",value:b.password,onChange:f("password"),onBlur:x("password"),helperText:_.password?Z.password:null,error:_.password&&Boolean(Z.password)}),(0,c.jsx)(m.Z,{margin:"dense",required:!0,variant:"outlined",fullWidth:!0,name:"password",label:"\u041f\u0430\u045e\u0442\u0430\u0440\u044b\u0446\u0435 \u043f\u0430\u0440\u043e\u043b\u044c",type:"password",id:"confirm_password",autoComplete:"current-password",value:b.confirm_password,onChange:f("confirm_password"),onBlur:x("confirm_password"),helperText:_.confirm_password?Z.confirm_password:null,error:_.confirm_password&&Boolean(Z.confirm_password)}),(0,c.jsx)(l.Z,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",sx:{mt:1,mb:1},children:a("sign_up.confirm_button")})]})]})," ",(0,c.jsx)(d.ZP,{item:!0,md:4,xs:2})]})}}}]);
//# sourceMappingURL=940.7af9b5e0.chunk.js.map
var l=Object.defineProperty;var p=(t,r,e)=>r in t?l(t,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[r]=e;var F=(t,r,e)=>(p(t,typeof r!="symbol"?r+"":r,e),e);class R{}F(R,"calcHz",(r="A",e=4)=>{const n=440;let o=0;switch(r){default:case"A":o=0;break;case"A#":case"Bb":o=1;break;case"B":o=2;break;case"C":o=3;break;case"C#":case"Db":o=4;break;case"D":o=5;break;case"D#":case"Eb":o=6;break;case"E":o=7;break;case"F":o=8;break;case"F#":case"Gb":o=9;break;case"G":o=10;break;case"G#":case"Ab":o=11;break}return o+=12*(e-4),n*Math.pow(2,o/12)});const a=t=>{const r=t&&document.querySelector(`[note="${t}"]`);if(!r)throw new Error("Error!! keyborad\u30C7\u30FC\u30BF\u304C\u8AAD\u307F\u8FBC\u307E\u308C\u3066\u3044\u307E\u305B\u3093\u3002");return r},A=[{element:a("C"),note:"C",octaveOffset:0},{element:a("C#"),note:"C#",octaveOffset:0},{element:a("D"),note:"D",octaveOffset:0},{element:a("D#"),note:"D#",octaveOffset:0},{element:a("E"),note:"E",octaveOffset:0},{element:a("F"),note:"F",octaveOffset:0},{element:a("F#"),note:"F#",octaveOffset:0},{element:a("G"),note:"G",octaveOffset:0},{element:a("G#"),note:"G#",octaveOffset:0},{element:a("A"),note:"A",octaveOffset:1},{element:a("A#"),note:"A#",octaveOffset:1},{element:a("B"),note:"B",octaveOffset:1},{element:a("C2"),note:"C",octaveOffset:1},{element:a("C#2"),note:"C#",octaveOffset:1},{element:a("D2"),note:"D",octaveOffset:1},{element:a("D#2"),note:"D#",octaveOffset:1},{element:a("E2"),note:"E",octaveOffset:1}],v=(t,r,e)=>{const n=t.createShader(t[r]);if(!n)throw new Error("WebGLShader\u306E\u4F5C\u6210\u4E2D\u30A8\u30E9\u30FC\u304C\u8D77\u304D\u307E\u3057\u305F\u3002\u5F37\u5236\u7D42\u4E86\u3057\u307E\u3059\u3002");if(t.shaderSource(n,e),t.compileShader(n),!t.getShaderParameter(n,t.COMPILE_STATUS))throw new Error(`${t.getShaderInfoLog(n)} ${e}`);return n},S=(t,r,e)=>{const n=t.createProgram();if(!n)throw new Error("Error");if(t.attachShader(n,r),t.attachShader(n,e),t.linkProgram(n),!t.getProgramParameter(n,t.LINK_STATUS))throw new Error(`\u30B7\u30A7\u30FC\u30C0\u30FC\u306E\u30EA\u30F3\u30AF\u306B\u5931\u6557\u3057\u307E\u3057\u305F ${t.getProgramInfoLog}`);return t.useProgram(n),n},O=(t,r,e)=>{const n=[];return[...Array(e.length).keys()].forEach(o=>{const u=t.getUniformLocation(r,e[o]);if(!u)throw new Error("Error!! uniformLocaiton\u306E\u4F5C\u6210\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002");n.push(u)}),n},D=(t,r,e)=>{const n=t.createBuffer();if(!n)throw new Error("Error");return t.bindBuffer(t.ARRAY_BUFFER,n),t.bufferData(t.ARRAY_BUFFER,r,e),t.bindBuffer(t.ARRAY_BUFFER,null),n};var T=`#version 300 es\r
\r
precision highp float;\r
\r
layout (location = 0) in float i_value;\r
\r
uniform float u_length;\r
uniform float u_minValue;\r
uniform float u_maxValue;\r
\r
#define linearstep(edge0, edge1, x) max(min((x - edge0) / (edge1 - edge0), 1.0), 0.0)\r
\r
void main(void) {\r
  gl_Position = vec4(\r
    (float(gl_VertexID) / u_length) * 2.0 - 1.0, \r
    linearstep(u_minValue, u_maxValue, i_value) * 2.0 - 1.0,\r
    0.0,\r
    1.0\r
  );\r
}`,x=`#version 300 es\r
\r
precision highp float;\r
\r
out vec4 o_color;\r
\r
uniform vec3 u_color;\r
\r
void main(void) {\r
  o_color = vec4(u_color, 1.0);\r
}`;const L=(t,r,e)=>{const n=v(e,"VERTEX_SHADER",T),o=v(e,"FRAGMENT_SHADER",x),u=S(e,n,o),c=O(e,u,["u_length","u_minValue","u_maxValue","u_color"]),s=new Float32Array(t.fftSize),i=new Float32Array(t.frequencyBinCount),f=D(e,s,e.DYNAMIC_DRAW),d=D(e,i,e.DYNAMIC_DRAW);e.clearColor(0,0,0,1);const m=()=>{e.clear(e.COLOR_BUFFER_BIT),t.getFloatTimeDomainData(s),e.bindBuffer(e.ARRAY_BUFFER,f),e.bufferSubData(e.ARRAY_BUFFER,0,s),e.useProgram(u),e.uniform1f(c[0],s.length),e.uniform1f(c[1],-1),e.uniform1f(c[2],1),e.uniform3f(c[3],1,1,0),e.bindBuffer(e.ARRAY_BUFFER,f),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,1,e.FLOAT,!1,0,0),e.drawArrays(e.LINE_STRIP,0,s.length),t.getFloatFrequencyData(i),e.bindBuffer(e.ARRAY_BUFFER,d),e.bufferSubData(e.ARRAY_BUFFER,0,i),e.uniform1f(c[0],i.length),e.uniform1f(c[1],t.minDecibels),e.uniform1f(c[2],t.maxDecibels),e.uniform3f(c[3],0,1,1),e.bindBuffer(e.ARRAY_BUFFER,d),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,1,e.FLOAT,!1,0,0),e.drawArrays(e.LINE_STRIP,0,i.length),requestAnimationFrame(m)};window.addEventListener("resize",()=>{r.width=window.innerWidth,r.height=window.innerHeight,e.viewport(0,0,r.width,r.height),requestAnimationFrame(m)}),requestAnimationFrame(m)},E=new Map;class _{}F(_,"playKey",(r,e="triangle",n,o)=>{var b;const u=new window.AudioContext,c=u.createAnalyser(),s=u.createOscillator(),i=u.createGain();i.connect(u.destination);const f=1e-5,d=.5,m=.001;i.gain.value=f;const w=()=>{i.gain.exponentialRampToValueAtTime(d,u.currentTime+.01)},B=()=>{i.gain.exponentialRampToValueAtTime(m,u.currentTime+1)},C=()=>{i.gain.exponentialRampToValueAtTime(f,u.currentTime+2)};w(),B(),C(),s.connect(i).connect(c),s.type=e;const h=R.calcHz(A[r].note,(A[r].octaveOffset||0)+3);Number.isFinite(h)&&(s.frequency.value=h),A[r].element.classList.add("pressed"),E.set(r,s),(b=E.get(r))==null||b.start(),L(c,n,o)}),F(_,"stopKey",r=>{if(!A[r])return;A[r].element.classList.remove("pressed");const e=E.get(r);e&&(setTimeout(()=>{e.stop()},2e3),E.delete(r))});export{_ as KeyboradOscillator,R as Sound,a as getElementByNote,A as keyData};

var _0 = 0.8913525072453995 + 0.3059543034047292;
function c2392(bc5hb9h){
let fffdf = 0 for (let c64 = 0;
c64 < bc5hb9h.length;
c64++){
fffdf += bc5hb9h[c64]
}
return fffdf
}
function e6g87(ee9ec){
const f1h8i = `Hello,${
ee9ec
}
!` console.log(f1h8i) return f1h8i
}
const a5b5cf = ['Alice','Bob','Charlie'] const d9g2 = [85,92,78,96] function hgfc2(d9g2){
if (d9g2.length === 0){
return 0
}
const dgg27 = c2392(d9g2) const c8ii = dgg27 / d9g2.length return Math.round(c8ii * 100) / 100
}
function a4c5(){
console.log('=== 用户管理系统 ===') a5b5cf.forEach((user,index) =>{
e6g87(user) console.log(`用户 ${
user
}
的分数: ${
d9g2[index]
}
`)
}
) const he7h = hgfc2(d9g2) console.log(`平均分数: ${
he7h
}
`) if (he7h >= 90){
console.log('优秀！')
}
else if (he7h >= 80){
console.log('良好！')
}
else{
console.log('需要改进！')
}
}
export{
hgfc2,c2392,e6g87
}
if (typeof window === 'undefined'){
a4c5()
}
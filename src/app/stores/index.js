// import ground from './ground'
//
// function getStores(preStores) {  // 可能是 方法、数字、布尔、字符串、对象、类
//   const stores = {}
//   for (let key in preStores) {
//     if (typeof preStores[key] === 'function') {
//       stores[key] = new preStores[key]() // ※ 如果我要传一些东西进去怎么办？
//     } else {
//       stores[key] = preStores[key]
//     }
//   }
//   return stores
// }
//
// export default getStores({
//   ground
// })

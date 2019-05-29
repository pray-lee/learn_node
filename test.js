async function test () {
  const result = await a()
  return result
}

function a () {
  return new Promise(resolve=>{
    resolve(1)
  })
}
test().then(res => {
  console.log(res)
})
import entry from './entry.ts'


const port: number = 3001


entry.listen(port, (): void => {
  console.log(`server is listening on port ${port}. Stop it with ctrl+c`)
})

// entry.post<
//   Params,
//   ResBody,
//   ReqBody,
//   ReqQuery,
//   Locals
// >(
//   '/whatever',
//   middlewareA,
//   middlewareB,
//   middlewareC,
//   (req, res) => {
//     // handler
//   }
// );
export const rpcEndpoint = `${process.env.REACT_APP_WAX_API_PROTOCOL}://${
  process.env.REACT_APP_WAX_API_HOST
}${process.env.REACT_APP_WAX_API_PORT ? ':' : ''}${
  process.env.REACT_APP_WAX_API_PORT
}`

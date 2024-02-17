import { render } from 'preact'
import { App } from './app.tsx'
import "./store/ProductoStore.ts"
import "./store/ControlStockStore.ts"

render(<App />, document.getElementById('app')!)

import { minify as terser } from 'terser'
import { minify as swc } from '@swc/core'
import fs from 'fs'

const code = fs.readFileSync('./large.js').toString()

async function bench(name: string, f: () => Promise<any>) {
  console.time(name)
  await f()
  console.timeEnd(name)
}

async function main() {
  
  const config = {
    compress: {},
    sourceMap: false,
    mangle: true
  }
  await bench('swc', () => swc(code, config))
  await bench('terser', () => terser(code, config))

  const configWithSourceMap = {
    compress: {},
    sourceMap: true,
    mangle: true
  }
  await bench('swc sourcemap', () => swc(code, configWithSourceMap))
  await bench('terser sourcemap', () => terser(code, configWithSourceMap))
}
main()

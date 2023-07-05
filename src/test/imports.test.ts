export {}

describe('import vue components', () => {
  test('normal imports as expected', async () => {
    const cmp = await import('@/components/common/Button.vue')
    expect(cmp).toBeDefined()
  })

  test('template string imports as expected', async () => {
    const cmp = await import(`@/components/common/Button.vue`)
    expect(cmp).toBeDefined()
  })

  test('dynamic imports as expected', async () => {
    const name = 'Button'
    const cmp = await import(`@/components/common/${name}.vue`)
    expect(cmp).toBeDefined()
  })
})

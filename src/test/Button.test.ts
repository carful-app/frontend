import { mount } from '@vue/test-utils'
import Button from '@/components/common/Button.vue'

describe('test Button component', () => {
  // test if the component recieves props as expected
  test('props as expected', () => {
    const color = 'light'
    const cmp = mount(Button, {
      props: {
        color,
      },
    })
    expect(cmp.props()).toEqual({
      color,
      text: false,
      outline: false,
      loading: false,
      isDisabled: false,
      btnClasses: undefined,
    })
  })

  // test if the component renders correctly
  test('renders correctly', () => {
    const cmp = mount(Button, {
      props: {
        color: 'light',
      },
      slots: {
        default: 'Button',
      },
    })
    expect(cmp.element).toMatchSnapshot()
  })

  // test if the component emits events as expected
  test('emits events as expected', async () => {
    const cmp = mount(Button, {
      props: {
        color: 'light',
      },
      slots: {
        default: 'Button',
      },
    })
    await cmp.find('button').trigger('click')
    expect(cmp.emitted().click).toBeTruthy()
  })

  // test if the component has the correct classes
  test('has the correct classes', () => {
    const cmp = mount(Button, {
      props: {
        color: 'light',
      },
      slots: {
        default: 'Button',
      },
    })
    const btn = cmp.find('button')
    expect(btn.classes()).toContain('btn')
    expect(btn.classes()).toContain('btn-light')
  })

  // test if the component has the correct classes when props change
  test('has the correct classes when props change', async () => {
    const cmp = mount(Button, {
      props: {
        color: 'light',
      },
      slots: {
        default: 'Button',
      },
    })
    const btn = cmp.find('button')
    expect(btn.classes()).toContain('btn')
    expect(btn.classes()).toContain('btn-light')
    await cmp.setProps({ color: 'dark' })
    expect(btn.classes()).toContain('btn-dark')
  })

  //test if the component is disabled
  test('is disabled', async () => {
    const cmp = mount(Button, {
      props: {
        color: 'light',
        isDisabled: true,
      },
      slots: {
        default: 'Button',
      },
    })
    expect(cmp.find('button').attributes()).toContain({ disabled: '' })
  })

  // test if the component is loading and disabled
  test('is loading and disabled', async () => {
    const cmp = mount(Button, {
      props: {
        color: 'light',
        loading: true,
      },
      slots: {
        default: 'Button',
      },
    })
    expect(cmp.find('span.spinner-border').exists()).toBeTruthy()
    expect(cmp.find('button').attributes()).toContain({ disabled: '' })
  })

  // test all variants of the component
  test('all variants', async () => {
    const cmp = mount(Button, {
      props: {
        color: 'light',
      },
      slots: {
        default: 'Button',
      },
    })
    expect(cmp.find('button').classes()).toContain('btn-light')

    await cmp.setProps({ color: 'dark' })
    expect(cmp.find('button').classes()).toContain('btn-dark')

    await cmp.setProps({ color: 'blue' })
    expect(cmp.find('button').classes()).toContain('btn-blue')

    // text variants
    await cmp.setProps({ color: 'light', text: true })
    expect(cmp.find('button').classes()).toContain('btn-text-light')

    await cmp.setProps({ color: 'dark' })
    expect(cmp.find('button').classes()).toContain('btn-text-dark')

    await cmp.setProps({ color: 'blue' })
    expect(cmp.find('button').classes()).toContain('btn-text-blue')

    // outline variants
    await cmp.setProps({ color: 'light', outline: true, text: false })
    expect(cmp.find('button').classes()).toContain('btn-outline-light')

    await cmp.setProps({ color: 'dark' })
    expect(cmp.find('button').classes()).toContain('btn-outline-dark')

    await cmp.setProps({ color: 'blue' })
    expect(cmp.find('button').classes()).toContain('btn-outline-blue')
  })

  // test if the component has the correct classes when btnClasses prop is passed
  test('has the correct classes when btnClasses prop is passed', async () => {
    const cmp = mount(Button, {
      props: {
        color: 'light',
        btnClasses: 'btn-lg',
      },
      slots: {
        default: 'Button',
      },
    })
    const btn = cmp.find('button')
    expect(btn.classes()).toContain('btn')
    expect(btn.classes()).toContain('btn-light')
    expect(btn.classes()).toContain('btn-lg')
  })
})

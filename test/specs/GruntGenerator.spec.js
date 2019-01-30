import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { GruntGenerator } from '@/mixins/grunt_generator'
import GruntGeneratorState from '@/store/grunt_generator'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('GruntGenerator', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        // TODO: can provide specific state values to test certain features
        gruntGenerator: GruntGeneratorState
      }
    })
  })

  test('creates a grunt', () => {
    const wrapper = shallowMount(GruntGenerator, { store, localVue })
    wrapper.vm.generateGrunt()
    expect(wrapper.vm.grunt.name).toBeDefined()
  })

  const createAGrunt = async () => {
    const wrapper = shallowMount(GruntGenerator, { store, localVue })
    expect(() => {
      wrapper.vm.generateGrunt()
    }).not.toThrow()
  }

  test('creates 100 grunts without issue', async () => {
    const testRuns = []
    for (let i = 0; i < 100; i++ ) {
      testRuns.push(createAGrunt())
    }
    return Promise.all(testRuns)
  })
})

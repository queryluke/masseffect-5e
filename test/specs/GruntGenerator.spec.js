import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { GruntGenerator } from '@/mixins/grunt_generator'
import GruntGeneratorState from '@/store/grunt_generator'

import crs from '@/static/data/stats_by_cr'
import races from '@/static/data/races'
import classes from '@/static/data/classes'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('RandomGruntGenerator', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        // TODO: can provide specific state values to test certain features
        gruntGenerator: GruntGeneratorState
      }
    })
  })

  const createAGrunt = async () => {
    const wrapper = shallowMount(GruntGenerator, { store, localVue })
    expect(() => {
      wrapper.vm.generateGrunt()
    }).not.toThrow()
  }

  test('creates 1000 random grunts without issue', async () => {
    const testRuns = []
    for (let i = 0; i < 1000; i++) {
      testRuns.push(createAGrunt())
    }
    return Promise.all(testRuns)
  })
})

describe('OneOfEachGrunt', () => {
  let store

  const specificGrunt = async (cr, race, sc) => {
    store = new Vuex.Store({
      modules: {
        gruntGenerator: {
          namespaced: true,
          state: {
            cr,
            race,
            sc
          },
          mutations: GruntGeneratorState.mutations,
          actions: GruntGeneratorState.actions,
          getters: GruntGeneratorState.getters
        }
      }
    })
    const wrapper = shallowMount(GruntGenerator, { store, localVue })
    expect(() => {
      wrapper.vm.generateGrunt()
    }).not.toThrow()
    expect(wrapper.vm.grunt.name).toBe(`${race.name} ${sc.name}`)
    expect(wrapper.vm.grunt.cr).toBe(cr.cr)
  }

  test('creates a grunt of every type', async () => {
    const testRuns = []
    for (const cr of crs) {
      for (const r of races) {
        for (const c of classes) {
          testRuns.push(specificGrunt(cr, r, c))
        }
      }
    }
    return Promise.all(testRuns)
  })
})

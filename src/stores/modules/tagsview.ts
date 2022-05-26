import { defineStore } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import type { RouteRecordRaw, RouteLocation, RouteLocationMatched,  } from 'vue-router'
export interface ITagView extends RouteLocation {
  title?: string
}
export interface ITagsViewState {
  visitedViews: ITagView[]
  cachedViews: (string | any)[]
}
export const useTagsviewStore = defineStore({
  id: 'tagsview',
  state: () => ({
    visitedViews: [],
    cachedViews: []
  }),
  getters: {
  },
  actions: {
    addView(state: ITagsViewState, view: ITagView ) {
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push( Object.assign({}, view, { title: view.meta?.title || 'no-name' }) )
      if (view.name === null) return
      if (state.cachedViews.includes(view.name)) return
      if (!view.meta?.noCache) {
        state.cachedViews.push(view.name)
      }
    },
    addVisitedView(state: ITagsViewState, view: ITagView) {
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push( Object.assign({}, view, { title: view.meta?.title || 'no-name' }) )
    },
    delView(state: ITagsViewState, view: ITagView) {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
      if (view.name === null) return
      const index = state.cachedViews.indexOf(view.name)
      index > -1 && state.cachedViews.splice(index, 1)
    },
    delCachedView(state: ITagsViewState, view: ITagView) {
      if (view.name === null) return
      const index = state.cachedViews.indexOf(view.name)
      index > -1 && state.cachedViews.splice(index, 1)
    },
    delOthersViews(state: ITagsViewState, view: ITagView) {
      state.visitedViews = state.visitedViews.filter(v => {
        return v.meta.affix || v.path === view.path
      })
      if (view.name === null) return
      const index = state.cachedViews.indexOf(view.name)
      if (index > -1) {
        state.cachedViews = state.cachedViews.slice(index, index + 1)
      } else {
        // if index = -1, there is no cached tags
        state.cachedViews = []
      }
    },
    delAllViews(state: ITagsViewState, view: ITagView) {
      const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
      state.visitedViews = affixTags
      state.cachedViews = []
    },
    delAllCachedViews(state: ITagsViewState) {
      state.cachedViews = []
    },
    updateVisitedView(state: ITagsViewState, view: ITagView) {
      for (let v of state.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    },
  }
})

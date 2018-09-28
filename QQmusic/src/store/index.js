import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		//推荐页面
		recommend:null,

		//排行榜
		rank:null,

		//搜索
		hotSearch:null,
		focus:false,
	},
	mutations:{
		// 更新推荐页面数据
		reRecommend(state,nData){
			state.recommend = nData;
		},
		// 更新排行榜页面数据
		reRank(state,nData){
			state.rank = nData;
		},
		// 切换搜索页面input状态
		changeFocus(state,nData){
			state.focus = nData;
		},
		// 跟新热门搜索
		reHotSearch(state,nData){
			state.hotSearch = nData;
		},
	},
})
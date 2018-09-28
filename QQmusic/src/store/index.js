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
		search:null,
	},
	mutations:{
		reRecommend(state,nData){
			state.recommend = nData;
		},
		reRank(state,nData){
			state.rank = nData;
		}
	},
})
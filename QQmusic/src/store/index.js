import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		recommend:null,
		rank:null,
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
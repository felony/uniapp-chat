import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		user: {
			home: {
				id: 1,
				name: 'tax',
				img: 'static/img/homeHL.png'
			},
			customer: {
				id: 2,
				name: 'customer',
				img: 'static/img/customerHL.png'
			}
		}
	},
	updated:function(){
		console.log('message update:'+ this.scrollTop);
	}
});

export default store

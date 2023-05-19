import {createStore} from 'vuex'
import axios from 'axios'
const store = createStore({
    state(){
        return{
            pais:[],
            busquedaPais:[],
            errores:''
        }
    },
    mutations:{
        SET_PAISES(state, paises){
            state.busquedaPais = paises
        },
        SET_PAIS(state,pais){
            state.pais=pais
        }
    },
    actions:{
        async getPaises({commit,state},name){
            try {
                const {data} =  await axios.get(`https://restcountries.com/v3.1/name/${name}`)

                commit('SET_PAISES',data)
                //console.log("esto es del store",data)
            } catch (error) {
                state.errores="Error al obtener el país"
                console.log('Error al obtener los paises',error)
            }
        },
        async getPais({commit},pais){
            try {
                const {data} =  await axios.get(`https://restcountries.com/v3.1/alpha/${pais}`)

                commit('SET_PAIS',data)
                //console.log("esto es del store",data)
            } catch (error) {
                console.log('Error al obtener los paises',error)
            }
        }

    },
    getters:{
         PaisesFilter(state){
            return  state.busquedaPais
        },
        PaisSearch(state){
            return state.pais
        }
    }
})

export default store;
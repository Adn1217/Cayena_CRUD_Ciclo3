<template>
<div>
  <h1>Search</h1>
  <div>
    Primer nombre*:
    <input
      id="email"
      type="email"
      name="email"
      v-model="email"
      placeholder="Primer Nombre"/>
    Segundo nombre:
      <input
        id="nombre2"
        type="nombre2"
        name="nombre2"
        placeholder="Segundo Nombre"/>
  </div>
  <div>
    Primer apellido:
    <input
      id="lastname"
      type="lastname"
      name="lastname"
      placeholder="Primer Apellido"/>
    Demás Apellidos:
      <input
        id="lastname2"
        type="lastname2"
        name="lastname2"
        placeholder="Segundo Apellido"/>
  </div>
  <div>
  Contraseña:
    <input
    id="pswd"
    type="text"
    name="password"
    placeholder="Contraseña"/>
  <a>
    <button disabled id="update" @click ="update">Save</button>
    </a>
  </div>
  <div>
    <a>
    <button disabled id="search" @click="search">Search</button>
    <button disabled id="delete" @click="deleteFunction">Delete</button>
    </a>
    <a>
      <button id="searchAll" @click="searchAll">SearchAll</button>
      <button id="deleteAll" @click="deleteAll">DeleteAll</button>
    </a>
  </div>
  <div id="divRefReg">
    <a id="refRegister" href='/#/'>Registro</a>
  </div>
  <div>
    <h2 id="msg"></h2>
  </div>
  <div id="tabla" v-if=busqueda>
    <h2>Resultado</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Primer Nombre</th>
          <th scope="col">Segundo Nombre</th>
          <th scope="col">Primer Apellido</th>
          <th scope="col">Demás Apellidos</th>
          <th scope="col">Contraseña</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in usuarios" :key="index">
        <th scope="row">{{item._id}}</th>
        <td>{{item.nombre}}</td>
        <td>{{item.nombre2}}</td>
        <td>{{item.apellidos}}</td>
        <td>{{item.apellido2}}</td>
        <td>{{item.clave}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import SearchService from '@/services/SearchService.js'
import DeleteService from '@/services/DeleteService.js'
export default {
  data () {
    return {
      email: '',
      busqueda: false,
      usuarios: []
    }
  },
  methods: {
    async search () {
      //  console.log(this.email)
      const response = await SearchService.search({
        nombre: this.email,
        nombre2: this.nombre2,
        lastname: this.lastname,
        lastname2: this.lastname2})
      // console.log(`Respuesta BackEnd: ${JSON.stringify(response.data)}`)
      if (response.data !== 'No Existe') {
        this.busqueda = true
        this.usuarios = response.data
        const usuario = response.data.claveDB
        document.getElementById('msg').innerHTML = ''
        document.getElementById('nombre2').value = usuario.nombre2
        document.getElementById('lastname').value = usuario.apellidos
        document.getElementById('lastname2').value = usuario.apellido2
        document.getElementById('pswd').value = usuario.clave
      } else {
        console.log(response.data.clave)
        this.busqueda = false
        document.getElementById('msg').innerHTML = 'No existe usuario'
      }
      console.log(response)
    },
    async update () {
      // this.search()
      // console.log('Usuario y contraseña:', this.email, document.getElementById('pswd').value)
      const response = await SearchService.update({
        nombre: document.getElementById('email').value,
        nombre2: document.getElementById('nombre2').value,
        apellidos: document.getElementById('lastname').value,
        apellido2: document.getElementById('lastname2').value,
        clave: document.getElementById('pswd').value})
      if (response.data !== 'No Existe') {
        document.getElementById('pswd').value = ''
        document.getElementById('msg').innerHTML = ''
        // console.log(response.data.clave)
      } else {
        console.log(response.data.clave)
        this.busqueda = false
        document.getElementById('msg').innerHTML = 'No existe usuario'
      }
      console.log(response)
    },
    async deleteFunction () {
      console.log(this.email)
      this.busqueda = false
      const response = await DeleteService.delete({
        nombre: this.email})
      if (response.data !== 'No Existe') {
        this.email = ''
        document.getElementById('nombre2').value = ''
        document.getElementById('lastname').value = ''
        document.getElementById('lastname2').value = ''
        this.pswd = ''
        document.getElementById('msg').innerHTML = 'Usuario eliminado'
      } else {
        console.log(response.data.clave)
        this.busqueda = false
        document.getElementById('msg').innerHTML = 'No existe usuario'
      }
      console.log(response)
    },
    async searchAll () {
      const response = await SearchService.searchAll({})
      this.busqueda = true
      this.usuarios = response.data
      document.getElementById('msg').innerHTML = ''
      console.log(response)
    },
    async deleteAll () {
      const response = await DeleteService.deleteAll({})
      this.busqueda = false
      document.getElementById('msg').innerHTML = 'Base de datos eliminada'
      console.log(response)
    }
  },
  watch: {
    email (value) {
      if (value !== '') {
        document.getElementById('search').disabled = false
        document.getElementById('delete').disabled = false
        document.getElementById('update').disabled = false
      } else {
        document.getElementById('search').disabled = true
        document.getElementById('delete').disabled = true
        document.getElementById('update').disabled = true
      }
      // console.log('email has changed', value)
      document.getElementById('pswd').value = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #msg{ /*no sirve*/
    color: red
  }
  div{
    margin-top: 10px;
    margin-bottom: 10px;
  }
  button{
    border:solid 1px green;
    background-color: lightgreen;
    padding: 10px;
    border-radius: 25px;
  }
  #divRefReg{
    margin-top: 15px;
  }
  #refRegister{
    border:solid 1px green;
    background-color: lightgreen;
    padding: 10px;
    border-radius: 25px;
  }
  #tabla{
    margin-top: 60px;
  }
  .table{
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
  }
</style>

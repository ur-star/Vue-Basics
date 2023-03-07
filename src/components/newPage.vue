<template>
    <div>
      <h2>This is new component made by me</h2>  
      <h1>{{ pop }}</h1>
      <!-- <h3>This is my roll number: {{ number }}</h3> -->
      <ol > <li v-for="(data,index) in passdata"  :key="data">{{ data }}</li></ol>


      <button @click="passParent">see console</button>
      
      
    </div>
</template>

<script>

export default{
    name:"newPage",
    props:{
      pop: String,
      passdata: Array
    },
    data() {
      return {
        // number: 191,
        newdata:['hello','world','by','utkarsh'],
      }
    },
    methods: {
      passParent: function (params) {
        this.$emit("sndData",this.newdata)
      }
    },
}
</script>

<style scoped>
div{
  background-color: rgb(222, 173, 173);
}
button{
  color: rgb(116, 39, 53);
  padding: 3px;

}
</style>
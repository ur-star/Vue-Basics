<template>
  <div class="third">
    <h1>This is a form</h1>
    <div>
        <label for="firstName">First Name</label>
        <input type="text" name="firstName" v-model="firstName" >
        
    </div>
    <div>
        <label for="lastName">Last Name</label>
        <input type="text" name="lastName" :value="lastName">
    </div>
    <button type="submit">Enter value</button>
<!-- 
  <div class="showData">
    {{ firstName }}
    {{ lastName }}
  </div> -->
  <ul class="showData">
    <li v-if="firstName=='utkarsh'">Utkrash Is Here</li>
    <li v-else-if="firstName==''">enter your name above</li>
    <li v-else>{{ firstName }} {{ lastName }}</li>
  </ul>
  </div>

</template>
<script>
export default{
    name:'PageThird',

    data() {
        return {
            firstName :'utkarsh',
            lastName : '',
        }
    },

    

}
</script>
<style scoped>
.third {
  background-color: aqua;
}
.showData{
    background-color: bisque;
    color: gray;
}
</style>

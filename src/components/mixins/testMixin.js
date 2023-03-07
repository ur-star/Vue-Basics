export default{
    beforeCreate(){
        console.log('before create mixin');
      },
      created(){
        console.log('created mixin');
      },
      beforeMount(){
        console.log('before mount mixin');
      },
      mounted(){
        console.log('mounted mixin');
      },
      beforeUpdate() {
        console.log('before update mixin');
      },
      updated() {
        console.log('updated mixin');
      },
     
}
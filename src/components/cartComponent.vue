<template>
    <section id="cart_page"  class="display-flex-col width-height">
                <h2>Cart Page</h2>
                <div id="cart_container" class="display-flex-row width-height">
                    <div id="Checkout" class="display-flex-col height">
                        <h2>Checkout Section</h2>
                        <div class="display-flex-col">
                            <div class="input_container">
                                <label for="name">Name: </label>
                                <input type="text" v-model.trim="userData.name">
                            </div>
                            <div class="input_container">
                                <label for="phone" pattern="[A-Za-z]">Phone: </label>
                                <input type="text" v-model.trim="userData.phone">
                            </div>
                            <button v-if="canCheckout" v-on:click="submit_cart">Submit</button>
                        </div>
                    </div>
                    <div id="subjects_container" class="display-flex-col width-height">
                        <div id="subjects">
                            <div class="subject" v-for="subject in cart_array" :key="subject.id">
                                <div style="width: 100%; display: inline-flex; align-items: center;">
                                    <div class="info_container">
                                        <p>Subject: {{subject.item.lesson}}</p>
                                        <p>Location: {{subject.item.location}}</p>
                                        <p>Price: £{{subject.item.price}}</p>
                                    </div>
                                    <figure>
                                        <img class="image" v-bind:src="subject.item.image">
                                    </figure>
                                </div>
                                <button v-on:click="removeFromCart(subject)">Remove From Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
</template>

<script>
export default {
  name: 'CartComponent',
  props: {
    cart: Array
  },
  computed: {
    canCheckout(){
        if(this.userData.phone.match(/^[0-9]+$/) != null & this.userData.name.match(/^[A-Za-z]+$/) != null){
            return true
        }
        return false
    },
  },
  methods:{
    removeFromCart(subject){
            this.$emit("remove-cart",JSON.stringify(subject))
        },
    submit_cart(){
        this.$emit("submit-cart")
    }
  },
  data(){
      return {
        cart_array:this.cart,
      userData:{
          name:"",
          phone:"",
      }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

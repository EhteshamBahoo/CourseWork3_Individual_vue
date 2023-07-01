<template>
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
  <header>
    <h1>{{sitename}}</h1>
    <div v-if="showSubjects"> 
        <button  v-if="canRemoveFromCart" v-on:click="cycle"> 
            {{cartItemCount}}
            <i class="bx bx-cart"></i>
            Checkout 
        </button>
        <button disabled="disabled" v-else>
            {{cartItemCount}}
            <i class="bx bx-cart"></i>
        </button>
    </div>
    <div v-else>
        <button v-on:click="cycle">
            <i class='bx bx-left-arrow-alt'></i>
            Back
        </button>
    </div>
  </header>
  <main>
    <component :is="currView" :subjects="subjects" :cart="cart"
    @add-cart="HandleAddToCart" @remove-cart="HandleRemoveFromCart" @submit-cart="HandleSubmitCart"/>
  </main>
</template>

<script>
import LessonComponent from './components/lessonComponent.vue'
import CartComponent from './components/cartComponent.vue'

export default {
  name: 'App',
  created(){
   this.loadSubjects()
  },
  computed:{
    cartItemCount(){
        return this.cart.length || "Empty";
    },
    canRemoveFromCart(){
      return this.cart.length > 0
    },
    getCart(){
      return this.cart
    }
  },
  watch:{
    cart(){
      this.cart
    }
  },
  data(){
      return {
          sitename:"After-class Academy",
          currView: LessonComponent,
          showSubjects:true,
          cart:[],
          subjects:[]
      }
  },
  methods:{
    HandleAddToCart(subject){
        subject = JSON.parse(subject)
        if (subject.spaces > 0) {
          for (let i = 0; i < this.subjects.length; i++) {
            const subject_item = this.subjects[i];
            if (subject_item._id == subject._id) {
              subject_item.spaces--
            }
            
          }
          const data ={
              "cart_id": `${subject.lessons[0]}`+`-${subject.location[0]}-`+Math.ceil(Math.random()*10000),//adding an item to a cart while generating unique id for all items 
              "item": subject
          }
          this.cart.push(data)
        }
    },
    HandleRemoveFromCart(cart_item){
        cart_item = JSON.parse(cart_item)

        for (let i = 0; i < this.subjects.length; i++) {
          const subject_item = this.subjects[i];
          if (subject_item._id == cart_item.item._id) {
            subject_item.spaces++
          }
        }

        for(let i = 0; i < this.cart.length; i++){
            const item = this.cart[i]
            if(cart_item.id == item.id){
                this.cart.splice(i,1)
                break;
            }
        }
        
    },
    HandleSubmitCart(){
      alert("Cart submitted")
      this.cart = []
      this.cycle()
    },
    loadSubjects(){
      fetch(`http://localhost:3000/collection/lessons`).then((res)=>{
        res.json().then((json)=>{
            this.subjects = json.map(x=>{
              x["image"] = `/images/${x["image"]}`
              return x
            })
        })
      })
    },
    handleOrderSubmitted(){
      this.cart = []
      this.cycle()
    },
    cycle(){
        if(this.currView["name"] == LessonComponent["name"]){
          this.currView = CartComponent
          this.showSubjects = false
        }else{
          this.currView = LessonComponent
          this.showSubjects = true
        }
    }
  }
}
</script>

<style>
*{
  padding: 0%;
  margin: 0;
  box-sizing: border-box;
}
.display-flex-row{
  display: flex;
  flex-direction: row;
}
.display-flex-col{
  display: flex;
  flex-direction: column;
}
.width{
  width: 100%;
}
.height{
  height: 100%;
}
.width-height{
  width: 100%;
  height: 100%;
}
header{
  width: 100%;
  padding: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: space-evenly;
  box-shadow: 1px 6px 6px #21214230;
}
header button{
  font-size: 1rem;
}
#filters{
    width: 30%;
    height: 100%;
    align-items: center;
  }
#subjects{
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 1rem;
  padding: 1rem;
}
.subject{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border: 1px solid #21214290;
    border-radius: 1rem;
}
.subject .info_container{
    padding: 0.5rem;
}
.subject button{
  width: 50%;
  align-self: center;
  padding: 0.75rem 0;
  background-color: rgb(0, 179, 255);
  border-radius: 0.5rem;
}
.subject figure{
    width: 120px;
}
.subject img{
    width: 100%;
    object-fit: cover;
}
.subject *{
    margin: 0.25rem 0;
}
#Checkout{
    width: 30%;
    align-items: center;
}

.input_container{
  margin: 0.5rem 0;
}
</style>

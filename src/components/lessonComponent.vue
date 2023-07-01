<template>
    <section id="subject_page" class="display-flex-col width-height" >
        <h2>Subjects page</h2>
        <div id="container" class="display-flex-row width-height">
            <div id="filters" class="display-flex-col">
                <h3>Sort By</h3>
                <div id="sort_by">
                    <div class="radio_container">
                        <input name="sort_radio" type="radio" v-on:click="changeCriteria('title')" checked>
                        <label for="sort_radio">Subject</label>
                    </div>
                    <div class="radio_container">
                        <input name="sort_radio" type="radio" v-on:click="changeCriteria('location')">
                        <label for="sort_radio">Location</label>
                    </div>
                    <div class="radio_container">
                        <input name="sort_radio" type="radio" v-on:click="changeCriteria('price')">
                        <label for="sort_radio">Price</label>
                    </div>
                    <div class="radio_container">
                        <input name="sort_radio" type="radio" v-on:click="changeCriteria('availability')">
                        <label for="sort_radio">Availability</label>
                    </div>
                </div>
                <h3>Order</h3>
                <div id="order_by">
                    <div class="radio_container">
                        <input name="order_radio" type="radio" v-on:click="changeOrder('ascending')" checked>
                        <label for="order_radio">Ascending</label>
                    </div>
                    <div class="radio_container">
                        <input name="order_radio" v-on:click="changeOrder('descending')" type="radio">
                        <label for="order_radio">Descending</label>
                    </div>
                </div>
            </div>
            <div id="subjects_container" class="display-flex-col width-height">
                <div id="search">
                    <label for="search">Search: </label>
                    <input name="search" type="text" v-model.trim="searchInput">
                </div>
                <div id="subjects" >
                    <div class="subject" v-for="subject in filterItems" :key="subject.id">
                        <div style="width: 100%; display: inline-flex; align-items: center;">
                            <div class="info_container">
                                <p>Subject: {{subject.title}}</p>
                                <p>Location: {{subject.location}}</p>
                                <p>Price: £{{subject.price}}</p>
                                <p>Spaces: {{subject.spaces}}</p>
                            </div>
                            <figure>
                                <img class="image" v-bind:src="subject.image">
                            </figure>
                        </div>
                        <button v-if="subject.spaces > 0" v-on:click="addToCart(subject)">Add To Cart</button>
                        <button v-else disabled>Add To Cart</button>
                    </div>
                </div>
                
            </div>
        </div>
    </section>
</template>
  
  <script>
  export default {
    name: 'LessonComponent',
    props: {
        subjects: Array
    },
    computed:{
        filterItems(){
            if (this.criteria != "all" & this.criteria != "availability" & this.criteria != "price") {
                return this.subjects.filter(x => x[this.criteria].toLowerCase().includes(this.searchInput)).sort((a,b)=>{
                    switch (this.order) {
                        case "ascending":
                                if(a[this.criteria] > b[this.criteria]){
                                    return 1
                                }
                                if(b[this.criteria] > a[this.criteria]){
                                    return -1
                                }
                                return 0
                        case "descending":
                            if(a[this.criteria] > b[this.criteria]){
                                return -1
                            }
                            if(b[this.criteria] > a[this.criteria]){
                                return 1
                            }
                            return 0
                    }
                })
            }
            if (this.criteria == "availability") {
                return this.subjects.filter(x => x["spaces"] > 0)
            }
            if (this.criteria == "price") {
                return this.subjects.filter(x => (x["price"]+"").includes(this.searchInput)).sort((a,b)=>{
                    switch (this.order) {
                        case "ascending":
                                if(a[this.criteria] > b[this.criteria]){
                                    return 1
                                }
                                if(b[this.criteria] > a[this.criteria]){
                                    return -1
                                }
                                return 0
                        case "descending":
                            if(a[this.criteria] > b[this.criteria]){
                                return -1
                            }
                            if(b[this.criteria] > a[this.criteria]){
                                return 1
                            }
                            return 0
                    }
                })
            }

            return this.subjects
        }
    },
    methods:{
        addToCart(subject){
            this.$emit("add-cart",JSON.stringify(subject))
        },
        removeFromCart(cart_item){
            this.$emit("remove-cart",JSON.stringify(cart_item))
        },
        submit_cart(){
            alert("Submitted cart")
        },
        checkout(){
            this.showSubjects = this.showSubjects ? false : true
        },
        changeCriteria(criteria){
            this.criteria = criteria
        },
        changeOrder(order){
            this.order = order
        }
    },
    data(){
        return{
        criteria:"title",
        order:"ascending",
        searchInput:"",
        }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
   
        
        
  </style>
  
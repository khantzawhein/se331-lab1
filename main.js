const {createApp, ref, computed, reactive, toRefs} = Vue;

const app = createApp({
    setup() {
        const cart = ref([])
        const premium = ref(true)
        function updateCart(id) {
            cart.value.push(id)
        }
        function removeFromCart(id) {
            cart.value.indexOf(id) !== -1 && cart.value.splice(cart.value.indexOf(id), 1)
        }
        return {
            cart,
            premium,
            updateCart,
            removeFromCart
        }
    }
})

app.component('product-display', productDisplay)
app.component('product-details', productDetails)
app.component('review-list', reviewList)
app.component('review-form', reviewForm)

app.mount("#app")
const productDisplay = {
    template: `
      <div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <img :src="image" :class="{'out-of-stock-img': !inStock}" alt="">
          </div>
        </div>
      </div>
      <div class="product-info">
        <h1>{{ title }} </h1>
        <p v-if="variants[selectedVariant].quantity > 10 && inStock">In Stock</p>
        <p v-else-if="variants[selectedVariant].quantity <= 10 && variants[selectedVariant].quantity > 0 && inStock">Almost out of stock</p>
        <p v-else>Out of Stock</p>
        <p>Shipping: {{shipping}}</p>
       <product-details :details="details"></product-details>
        <div style="display: flex">
          <div class="color-circle" :style="{backgroundColor: variant.color}" v-for="(variant, index) in variants"
               :key="variant.id"
               @mouseover="updateVariant(index)"></div>
        </div>
        <button class="button" :class="{disabledButton: !inStock}" @click="addToCart" :disabled="!inStock">
          Add To Cart
        </button>
        <button class="button" @click="removeFromCart">
          Remove From Cart
        </button>
        <button class="button" @click="inStock = !inStock">
          Toggle Instock
        </button>
        <review-list :reviews="reviews" v-if="reviews.length"></review-list>
        <review-form @review-submitted="addReview"></review-form>
      </div>
    `,
    props: {
      premium: Boolean
    },
    setup(props, {emit}) {
        const product = ref("Boots")
        const reviews = ref([])
        const image = computed(() => variants.value[selectedVariant.value].image)
        const inStock = computed({
            get() {
                return variants.value[selectedVariant.value].inStock
            },
            set(value) {
                variants.value[selectedVariant.value].inStock = value
            }
        })
        const brand = ref("SE 331")
        const details = ref([
            '50% cotton',
            '30% wool',
            '20% polyester'
        ])
        const variants = ref([
            {id: 2234, color: 'green', 'image': './assets/images/socks_green.jpg', quantity: 50, onSale: true, inStock: true},
            {id: 2235, color: 'blue', 'image': './assets/images/socks_blue.jpg', quantity: 0, onSale: false, inStock: false},
        ])
        const selectedVariant = ref(0)
        const title = computed(() => {
            return `${brand.value} ${product.value} ${variants.value[selectedVariant.value].onSale ? 'is on sale' : ''}`
        })
        const shipping = computed(() => {
            return props.premium ? 'Free' : '30'
        })


        function addToCart() {
            emit('add-to-cart', variants.value[selectedVariant.value].id)
        }
        function removeFromCart() {
            emit('remove-from-cart', variants.value[selectedVariant.value].id)
        }

        function addReview(review) {
            reviews.value.push(review)
        }

        function updateVariant(index) {
            selectedVariant.value = index
        }


        return {
            title,
            image,
            inStock,
            details,
            variants,
            updateVariant,
            addToCart,
            removeFromCart,
            shipping,
            selectedVariant,
            reviews,
            addReview
        }
    }
}